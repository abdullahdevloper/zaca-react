import React, { useState } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { savedMemberData, updateDataMemberData, editMemberData } from '../../service/MemberDataService'
import Title from "../Title";
import Grid from "@mui/material/Grid";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { listConstants, deleteConstant } from '../../service/ConstantsService.js'
import Divider from "@mui/material/Divider";
import { listMemberJobs } from "../../service/MemberJobService.js";
import { withAlert } from '../withAlert'; 

function MemberDataForm({alert, onSaveMemberData, open = true, onClose, actions ,memberId=0}) {

  // here we are get constants variables variants

  const member_name = "";
  const gender = "";
  const sociality = "";
  const phone = "";
  const mobile = "";
  const id_type = "";
  const id_number = "";
  const id_date = "";
  const id_location = "";
  const birth_place = "";
  const birthdate = "";
  const accomm_type = "";
  const qualification = "";
  const name_job = "";
  const workplace = "";
  const work_type = "";
  const experience = "";
  const photo = "";
  const person = "";
  const person_relation = "";
  const person_mobile = "";


  const [memberData, setMemberData] = useState({
    member_name: "", gender: "", sociality: "", phone: "", mobile: "", id_type: "", id_number: "",
    id_date: "", id_location: "", birth_place: "", birthdate: "", accomm_type: "", qualification: "",
    name_job: "", workplace: "", work_type: "", experience: "", photo: "", person: "",
    person_relation: "", person_mobile: "",
  });


  const [constants, setConstants] = useState([])
  const [memberJobs, setMemberJobs] = useState([])

  function getAllMemberJobs() {
    listMemberJobs()
      .then((response) => {
        if (response.status === 200) {
          setMemberJobs(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function getAllConstants() {
    try {
      const response = await listConstants();
      if (response.status === 200) {
        setConstants(response.data);
      }
    } catch (error) {
      // Handle error here or display a more user-friendly message
    }
  }


  const handleChange = (e) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllConstants();
    getAllMemberJobs();

    if (memberId !== 0) { 
      editMemberData(memberId).then((response) => {
        if (response.status === 200) {

          setMemberData(response.data);

        } else {
          alert.showAlert("Failed to fetch member data", "error");
        }
      }).catch(error => {
        alert.showAlert("An error occurred while fetching member data", "error");
        console.error(error);
      });
    }
  }, [memberId, alert]);



 
  const handleSave = async (e) => {
    e.preventDefault();

    if (Object.values(memberData).some(value => value === "")) {
      alert.showAlert("All fields are required", "error");
      return;
    }

    try {
      let response;

      if (memberId !== 0) {
        response = await updateDataMemberData(memberId, memberData);
      } else {
        response = await savedMemberData(memberData);
      }

      if (response.status === 200 || response.status === 201) {
        alert.showAlert("Member data saved successfully!", "success");

        if (onSaveMemberData) {
          onSaveMemberData(); // Call the callback after successful save/update
        }
        onClose();

      } else {
        alert.showAlert("Failed to save member data", "error");
      }

    } catch (error) {
      alert.showAlert(error.message || "حدث خطأ في الخادم", "error");
      console.error(error);

    }

  };
  return (
    <Drawer marginTop={60}
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        disableScrollLock: true,
      }}  >
      <div dir="rtl"
        style={{
          width: "900px",
          padding: 50,
        }}
        role="presentation"
      >
        <Title >اضافة </Title>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              fullWidth
              name="member_name"
              label="اسم العضو "
              type="text"
              value={memberData.member_name}
              placeholder='ادخل اسم العضو'
              className='form-control'
              onChange={handleChange}
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
          <Grid item xs={12} sm={3} marginTop={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">اختر الجنس</InputLabel>

              <Select
                name="gender"
                label="الجنس"
                onChange={handleChange}
                fullWidth
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onKeyDown={(event) => {
                  event.stopPropagation();
                }}>

                {constants.map((constant) => (
                  constant.code_constants === "gender_type" &&
                  <MenuItem selected={true} value={constant.id} type="number">{constant.id}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} marginTop={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">الحالة الاجتماعية</InputLabel>
              <Select
                name="sociality"
                label="الحالة الاجتماعية"
                onChange={handleChange}
                fullWidth
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onKeyDown={(event) => {
                  event.stopPropagation();
                }}
              >
                {constants.map((constant) => (
                  constant.code_constants === "sociality" &&
                  <MenuItem value={constant.id} type="number">{constant.name_constants}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="phone"
              label="رقم الهاتف "
              type="text"
              placeholder='ادخل رقم الهاتف'

              className='form-control'
              onChange={handleChange}
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

          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="mobile"
              label="رقم الجوال "
              type="text"
              placeholder='ادخل رقم الجوال'

              className='form-control'
              onChange={handleChange}
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
          <Grid item xs={12} sm={3} marginTop={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">نوع البطاقة</InputLabel>
              <Select
                name="id_type"
                label="نوع البطاقة"
                onChange={handleChange}
                fullWidth
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onKeyDown={(event) => {
                  event.stopPropagation();
                }}
              >
                {constants.map((constant) => (
                  constant.code_constants === "id_type" &&
                  <MenuItem value={constant.id} type="number">{constant.name_constants}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="id_number"
              label="رقم البطاقة"
              type="text"
              placeholder='رقم البطاقة'
              className='form-control'
              onChange={handleChange}
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

          <Grid item xs={12} sm={3}>
            <TextField

              variant="outlined"
              name="id_date"
              label="تاريخ اصدار الهوية"
              type="date"
              placeholder='تاريخ اصدار الهوية'

              className='form-control'
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }} // To display label even when empty
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="id_location"
              label="محل اصدار الهوية"
              type="text"
              placeholder='محل اصدار الهوية'

              className='form-control'
              onChange={handleChange}
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
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="birth_place"
              label="مكان الميلاد"
              type="text"
              placeholder='مكان الميلاد'
              className='form-control'
              onChange={handleChange}
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
          <Grid item xs={12} sm={3} marginTop={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">اختر المؤهلات</InputLabel>

              <Select
                name="qualification"
                label="المؤهلات"
                onChange={handleChange}
                fullWidth
                placeholder="المؤهلات"
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onKeyDown={(event) => {
                  event.stopPropagation();
                }}
              >
                {constants.map((constant) => (
                  constant.code_constants === "qualification" &&
                  <MenuItem value={constant.id} type="number">{constant.name_constants}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="birthdate"
              label="تاريخ الميلاد"
              type="date"
              placeholder='تاريخ الميلاد'

              className='form-control'
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }} // To display label even when empty
            />
          </Grid>
          <Grid item xs={12} sm={3} marginTop={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">اختر نوع السكن</InputLabel>
              <Select
                name="accomm_type"
                label="نوع السكن"
                value={memberData.accomm_type} // Bind the value
                onChange={handleChange}
                fullWidth
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
              >

                {constants.map((constant) => (
                  constant.code_constants === "accomm_type" && (
                    <MenuItem key={constant.id} value={constant.id}>
                      {constant.name_constants}
                    </MenuItem>
                  )
                ))}
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={12} sm={3} marginTop={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">الوظيفة/ الصفة في المجتمع</InputLabel>
              <Select
                name="name_job"
                label="الوظيفة/ الصفة في المجتمع"
                onChange={handleChange}
                fullWidth
                onClick={(event) => event.stopPropagation()} // These are likely unnecessary
                onKeyDown={(event) => event.stopPropagation()} //  but can be left as is
              >
                {memberJobs.map(memberJob => (
                  <MenuItem key={memberJob.id} value={memberJob.id}>
                    {memberJob.name_job}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="workplace"
              label="مكان العمل"
              type="text"
              placeholder='مكان العمل  '
              className='form-control'
              onChange={handleChange}
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

          <Grid item xs={12} sm={3} marginTop={2} >
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">جهة العمل</InputLabel>
              <Select
                name="work_type"
                label="جهة العمل"
                onChange={handleChange}
                fullWidth
                onClick={(event) => event.stopPropagation()} // These are likely unnecessary
                onKeyDown={(event) => event.stopPropagation()} //  but can be left as is
              >
                {constants.filter(constant => constant.code_constants === "work_type").map(constant => (
                  <MenuItem key={constant.id} value={constant.id}>
                    {constant.name_constants}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="experience"
              label="الخبرات"
              type="text"
              placeholder='الخبرات  '

              className='form-control'
              onChange={handleChange}
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

          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="photo"
              label="صورة العضو"
              type="text"
              placeholder='صورة العضو  '

              className='form-control'
              onChange={handleChange}
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
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="person"
              label="شخص يمكن الرجوع الية"
              type="text"
              placeholder='شخص يمكن الرجوع الية'

              className='form-control'
              onChange={handleChange}
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
          <Grid item xs={12} sm={3} marginTop={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">صلة القرابة</InputLabel>
              <Select
                name="person_relation"
                label="صلة القرابة"
                onChange={handleChange}
                fullWidth
                onClick={(event) => event.stopPropagation()} // These are likely unnecessary
                onKeyDown={(event) => event.stopPropagation()} //  but can be left as is
              >

                {constants.filter(constant => constant.code_constants === "person_relation").map(constant => (
                  <MenuItem key={constant.id} value={constant.id}>
                    {constant.name_constants}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="person_mobile"
              label="رقم هاتف الشخص المرجع"
              type="text"
              placeholder='رقم هاتف الشخص المرجع'

              className='form-control'
              onChange={handleChange}
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
            onClick={handleSave}
            sx={{ backgroundColor: "#2f9d58" }}>
            حفظ
          </Button>
        </Box>
      </div>
    </Drawer>


  );
}
export default withAlert(MemberDataForm); 

