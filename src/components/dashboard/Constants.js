import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { listConstants, deleteConstant, editConstant, updateDataConstant } from '../service/ConstantsService.js'
import alertify from "alertifyjs";
import Grid from "@mui/material/Grid";
import AddConstant from "./Form/AddConstant.js";
import Divider from "@mui/material/Divider";
import { withAlert } from './withAlert';



function Constants({ alert }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [constantId, setConstantId] = useState(null);


  const [constant, setConstant] = useState([])

  useEffect(() => {
    getAllConstants()
  }, [])

  function getAllConstants() {
    listConstants().then((response) => {
      alertify.success(" succesfull.");
      if (response.status === 200)
        setConstant(response.data)
    }).catch(error => {
      alertify.success(error.message,"error");
    })
  }
  const handleEditConstant = async (id) => setConstantId(id);

  const handleCloseForm = () => {
    setConstantId(0);
    setIsFormOpen(false); // Open the form when edit is clicked
  };
  const handleNewConstant = () => {
    setConstantId(0);
    setIsFormOpen(true); // Open the form when edit is clicked
  };
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
            <TableCell>تعديل</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {constant.map((item) => (
            <TableRow
              key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name_constants}</TableCell>
              <TableCell>{item.code_constants}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.add_by}</TableCell>

              <TableCell>
                <Button className="btn btn-success" onClick={() => handleEditConstant(item.id)}>Edit</Button>
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
          onClick={() => handleNewConstant(true)}
          sx={{ backgroundColor: "#2f9d58" }}
        >
          اضافة جديد
        </Button>
        {isFormOpen && (
          <AddConstant
            open={isFormOpen}
            onClose={() => handleCloseForm()}
            constantId={constantId} 
          />
        )}
      </Grid>
    </React.Fragment>
  );
}
export default withAlert(Constants);

