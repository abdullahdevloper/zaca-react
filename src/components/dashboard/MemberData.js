import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title.js";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { listMemberData, deleteMemberData } from '../service/MemberDataService.js'
import alertify from "alertifyjs";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import AddMemberData from "./Form/AddMemberData.js";
import { FormControl } from "@mui/material";



function MemberData() {
  const [isFormOpen, setIsFormOpen] = useState(false);


  function dateFormatter(dateArray) {
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    return year + " : " + month + " : " + day;
  }

  const [memberData, setmemberData] = useState([])

  
  useEffect(() => {
    getAllMemberData()
  }, [])

  function getAllMemberData() {
    listMemberData().then((response) => {
      console.log(response.data);

      if (response.status === 200) {
        console.log(response.data);
        setmemberData(response.data);
      }
    }).catch(error => {

      console.error(error);
    })
  }
  return (
    <React.Fragment>
      <Title> الاعضاء </Title>
      <Table size="big">
        <TableHead>
          <TableRow>
            <TableCell> ID</TableCell>
            <TableCell>اسم الوضيفة</TableCell>
            <TableCell>الحالة الاجتماعية</TableCell>
            <TableCell>الهاتف </TableCell>
            <TableCell>رقم الجوال </TableCell>
            <TableCell>نوع الهوية </TableCell>
            <TableCell>رقم الهوية </TableCell>
            <TableCell>تاريخ اصدار الهوية </TableCell>
            <TableCell>مكان الاصدار </TableCell>
            <TableCell>مكان الميلاد </TableCell>
            <TableCell>تاريخ الميلاد </TableCell>
            <TableCell>نوع السكن </TableCell>
            <TableCell>المؤهل </TableCell>
            <TableCell>الوظيفة/ الصفة في المجتمع </TableCell>
            <TableCell>مكان العمل </TableCell>
            <TableCell>جهة العمل </TableCell>
            <TableCell>الخبرات </TableCell>
            <TableCell>الصورة </TableCell>
            <TableCell>اقرب شخص </TableCell>
            <TableCell>علاقة بالشخص </TableCell>
            <TableCell>رقم الشخص </TableCell>

            <TableCell>اضيف </TableCell>
            <TableCell>تاريخ الاصافة</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {memberData.map((item) => (
            <TableRow

              key={item.id}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.member_name}</TableCell>
              <TableCell>{item.sociality.name_constants}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.mobile}</TableCell>
              <TableCell>{item.id_type.name_constants}</TableCell>
              <TableCell>{item.id_number}</TableCell>
              <TableCell>{item.id_date}</TableCell>
              <TableCell>{item.id_location}</TableCell>
              <TableCell>{item.birth_place}</TableCell>
              <TableCell>{item.birthdate}</TableCell>
              <TableCell>{item.accomm_type.name_constants}</TableCell>
              <TableCell>{item.qualification.name_constants}</TableCell>
              <TableCell>{item.job_title.name_job}</TableCell>
              <TableCell>{item.workplace}</TableCell>
              <TableCell>{item.work_type.name_constants}</TableCell>
              <TableCell>{item.experience}</TableCell>
              <TableCell>{item.photo}</TableCell>
              <TableCell>{item.person}</TableCell>
              <TableCell>{item.person_relation.name_constants}</TableCell>
              <TableCell>{item.person_mobile}</TableCell>




              <TableCell>{item.add_by.first_name}</TableCell>
              <TableCell>{item.add_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider />
      <FormControl fullWidth>
        <Grid item container justifyContent="flex-end" >
          <Button
            dir="rtl"
            variant="contained"
            color="primary"
            onClick={() => setIsFormOpen(true)}
            sx={{ backgroundColor: "#2f9d58" }}
          >
            اضافة جديد
          </Button>
          <AddMemberData
            // onSaveAccount={handleSaveUser}
            open={isFormOpen}
            onClose={() => setIsFormOpen(false)}
          />
        </Grid>
      </FormControl>

    </React.Fragment>
  );
}


export default MemberData;
