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

  useEffect(() => {
    if (id) {
      editMemberData(id).then((response) => {
        setmember_name(response.data.member_name);
        setgender(response.data.gender);
        setsociality(response.data.sociality);
        setphone(response.data.phone);
        setmobile(response.data.mobile);
        setid_type(response.data.id_type);
        setid_number(response.data.id_number);
        setid_date(response.data.id_date);
        setid_location(response.data.id_location);
        setbirth_place(response.data.birth_place);
        setbirthdate(response.data.birthdate);
        setaccomm_type(response.data.accomm_type);
        setqualification(response.data.qualification);
        setjob_title(response.data.job_title);
        setworkplace(response.data.workplace);
        setwork_type(response.data.work_type);
        setexperience(response.data.experience);
        setphoto(response.data.photo);
        setperson(response.data.person);
        setperson_relation(response.data.person_relation);
        setperson_mobile(response.data.person_mobile);
      })
    }
  }, [id])

  function saveMemberData(e) {
    e.preventDefault()
    alertify.success(" start save.");

    const memberData = {
      member_name, gender, sociality, phone, mobile, id_type, id_number,
      id_date, id_location, birth_place, birthdate, accomm_type, qualification, job_title, workplace, work_type, experience,
      photo, person, person_relation, person_mobile,
    }


    if (member_name === ""||gender === ""||sociality === ""||phone === ""||mobile === ""||id_type === ""||id_number === ""||
      id_date === ""||id_location === ""||birth_place === ""||birthdate === ""||accomm_type === ""||qualification === ""||job_title === ""||
      workplace === ""||work_type === ""||experience === ""||photo === ""||person === ""||person_relation === ""||person_mobile === ""
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
        onClick={onClose}
        onKeyDown={onClose}    >
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
              value="tet value"
              onChange={(e) => setmember_name(e.target.value)}
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
              value="tet value"
              onChange={(e) => setgender(e.target.value)}
              fullWidth
              placeholder="اختر الجنس"
              onClick={(event) => {
                event.stopPropagation();
              }}
              onKeyDown={(event) => {
                event.stopPropagation();
              }}
            >
              <MenuItem value="Withdraw Transaction">ذكر</MenuItem>
              <MenuItem value="Payment Transaction">انثى</MenuItem>
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
              value="tet value"
              onChange={(e) => setsociality(e.target.value)}
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
              value="tet value"
              className='form-control'
              onChange={(e) => setphone(e.target.value)}
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
              value="tet value"
              className='form-control'
              onChange={(e) => setmobile(e.target.value)}
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
              name="gender"
              value="tet value"
              label="الجنس"
              onChange={(e) => setgender(e.target.value)}
              fullWidth
              placeholder="اختر الجنس"
              onClick={(event) => {
                event.stopPropagation();
              }}
              onKeyDown={(event) => {
                event.stopPropagation();
              }}
            >
              <MenuItem value="Withdraw Transaction">ذكر</MenuItem>
              <MenuItem value="Payment Transaction">انثى</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="id_date"
              label="تاريخ اصدار الهوية"
              type="text"
              placeholder='تاريخ اصدار الهوية'
              value="tet value"
              className='form-control'
              onChange={(e) => setid_date(e.target.value)}
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
              name="id_location"
              label="محل اصدار الهوية"
              type="text"
              placeholder='محل اصدار الهوية'
              value="tet value"
              className='form-control'
              onChange={(e) => setid_location(e.target.value)}
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
              value="tet value"
              className='form-control'
              onChange={(e) => setbirth_place(e.target.value)}
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
              type="text"
              placeholder='تاريخ الميلاد'
              value="tet value"
              className='form-control'
              onChange={(e) => setbirthdate(e.target.value)}
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
              type="text"
              placeholder='تاريخ الميلاد'
              value="tet value"
              className='form-control'
              onChange={(e) => setbirthdate(e.target.value)}
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
              name="accomm_type"
              label="نوع السكن"
              type="text"
              placeholder='نوع السكن'
              value="tet value"
              className='form-control'
              onChange={(e) => setaccomm_type(e.target.value)}
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
              value="tet value"
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
              }} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              name="workplace"
              label="مكان العمل"
              type="text"
              placeholder='مكان العمل  '
              value="tet value"
              className='form-control'
              onChange={(e) => setworkplace(e.target.value)}
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
              value="tet value"
              className='form-control'
              onChange={(e) => setwork_type(e.target.value)}
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
              value="tet value"
              className='form-control'
              onChange={(e) => setexperience(e.target.value)}
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
              value="tet value"
              className='form-control'
              onChange={(e) => setexperience(e.target.value)}
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
              value="tet value"
              className='form-control'
              onChange={(e) => setphoto(e.target.value)}
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
              value="tet value"
              className='form-control'
              onChange={(e) => setperson(e.target.value)}
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
              value="tet value"
              className='form-control'
              onChange={(e) => setperson_relation(e.target.value)}
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
              value="tet value"
              className='form-control'
              onChange={(e) => setperson_mobile(e.target.value)}
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
            onClick={saveMemberData}
            sx={{ backgroundColor: "#2f9d58" }}>
            حفظ
          </Button>
        </Box>
      </div>
    </Drawer>


  );
}

export default connect(null)(MemberDataForm);
