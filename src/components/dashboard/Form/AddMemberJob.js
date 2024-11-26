import React, { useState } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { savedMemberJob, updateDataMemberJob, editMemberJob } from '../../service/MemberJobService'
import Title from "../Title";

function MemberJobForm({ onSaveMemberJob, open = true, onClose, actions }) {
  

  const [job_title, setjob_title] = useState('') 


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
      editMemberJob(id).then((response) => {
        setjob_title(response.data.job_title);
        
      })
    }
  }, [id])

  function saveMemberJob(e) {
    e.preventDefault()
    alertify.success(" start save.");

    const memberJob = { job_title }


    if (job_title === "" ) {
      return;
    }
    if (id) {
      updateDataMemberJob(id, memberJob).then((response) => {
        // navigate('/')
      }).catch(error => {
        console.error(error);
      })
    } else {
      savedMemberJob(memberJob).then((response) => {
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
          name="title_job"
          label="اسم الوضيفة "
          type="text"
          placeholder='ادخل اسم الوضيفة'
          className='form-control'
          onChange={(e) => setjob_title(e.target.value)}
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
       


        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={saveMemberJob}
            sx={{ backgroundColor: "#2f9d58" }}>
            حفظ
          </Button>
        </Box>
      </div>
    </Drawer>
  );
}

export default connect(null)(MemberJobForm);
