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
import { MenuItem, Select } from "@mui/material";
import Divider from "@mui/material/Divider";

function MemberDataForm({ onSaveMemberData, open = true, onClose, actions }) {
  const [memberData, setMemberData] = useState({
    member_name: "", gender: "", sociality: "", phone: "", mobile: "", id_type: "", id_number: "",
    id_date: "", id_location: "", birth_place: "", birthdate: "", accomm_type: "", qualification: "",
    job_title: "", workplace: "", work_type: "", experience: "", photo: "", person: "",
    person_relation: "", person_mobile: "",
  });



  const [member_name, setmember_name] = useState('')
  const [gender, setgender] = useState('')
  const [sociality, setsociality] = useState('')
  const [phone, setphone] = useState('')
  const [mobile, setmobile] = useState('')
  const [id_type, setid_type] = useState('')
  const [id_number, setid_number] = useState('')
  const [id_date, setid_date] = useState('')
  const [id_location, setid_location] = useState('')
  const [birth_place, setbirth_place] = useState('')
  const [birthdate, setbirthdate] = useState('')
  const [accomm_type, setaccomm_type] = useState('')
  const [qualification, setqualification] = useState('')
  const [job_title, setjob_title] = useState('')
  const [workplace, setworkplace] = useState('')
  const [work_type, setwork_type] = useState('')
  const [experience, setexperience] = useState('')
  const [photo, setphoto] = useState('')
  const [person, setperson] = useState('')
  const [person_relation, setperson_relation] = useState('')
  const [person_mobile, setperson_mobile] = useState('')


  const navigate = useNavigate()
  const { id } = useParams()


  function pageTitle() {
    if (id) {
      return <h4 className='title'>تعديل</h4>
    } else {
      return <h4 className='title'>انشاء جديد</h4>
    }
  }
  const handleChange = (e) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };
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

  function saveMemberData(e) {
    e.preventDefault()
    alertify.success(" start save.");

    const memberData = {
      member_name, gender, sociality, phone, mobile, id_type, id_number,
      id_date, id_location, birth_place, birthdate, accomm_type, qualification, job_title, workplace, work_type, experience,
      photo, person, person_relation, person_mobile,
    }


    if (member_name === "" || gender === "" || sociality === "" || phone === "" || mobile === "" || id_type === "" || id_number === "" ||
      id_date === "" || id_location === "" || birth_place === "" || birthdate === "" || accomm_type === "" || qualification === "" || job_title === "" ||
      workplace === "" || work_type === "" || experience === "" || photo === "" || person === "" || person_relation === "" || person_mobile === ""
    ) {
      return;
    }
    if (id) {
      updateDataMemberData(id, memberData).then((response) => {
        // navigate('/')
      }).catch(error => {
        console.error(error);
      })
    } else {
      savedMemberData(memberData).then((response) => {
      }).catch(error => {
        alertify.success(error.message);

        console.error(error);
      })
      // navigate("/")
    }
  }
  const handleSave = async (e) => { // Use async/await
    e.preventDefault();

    // Check if all fields are filled (improved validation - still recommend Yup/Formik)
    if (Object.values(memberData).some(value => value === "")) {
      console.error("Error saving/updating member data:");
      console.log(memberData);
      alertify.error("جميع الحقول مطلوبة");
      return;
    }

    try {
      if (id) {
        const response = await updateDataMemberData(id, memberData);
        if (response.status === 200) {
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
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        disableScrollLock: true,
      }}  >
      <div dir="rtl"
        style={{
          width: "900px",
          padding: "16px",
        }}
        role="presentation"
      >
        <Title marginTop="60px">اضافة </Title>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              fullWidth
              name="member_name"
              label="اسم العضو "
              type="text"
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
          <Grid item xs={12} sm={3}>
            <Select
              name="gender"
              label="الجنس"
              onChange={handleChange}
              fullWidth
              placeholder="اختر الجنس"
              onClick={(event) => {
                event.stopPropagation();
              }}
              onKeyDown={(event) => {
                event.stopPropagation();
              }}
            >
              <MenuItem value="1" type="number">ذكر</MenuItem>
              <MenuItem value="2">انثى</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="sociality"
              label="الحالة الاجتماعية "
              type="text"
              placeholder='الحالة الاجتماعية'
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
          <Grid item xs={12} sm={3}>
            <Select
              name="id_type"
              label="نوع البطاقة"
              onChange={handleChange}
              fullWidth
              placeholder="اختر نوع البطاقة"
              onClick={(event) => {
                event.stopPropagation();
              }}
              onKeyDown={(event) => {
                event.stopPropagation();
              }}
            >
              <MenuItem value="1">الهوية</MenuItem>
              <MenuItem value="2">الجواز</MenuItem>
            </Select>
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
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="qualification"
              label="المؤهلات"
              type="text"
              placeholder='المؤهلات'

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
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="accomm_type"
              label="نوع السكن"
              type="text"
              placeholder='نوع السكن'

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
              name="job_title"
              label="الوظيفة/ الصفة في المجتمع"
              type="text"
              placeholder='الوظيفة/ الصفة في المجتمع  '

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

          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="work_type"
              label="جهة العمل"
              type="text"
              placeholder='جهة العمل  '

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
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="person_relation"
              label="صلة القرابة"
              type="text"
              placeholder='صلة القرابة  '

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

export default connect(null)(MemberDataForm);
