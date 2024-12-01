import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useParams } from 'react-router-dom';
import { savedCommitteeData, updateCommitteeData, editCommitteeData } from '../../service/CommitteeDataService';
import Title from "../Title";
import Grid from "@mui/material/Grid";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Divider from "@mui/material/Divider";
import { listConstants } from '../../service/ConstantsService.js';
import { withAlert } from '../withAlert';

function CommitteeDataForm({ alert, onSaveCommitteeData, open = true, onClose, committeeId = 0 }) {
  const committee_type_id="";
  const partner_id="";
  const list_id="";
  const status="";
  const add_by="";
  const add_date="";


  const [CommitteeData, setCommitteeData] = useState({
    committee_type_id: "", partner_id: "", list_id: "", status: "", add_by: "", add_date: "", constants: "",
     });
     const [constants, setConstants] = useState([])

  useEffect(() => {
    getAllConstants();
    if (committeeId != 0) { 
      editCommitteeData(committeeId)
        .then((response) => {

          if (response.status === 200) {
            setCommitteeData(response.data);

           
          } else {
          }
        })
        .catch(error => {
          alert.showAlert(error.message, "error");

          console.error(error);
        });
    }
  }, [committeeId]);


  async function getAllConstants() {
    try {
      const response = await listConstants();
      if (response.status === 200) {
        setConstants(response.data);
      }
    } catch (error) {
      // Handle error if needed
    }
  }
  const handleChange = (e) => {
    setCommitteeData({ ...CommitteeData, [e.target.name]: e.target.value });
  };
  const handleSave = async (e) => {

    const committee = {
      committee_type_id, partner_id, list_id, status, add_by, add_date
    };

    if (committee_type_id === "" || list_id === "") {
        alert.showAlert("All fields are required", "error");

        return;
      }

    try {
      let response;
      if (committeeId !== 0) {
        console.log(committee);
        committee.committee_type_id=committee.committee_type_id.id;
        response = await updateCommitteeData(committeeId, committee);

      } else {
        response = await savedCommitteeData(committee);
      }

      if (response.status === 200 || response.status === 201) {
        alert.showAlert("تمت العملية بنجاح", "success");
        if (onSaveCommitteeData) {
          onSaveCommitteeData();
        }
        onClose();
      } else {
        alert.showAlert("Failed to save committee data", "error");
      }
    } catch (error) {
      alert.showAlert(error.message || "حدث خطأ في الخادم", "error");
    }
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        disableScrollLock: true,
      }}
    >
      <div dir="rtl" style={{ width: "400px", padding: "16px" }} role="presentation">
        <Title marginTop="60px">اضافة </Title>

        <Grid container spacing={2}>
          {/* ... other fields ... */}
          <Grid item xs={12} sm={6} marginTop={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">رقم نوع اللجنة</InputLabel>
              <Select
                name="committee_type_id"
                label="رقم نوع اللجنة"
                onChange={handleChange}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
              >
                {constants.map((constant) => (
                  constant.code_constants === "committee_type" && (
                    <MenuItem key={constant.id} value={constant.id}>
                      {constant.id}
                    </MenuItem>
                  )
                ))}
              </Select>
            </FormControl>
            
          </Grid>
          {/* ... other fields ... */}

          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              name="list_id"
              label="رقم الكشف "
              type="text"
              placeholder='رقم الكشف'
              className='form-control'
              value={list_id} // Make sure to control this field too!
              onChange={handleChange} // Use state updater function
              required
              fullWidth
              margin="normal"
            />
          </Grid>

        </Grid>
        <Divider />
        <Divider />

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ backgroundColor: "#2f9d58" }}
          >
            حفظ
          </Button>
        </Box>
      </div>
    </Drawer>
  );
}

export default withAlert(CommitteeDataForm);
