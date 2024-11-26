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
import { savedConstant, updateDataConstant, editConstant } from '../../service/ConstantsService'
import Title from "../Title";

function ConstantForm({ onSaveConstant, open = true, onClose, actions }) {
  

  const [name_constants, setNameConstants] = useState('')
  const [code_constants, setCodeConstants] = useState('')
 


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
      editConstant(id).then((response) => {
        setNameConstants(response.data.name_constants);
        setCodeConstants(response.data.code_constants);
        
      })
    }
  }, [id])

  function saveConstant(e) {
    e.preventDefault();
    alertify.success(" start save.");

    const constant = { name_constants, code_constants }


    if (name_constants === "" || code_constants === "") {
      return;
    }
    if (id) {
      updateDataConstant(id, constant).then((response) => {
        // navigate('/')
      }).catch(error => {
        console.error(error);
      })
    } else {
      savedConstant(constant).then((response) => {
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
      <Title marginTop="60px">اضافة </Title>
      
        <TextField dir="rtl"
          style={{ marginTop: "60px" }}
          name="name_constants"
          label="اسم الثابت "
          type="text"
          placeholder='ادخل اسم الثابت'
          className='form-control'
          onChange={(e) => setNameConstants(e.target.value)}
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
          name="code_constants"
          label="كود الثابت"
          placeholder='ادخل كود الثابت'
          fullWidth
          onChange={(e) => setCodeConstants(e.target.value)}
          margin="normal"
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
            onClick={saveConstant}
            sx={{ backgroundColor: "#2f9d58" }}>
            حفظ
          </Button>
        </Box>
      </div>
    </Drawer>
  );
}

export default connect(null)(ConstantForm);
