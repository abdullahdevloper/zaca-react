import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { listConstants, deleteConstant } from '../service/ConstantsService.js'
import alertify from "alertifyjs";
import Grid from "@mui/material/Grid";
import AddConstant from "./Form/AddConstant.js";
import Divider from "@mui/material/Divider";


function preventDefault(event) {
  event.preventDefault();
}
function Constants() {
  const [isFormOpen, setIsFormOpen] = useState(false);


  function dateFormatter(dateArray) {
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    return year + " : " + month + " : " + day;
  }

    const [constant, setConstant] = useState([])

    useEffect(() => {
      getAllConstants()
    }, [])

    function getAllConstants() {
      listConstants().then((response) => {
    alertify.success(" succesfull.");
    if(response.status === 200)
    setConstant(response.data)
        }).catch(error => {
  
            console.error(error);
        })
    }
  return (
    <React.Fragment>
      <Title>ثوابت النظام </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> ID</TableCell>
            <TableCell>اسم الثابت</TableCell>
            <TableCell>الكود</TableCell>
            <TableCell>الحالة</TableCell>
            <TableCell>اضيف بواسطة</TableCell>
            <TableCell>تاريخ الاصافة</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {constant.map((item) => (
            <TableRow
              
              key={item.id}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name_constants}</TableCell>
              <TableCell>{item.code_constants}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.add_by}</TableCell>
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
                  اضافة جديد
                </Button>
                <AddConstant
                  // onSaveAccount={handleSaveUser}
                  open={isFormOpen}
                  onClose={() => setIsFormOpen(false)}
                />
              </Grid>
    </React.Fragment>
  );
}


export default Constants;
