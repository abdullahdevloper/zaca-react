import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useParams } from 'react-router-dom';
import { savedMemberJob, updateDataMemberJob, editMemberJob } from '../../service/MemberJobService';
import Title from "../Title";
import { withAlert } from '../withAlert';

function MemberJobForm({ alert, onSaveMemberJob, open = true, onClose, memberJobId = 0 }) {
  const [job_title, setJobTitle] = useState('');


  useEffect(() => {
    if (memberJobId !== 0) {
      editMemberJob(memberJobId)
        .then((response) => {
          if (response.status === 200) {
            setJobTitle(response.data.name_job); // Assuming name_job is the field from API
          } else {
            alert.showAlert("Failed to fetch member job details", "error");
          }
        })
        .catch(error => {
          alert.showAlert("An error occurred while fetching member job details", "error");
          console.error(error);
        });
    }
  }, [memberJobId, alert]);

  const handleSave = async (e) => {
    e.preventDefault();

    const memberJob = { name_job: job_title }; // Use name_job for consistency

    if (job_title === "") {
      alert.showAlert("Job title is required", "error");
      return;
    }

    try {
      let response;
      if (memberJobId !== 0) {
        response = await updateDataMemberJob(memberJobId, memberJob);
      } else {
        response = await savedMemberJob(memberJob);
      }

      if (response.status === 200 || response.status === 201) {
        alert.showAlert("تمت العملية بنجاح", "success");
        if (onSaveMemberJob) {
          onSaveMemberJob();
        }
        onClose();
      } else {
        alert.showAlert("Failed to save member job", "error");
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
      <div dir="rtl" style={{ width: "300px", padding: "16px" }} role="presentation">
        <Title marginTop="60px">اضافة </Title>

        <TextField
          style={{ marginTop: "60px" }}
          name="name_job"
          label="اسم الوضيفة "
          type="text"
          placeholder='ادخل اسم الوضيفة'
          className='form-control'
          value={job_title}  // Add value prop
          onChange={(e) => setJobTitle(e.target.value)} // Update state
          required
          fullWidth
          margin="normal"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        />


        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave} // Call handleSave
            sx={{ backgroundColor: "#2f9d58" }}
          >
            حفظ
          </Button>
        </Box>
      </div>
    </Drawer>
  );
}

export default withAlert(MemberJobForm);


