import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { savedMemberData, updateDataMemberData, editMemberData } from '../../service/MemberDataService';
import Title from "../Title";
import Grid from "@mui/material/Grid";
import { MenuItem, Select } from "@mui/material";
import Divider from "@mui/material/Divider";

function MemberDataForm({ onSaveMemberData, open = true, onClose, actions }) {
  const [memberData, setMemberData] = useState({
    member_name: "", gender: "", sociality: "", phone: "", mobile: "", id_type: "", id_number: "",
    id_date: "", id_location: "", birth_place: "", birthdate: "", accomm_type: "", qualification: "",
    job_title: "", workplace: "", work_type: "", experience: "", photo: "", person: "",
    person_relation: "", person_mobile: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      editMemberData(id).then((response) => {
        setMemberData(response.data);
      }).catch(error => {
        console.error("Error fetching member data:", error);
        alertify.error("حدث خطأ أثناء جلب بيانات العضو");
      });
    }
  }, [id]);


  const handleChange = (e) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };



  const handleSave = async (e) => { // Use async/await
    e.preventDefault();

    // Check if all fields are filled (improved validation - still recommend Yup/Formik)
    if (Object.values(memberData).some(value => value === "")) {
      alertify.error("جميع الحقول مطلوبة");
      return;
    }

    try {
      if (id) {
        const response = await updateDataMemberData(id, memberData);
        if(response.status === 200) {
            alertify.success("تم التحديث بنجاح");
            onClose();
        } else {
          alertify.error("حدث خطأ أثناء التحديث");
        }


      } else {
        const response = await savedMemberData(memberData);

        if (response.status === 201 || response.status === 200) {
          alertify.success("تم الحفظ بنجاح");
          onClose(); // Close the drawer on successful save

        } else {
           alertify.error("حدث خطأ أثناء الحفظ");
        }
      }
    } catch (error) {
      alertify.error(error.message || "حدث خطأ في الخادم");
      console.error("Error saving/updating member data:", error);
    }
  };




  return (
    <Drawer  anchor="left"
    open={open}
    onClose={onClose}
    ModalProps={{
      disableScrollLock: true,
    }} >
      <div dir="rtl" style={{ width: "900px", padding: "16px" }} role="presentation">
        {/* ... (pageTitle and other elements remain the same) */}

        <Grid container spacing={2}>
          {/* Example of how to use the handleChange function and updated state */}
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              fullWidth
              name="member_name" // Add name attribute
              label="اسم العضو"
              type="text"
              placeholder="ادخل اسم العضو"
              value={memberData.member_name} // Use the state variable
              onChange={handleChange} // Use the handleChange function
              required
              margin="normal"
              // Remove onClick and onKeyDown – no longer needed
            />
          </Grid>

          {/* ... Repeat this pattern for all TextField and Select components */}
          <Grid item xs={12} sm={3}>
             <Select
                label="الجنس"
                name="gender"
                value={memberData.gender}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="ذكر">ذكر</MenuItem>
                <MenuItem value="أنثى">أنثى</MenuItem>
              </Select>

          </Grid>
          {/* ...Other form fields */}



        </Grid>

        <Divider />
        <Divider />

        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ backgroundColor: "#2f9d58" }}>
            حفظ
          </Button>
        </Box>
      </div>
    </Drawer>
  );
}

export default connect(null)(MemberDataForm);

