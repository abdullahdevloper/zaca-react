import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { listMemberJobs, deleteMemberJobs } from '../service/MemberJobService.js'
import alertify from "alertifyjs";
import Grid from "@mui/material/Grid";
import AddMemberJob from "./Form/AddMemberJob.js";
import Divider from "@mui/material/Divider";



function MemberJobs() {
  const [isFormOpen, setIsFormOpen] = useState(false);


  function dateFormatter(dateArray) {
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    return year + " : " + month + " : " + day;
  }

    const [memberJob, setmemberJob] = useState([])

    useEffect(() => {
      getAllMemberJobs()
    }, [])

    function getAllMemberJobs() {
      listMemberJobs().then((response) => {
    
    
        if(response.status === 200)
          {
            setmemberJob(response.data);          }
        }).catch(error => {
  
            console.error(error);
        })
    }
  return (
    <React.Fragment>
      <Title>وضائف الاعظاء </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> ID</TableCell>
            <TableCell>اسم الوضيفة</TableCell>
            <TableCell>الحالة</TableCell>
            <TableCell>اضيف بواسطة</TableCell>
            <TableCell>تاريخ الاصافة</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {memberJob.map((item) => (
            <TableRow
              
              key={item.id}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.job_title}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.add_by}</TableCell>
              <TableCell>{item.add_date}</TableCell>
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
                <AddMemberJob
                  // onSaveAccount={handleSaveUser}
                  open={isFormOpen}
                  onClose={() => setIsFormOpen(false)}
                />
              </Grid>
    </React.Fragment>
  );
}


export default MemberJobs;
