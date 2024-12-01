import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { listUsers, deleteUser, editUser, updateDataUser } from '../service/UserService.js';
import Grid from "@mui/material/Grid";
import AddAccount from "./Form/AddAccount.js";
import Divider from "@mui/material/Divider";
import { withAlert } from './withAlert';

function Users({ alert }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userId, setUserId] = useState(null);  // State to store the ID of the user being edited
  const [users, setUsers] = useState([]);


  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    try {
      const response = await listUsers();
      if (response.status === 200) {
        setUsers(response.data);
      } else if (response.status === 204) {
        alert.showAlert("لا يوجد بيانات", "success"); // Use alert
      } else {
        alert.showAlert("Failed to fetch users", "error");
      }
    } catch (error) {
      alert.showAlert("An error occurred while fetching users", "error");
      console.error(error);
    }
  }

  const handleEditUser = (id) => {
    setUserId(id);
    setIsFormOpen(true); // Open the form when edit is clicked
  };

  const handleCloseForm = () => {
    setUserId(0);
    setIsFormOpen(false); // Open the form when edit is clicked
  };
  const handleNewUser = () => {
    setUserId(0);
    setIsFormOpen(true); // Open the form when edit is clicked
  };
  const handleUpdateUser = async () => {
    await getAllUsers(); //re-fetch users after update
  };



  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id); // Call your delete service/function
      alert.showAlert("User deleted successfully!", "success");
      getAllUsers(); // Refresh your data
    } catch (error) {
      alert.showAlert("Error deleting user!", "error");
      console.error("Error deleting user:", error);
    }
  };


  return (
    <React.Fragment>
      <Title>المستخدمين</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>اسم المستخدم</TableCell>
            <TableCell>الاسم الكامل</TableCell>
            <TableCell>الحالة</TableCell>
            <TableCell>اضيف بواسطة</TableCell>
            <TableCell>تعديل</TableCell>
            <TableCell>حذف</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.user_name}</TableCell>
              <TableCell>{user.full_name}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.add_by}</TableCell>
              <TableCell>
                <Button className="btn btn-success" onClick={() => handleEditUser(user.id)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button className="btn btn-primary" onClick={() => handleDeleteUser(user.id)}>
                  Delete
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
          onClick={() => handleNewUser()}
          sx={{ backgroundColor: "#2f9d58" }}
        >
          اضافة مستخدم
        </Button>
        {isFormOpen && ( // Conditionally render the form
          <AddAccount
            open={isFormOpen}
            onClose={() => handleCloseForm()}
            userId={userId}
            onSaveAccount={handleUpdateUser}
          />
        )}
      </Grid>
    </React.Fragment>
  );
}

export default withAlert(Users);

