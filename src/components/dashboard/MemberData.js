import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { listMemberData, deleteMemberData, editMemberData, updateDataMemberData } from '../service/MemberDataService.js';
import Grid from "@mui/material/Grid";
import AddMemberData from "./Form/AddMemberData.js";
import Divider from "@mui/material/Divider";
import { withAlert } from './withAlert';
import { FormControl } from "@mui/material";

function MemberData({ alert }) { // Inject alert prop
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    getAllMemberData();
  }, []);

  async function getAllMemberData() {
    try {
      const response = await listMemberData();
      if (response.status === 200) {
        setMemberData(response.data);
      } else if (response.status === 204) {
        alert.showAlert("لا يوجد بيانات", "success");
      } else {
        alert.showAlert("Failed to fetch member data", "error");
      }
    } catch (error) {
      alert.showAlert("An error occurred while fetching member data", "error");
      console.error(error);
    }
  }

  const handleEditMember = (id) => {
    setMemberId(id);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setMemberId(0);
    setIsFormOpen(false);
  };

  const handleNewMember = () => {
    setMemberId(0);
    setIsFormOpen(true);
  };


  const handleUpdateMember = async () => {
    await getAllMemberData();
  };

  const handleDeleteMember = async (id) => {
    try {
      await deleteMemberData(id);
      alert.showAlert("Member data deleted successfully!", "success");
      getAllMemberData();
    } catch (error) {
      alert.showAlert("Error deleting member data!", "error");
      console.error("Error deleting member data:", error);
    }
  };

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
            <TableCell>Edit</TableCell>

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
              <TableCell>
                <Button className="btn btn-success" onClick={() => handleEditMember(item.id)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider />
      <FormControl fullWidth>
     
      <Grid item xs={12} container justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNewMember()}
          sx={{ backgroundColor: "#2f9d58" }}
        >
          اضافة جديد
        </Button>

        {isFormOpen && (
          <AddMemberData
            open={isFormOpen}
            onClose={() => handleCloseForm()}
            memberId={memberId}
            onSaveMemberData={handleUpdateMember}
          />
        )}
      </Grid>
      </FormControl>

    </React.Fragment>
  );
}


export default MemberData;
