import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { listMemberJobs, deleteMemberJobs, editMemberJob, updateDataMemberJob } from '../service/MemberJobService.js';
import Grid from "@mui/material/Grid";
import AddMemberJob from "./Form/AddMemberJob.js";
import Divider from "@mui/material/Divider";
import { withAlert } from './withAlert';

function MemberJobs({ alert }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [memberJobId, setMemberJobId] = useState(null);
  const [memberJobs, setMemberJobs] = useState([]);

  useEffect(() => {
    getAllMemberJobs();
  }, []);

  async function getAllMemberJobs() {
    try {
      const response = await listMemberJobs();
      if (response.status === 200) {
        setMemberJobs(response.data);
      } else {
        alert.showAlert("Failed to fetch member jobs", "error");
      }
    } catch (error) {
      alert.showAlert("An error occurred while fetching member jobs", "error");
      console.error(error);
    }
  }

  const handleEditMemberJob = (id) => {
    setMemberJobId(id);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setMemberJobId(0);
    setIsFormOpen(false);
  }

  const handleNewMemberJob = () => {
    setMemberJobId(0);
    setIsFormOpen(true);
  }

  const handleUpdateMemberJob = async () => {
    await getAllMemberJobs();
  };

  const handleDeleteMemberJob = async (id) => {
    try {
      await deleteMemberJobs(id);
      alert.showAlert("Member job deleted successfully!", "success");
      getAllMemberJobs();
    } catch (error) {
      alert.showAlert("Error deleting member job!", "error");
      console.error("Error deleting member job:", error);
    }
  };

  return (
    <React.Fragment>
      <Title>Member Jobs</Title> {/* Replace with appropriate title */}

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> ID</TableCell>
            <TableCell>اسم الوضيفة</TableCell>
            <TableCell>الحالة</TableCell>
            <TableCell>اضيف بواسطة</TableCell>
            <TableCell>تاريخ الاصافة</TableCell>            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {memberJobs.map((item) => (
            <TableRow key={item.id}> 
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name_job}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.add_by.user_name}</TableCell>
              <TableCell>{item.add_date}</TableCell>              <TableCell>
                <Button className="btn btn-success" onClick={() => handleEditMemberJob(item.id)}> {/* Use the correct id */}
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button className="btn btn-primary" onClick={() => handleDeleteMemberJob(item.id)}> {/* Use the correct id */}
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
          onClick={() => handleNewMemberJob()}
          sx={{ backgroundColor: "#2f9d58" }}
        >
          Add Member Job {/* Replace with appropriate text */}
        </Button>

        {isFormOpen && (
          <AddMemberJob
            open={isFormOpen}
            onClose={() => handleCloseForm()} //correct function passed
            memberJobId={memberJobId} //correct name passed
            onSaveMemberJob={handleUpdateMemberJob}
          />
        )}
      </Grid>
    </React.Fragment>
  );
}

export default withAlert(MemberJobs);
