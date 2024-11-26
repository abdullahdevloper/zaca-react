import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { listUsers, deleteUser } from '../service/UserService.js'
import alertify from "alertifyjs";
import Grid from "@mui/material/Grid";
import AddAccount from "./Form/AddAccount.js";
import Divider from "@mui/material/Divider";
import axios from "axios";

function preventDefault(event) {
  event.preventDefault();
}

function Accounts(props) {
  const [isFormOpen, setIsFormOpen] = useState(false);


  function dateFormatter(dateArray) {
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    return year + " : " + month + " : " + day;
  }

    const [user, setUser] = useState([])

    useEffect(() => {
      getAllUser()
    }, [])

    async function getAllUser() {
        

      listUsers().then((response) => {
    alertify.success(response.status);
    console.error(response.status);

    alertify.success(" succesfull");
    if(response.status === 200)
    {
        setUser(response.data);
    }
        }).catch(error => {
            alertify.success(error.message);
            alertify.success(error.stack);
  
            console.error(error);
        })
    }
  return (
    <React.Fragment>
      <Title>المستخدمين </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> ID</TableCell>
            <TableCell>اسم المستخدم</TableCell>
            <TableCell>الاسم الكامل</TableCell>
            <TableCell>الحالة</TableCell>
            <TableCell>اضيف بواسطة</TableCell>
            <TableCell>تعديل</TableCell>
            <TableCell>حذف</TableCell>

            
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((item) => (
            <TableRow
              
              key={item.id}
            >
              <TableCell>{item.id}</TableCell>
             
              <TableCell>{item.user_name}</TableCell>
              <TableCell>{item.full_name}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.add_by}</TableCell>
              <TableCell><Button className='btn btn-success' >تعديل</Button></TableCell>
              <TableCell><Button className='btn btn-primary' >حذف</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

<Divider/>
 
      <Grid item xs={12} container justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsFormOpen(true)}
                  sx={{ backgroundColor: "#2f9d58" }}
                >
                  اضافة مستخدم
                </Button>
                <AddAccount
                  // onSaveAccount={handleSaveUser}
                  open={isFormOpen}
                  onClose={() => setIsFormOpen(false)}
                />
              </Grid>
    </React.Fragment>
  );
}


export default Accounts;
