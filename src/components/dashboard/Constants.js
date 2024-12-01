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
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Collapse } from "@mui/material";
import { createPortal } from "react-dom";
import { withAlert } from './withAlert';



function preventDefault(event) {
  event.preventDefault();
}
function Constants({ alert }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentConstant, setCurrentConstant] = useState(null);
  const [constantId, setConstantId] = useState(null);
  const [open, setOpen] = React.useState(true);



  const onCloseEditForm = () => {
    setIsFormOpen(false);
    setCurrentConstant(null);
  };
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
      if (response.status === 200)
        setConstant(response.data)
    }).catch(error => {

      console.error(error);
    })
  }
  const handleEditConstant = async (id) => setConstantId(id);
  const handleUpdateConstant = async (updatedConstantData) => {
    try {
      const response = await updateDataConstant(updatedConstantData.id, updatedConstantData);
      if (response.status === 200) {
        alert.show("Constant updated successfully", "success");
        onCloseEditForm();
        getAllConstants();

      }
      else {
        alertify.error("failed to update constant")
      }

    } catch (error) {
      alertify.error("An error occurred while updating constant data.");
      console.error(error);
    }

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

              key={item.id}
            >
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
          onClick={() => setIsFormOpen(true)}
          sx={{ backgroundColor: "#2f9d58" }}
        >
          اضافة جديد
        </Button>
        {isFormOpen && (
          <AddConstant
            onSaveConstant={handleUpdateConstant}
            open={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            constantId={constantId} // Safe to pass now, but handle null in AddConstant
          />
        )}
      </Grid>
    </React.Fragment>
  );
}
export default withAlert(Constants);

