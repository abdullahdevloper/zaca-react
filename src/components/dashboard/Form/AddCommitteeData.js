import React, { useState } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { savedCommitteeData, updateCommitteeData, editCommitteeData } from '../../service/CommitteeDataService'
import Title from "../Title";
import Grid from "@mui/material/Grid";
import { MenuItem, Select } from "@mui/material";
import Divider from "@mui/material/Divider";

function CommitteeDataForm({ onSaveCommitteeData, open = true, onClose, actions }) {


  const [committee_type_id, setcommittee_type_id] = useState('')
  const [partner_id, setpartner_id] = useState('')
  const [list_id, setlist_id] = useState('')
  const [status, setstatus] = useState('')
  const [add_by, setadd_by] = useState('')
  const [add_date, setadd_date] = useState('')


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
      editCommitteeData(id).then((response) => {
        setcommittee_type_id(response.data.committee_type_id);
        setpartner_id(response.data.partner_id);
        setlist_id(response.data.list_id);
        setstatus(response.data.status);
        setadd_by(response.data.add_by);
        setadd_date(response.data.add_date);
      })
    }
  }, [id])

  function saveCommitteeData(e) {
    e.preventDefault()
    alertify.success(" start save.");

    const committeeData = {
      committee_type_id, partner_id, list_id, status, add_by, add_date
    }


    if (committee_type_id === "") {
      return;
    }
    if (id) {
      updateCommitteeData(id, committeeData).then((response) => {
        // navigate('/')
      }).catch(error => {
        console.error(error);
      })
    } else {
      savedCommitteeData(committeeData).then((response) => {
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
      }}  >
      <div dir="rtl"
        style={{
          width: "400px",
          padding: "16px",
        }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}    >
        <Title marginTop="60px">اضافة </Title>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              name="committee_type_id"
              label="رقم نوع اللجنة"
              type="text"
              placeholder='رقم نوع اللجنة'
              className='form-control'
              onChange={(e) => setcommittee_type_id(e.target.value)}
              required
              margin="normal"
              onClick={(event) => {
                event.stopPropagation();
              }}
              onKeyDown={(event) => {

                event.stopPropagation();
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              variant="outlined"
              name="partner_id"
              label="رقم اللجنة الاب "
              type="text"
              placeholder='رقم اللجنة الاب'
              className='form-control'
              onChange={(e) => setlist_id(e.target.value)}
              required
              fullWidth
              margin="normal"
              onClick={(event) => {
                event.stopPropagation();
              }}
              onKeyDown={(event) => {

                event.stopPropagation();
              }} />
            
          </Grid>
          <Grid item xs={12} sm={6  }>
            <TextField
              variant="outlined"
              name="list_id"
              label="رقم الكشف "
              type="text"
              placeholder='رقم الكشف'
              className='form-control'
              onChange={(e) => setlist_id(e.target.value)}
              required
              fullWidth
              margin="normal"
              onClick={(event) => {
                event.stopPropagation();
              }}
              onKeyDown={(event) => {

                event.stopPropagation();
              }} />
          </Grid>

        </Grid>
        <Divider />
        <Divider />

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={saveCommitteeData}
            sx={{ backgroundColor: "#2f9d58" }}>
            حفظ
          </Button>
        </Box>
      </div>
    </Drawer>


  );
}

export default connect(null)(CommitteeDataForm);
