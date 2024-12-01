import React, { useState } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { savedUser, updateDataUser, editUser} from '../../service/UserService'
import { withAlert } from '../withAlert';

function AccountForm({ alert,onSaveAccount, open = true, onClose, userId =0 }) {
  

  const [user_name, setUserName] = useState('')
  const [full_name, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [add_by, setAddBy] = useState('')
  const [add_date, setAddDate] = useState('')




  useEffect(() => {
    if (userId!=0) {
      editUser(userId).then((response) => {
        setUserName(response.data.user_name);
        setFullName(response.data.full_name);
        setPassword(response.data.password);
        setStatus(response.data.status);
        setAddBy(response.data.add_by);
        setAddDate(response.data.add_date);
      })
    }
  }, [userId])

  function saveUser(e) {
    e.preventDefault()

    const user = { user_name, full_name, password }

    if (user_name === "" || full_name === "" || password === "") {
      return;
    }
    if (userId!=0) {
      updateDataUser(userId, user).then((response) => {
        alert.showAlert("تمت العملية بنجاح", "success"); 
        onClose();

      }).catch(error => {
        onClose();
        alert.showAlert(error.message, "error"); 
      })
    } else {
      savedUser(user).then((response) => {
        alert.showAlert("تمت العملية بنجاح", "success"); 

      }).catch(error => {
        alert.showAlert(error.message, "error"); 
      })
      onClose();
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
          value={user_name}
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
          value={full_name}
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
          value={password}
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
export default withAlert(AccountForm);

