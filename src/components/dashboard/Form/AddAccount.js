import React, { useState } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import alertify from "alertifyjs";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { savedUser, updateDataUser, editUser} from '../../service/UserService'

function AccountForm({ onSaveAccount, open = true, onClose, actions }) {
  

  const [user_name, setUserName] = useState('')
  const [full_name, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [add_by, setAddBy] = useState('')
  const [add_date, setAddDate] = useState('')


  const navigate = useNavigate()
  const { id } = useParams()


  function pageTitle() {
    if (id) {
      return <h4 className='title'>تعديل</h4>
    } else {
      return <h4 className='title'>انشاء جديد</h4>
    }
  }

  useEffect(() => {
    if (id) {
      editUser(id).then((response) => {
        setUserName(response.data.user_name);
        setFullName(response.data.full_name);
        setPassword(response.data.password);
        setStatus(response.data.status);
        setAddBy(response.data.add_by);
        setAddDate(response.data.add_date);
      })
    }
  }, [id])

  function saveUser(e) {
    e.preventDefault()

    const user = { user_name, full_name, password }


    if (user_name === "" || full_name === "" || password === "") {
      return;
    }
    if (id) {
      updateDataUser(id, user).then((response) => {
        // navigate('/')
      }).catch(error => {
        console.error(error);
      })
    } else {
      savedUser(user).then((response) => {
      }).catch(error => {
        alertify.success(error.message);

        console.error(error);
      })
      // navigate("/")
    }
  }

  return (
    <Drawer
    
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        disableScrollLock: true,
      }}
    >
      <div dir="rtl"
        style={{
          width: "300px",
          padding: "16px",
        }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <TextField dir="rtl"
          style={{ marginTop: "60px" }}
          name="user_name"
          label="اسم المستخدم "
          type="text"
          placeholder='Enter FirstName'
          className='form-control'
          onChange={(e) => setUserName(e.target.value)}
          required
          fullWidth
          margin="normal"
          onClick={(event) => {
            event.stopPropagation();
          }}
          onKeyDown={(event) => {

            event.stopPropagation();
          }}
        />
        <TextField dir="rtl"
          name="full_name"
          label="الاسم الكامل"
          fullWidth
          onChange={(e) => setFullName(e.target.value)}
          margin="normal"
          onClick={(event) => {
            event.stopPropagation();
          }}
          onKeyDown={(event) => {
            event.stopPropagation();
          }}
        />
        <TextField dir="rtl"
          name="password"
          label="كلمة المرور"
          fullWidth
          margin="normal"
          onChange={(e)=>setPassword(e.target.value)}
          onClick={(event) => {
            event.stopPropagation();
          }}
          onKeyDown={(event) => {
            event.stopPropagation();
          }}
        />


        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={saveUser}
            sx={{ backgroundColor: "#2f9d58" }}>
            حفظ
          </Button>
        </Box>
      </div>
    </Drawer>
  );
}

export default connect(null)(AccountForm);
