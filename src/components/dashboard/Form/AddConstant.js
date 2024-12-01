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
import { withAlert } from '../withAlert'; 

function ConstantForm({alert, onSaveConstant, open = true, onClose, constantId =0 }) {
  

  const [name_constants, setNameConstants] = useState('')
  const [code_constants, setCodeConstants] = useState('')
 

  useEffect(() => {

    if (constantId!=0) {
      editConstant(constantId).then((response) => {
        setNameConstants(response.data.name_constants);
        setCodeConstants(response.data.code_constants);
        
      })
    }
  }, [constantId])

  function saveConstant(e) {
    e.preventDefault();

    const constant = { name_constants, code_constants }


    if (name_constants === "" || code_constants === "") {
      return;
    }
    if (constantId) {
      updateDataConstant(constantId, constant).then((response) => {
        alert.showAlert("تمت العملية بنجاح", "success"); //Show alert on success
      }).catch(error => {
        console.error(error);
      })
    } else {
      savedConstant(constant).then((response) => {
        alert.showAlert("تمت العملية بنجاح", "success"); //Show alert on success

      }).catch(error => {
        alert.showAlert(error.message, "error"); //Show alert on success


        console.error(error);
      })
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
          value={name_constants}
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
          value={code_constants}

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
export default withAlert(connect(null)(ConstantForm));

