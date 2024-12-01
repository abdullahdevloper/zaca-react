import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title.js";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { listCommitteeData, deleteCommitteeData } from '../service/CommitteeDataService.js'
import alertify from "alertifyjs";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import AddMemberData from "./Form/AddMemberData.js";
import AddCommitteeData from "./Form/AddCommitteeData.js";
import { withAlert } from './withAlert'; 



function CommitteeData({ alert }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [committeeId, setCommitteeId] = useState(null);  // State to store committee ID for editing
  const [committeeData, setCommitteeData] = useState([]);


  useEffect(() => {
    getAllCommitteeData();
  }, []);

  async function getAllCommitteeData() {
    try {
      const response = await listCommitteeData();
      if (response.status === 200) {
        console.log(response.data);
        setCommitteeData(response.data);
      }else if (response.status === 204) {
        alert.showAlert("لا يوجد بيانات", "success"); // Use alert
      }  else {
        alert.showAlert("Failed to fetch committee data", "error"); // Use alert
      }
    } catch (error) {
      alert.showAlert("An error occurred while fetching committee data", "error"); // Use alert
      console.error(error);
    }
  }


  const handleEditCommittee = (id) => {
    setCommitteeId(id);
    setIsFormOpen(true); // Open the form for editing
  };


  const handleUpdateCommittee = async () => {
    await getAllCommitteeData(); // Refresh the list after successful update.  Consider adding more specific feedback/alert for success
  }



  const handleDeleteCommittee = async (id) => {  // Implement delete functionality
    try {
      await deleteCommitteeData(id);
      alert.showAlert("Committee data deleted successfully!", "success"); // Use alert
      getAllCommitteeData();
    } catch (error) {
      alert.showAlert("Error deleting committee data!", "error"); // Use alert
      console.error("Error deleting committee data:", error);
    }
  };


  const handleCloseForm = () => {
    setCommitteeId(0);
    setIsFormOpen(false); // Open the form when edit is clicked
  };
  const handleNewcommitteeData = () => {
    setCommitteeId(0);
    setIsFormOpen(true); // Open the form when edit is clicked
  };
  return (
    <React.Fragment>
      <Title> اللجان</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> ID</TableCell>
            <TableCell>رقم نوع الجنة</TableCell>
            <TableCell>رقم اللجنة الاب</TableCell>
            <TableCell>رقم الكشف</TableCell>
            <TableCell>الحالة</TableCell>
            <TableCell>اضيف بواسطة</TableCell>
            <TableCell>تاريخ الاصافة</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {committeeData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.committee_type_id.name_constants}</TableCell>
              <TableCell>{item.partner_id}</TableCell>
              <TableCell>{item.list_id}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.add_by.user_name}</TableCell>
              <TableCell>{item.add_date}</TableCell>
              <TableCell>
                <Button className="btn btn-success" onClick={() => handleEditCommittee(item.id)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider />

      <Grid item xs={12} container justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNewcommitteeData()}
          sx={{ backgroundColor: "#2f9d58" }}
        >
          اضافة جديد
        </Button>
        <AddCommitteeData
        onClose={handleCloseForm}
        committeeId={committeeId}
          // onSaveAccount={handleSaveUser}
          open={isFormOpen}
        />
      </Grid>
    </React.Fragment>
  );
}


export default withAlert(CommitteeData); 
