// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "../login/Login";
import Constant from "../dashboard/Constants";

import Dashboard from "../dashboard/Dashboard"
import Users from "../dashboard/Users"
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import * as React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import alertify from "alertifyjs";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { Navigate } from "react-router-dom";
import MemberJobs from "../dashboard/MemberJobs";
import MemberData from "../dashboard/MemberData";
import CommitteeData from "../dashboard/CommitteeData";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})
  (({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme({
  direction: 'rtl',
});


const userRoute = () => {


  Navigate('/Users');
}
const SystemConstants = async (event) => {

  return <Navigate to="/login" />
  alertify.success("Login succesfull.")
  Navigate('/Users')



};
function App() {

  return (
    <div>
      <BrowserRouter className="App" id="light">

        <ThemeProvider theme={defaultTheme} >
          <Box sx={{ display: "flex" }} dir="rtl">
            <CssBaseline />
            <Drawer variant="permanent" open={true}>
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >

              </Toolbar>
              <Divider />
              <List component="nav">
                <React.Fragment>
                  <Link to="/constants">
                    <ListItemButton Navigate>
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary="تهيئة ثوابت النظام" />
                    </ListItemButton>
                  </Link>
                  <Link to="/users">
                    <ListItemButton onClick={SystemConstants}>
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary="إدارة المستخدمين" />
                    </ListItemButton>
                  </Link>

                  <Link to="/member-jobs">
                    <ListItemButton Navigate  >
                      <ListItemIcon>
                        <BarChartIcon />
                      </ListItemIcon>
                      <ListItemText primary="وظائف أعضاء اللجان" />
                    </ListItemButton>
                  </Link>

                  <Link to="/member-data">

                    <ListItemButton >
                      <ListItemIcon>
                        < PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary="الأعضاء" />
                    </ListItemButton>
                  </Link>

                  <Link to="/committee-data">
                    <ListItemButton>
                      <ListItemIcon>
                        <LayersIcon />
                      </ListItemIcon>
                      <ListItemText primary="اللجان" />
                    </ListItemButton>
                  </Link>

                </React.Fragment>

              </List>
            </Drawer>
            <AppBar
              position="absolute"
              sx={{ backgroundColor: "#2f9d58" }}
            >
              <Toolbar
                sx={{
                  pr: "24px", // keep right padding when drawer closed
                }}
              >
               

              </Toolbar>
            </AppBar>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
         
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>

                      <Routes>
                        <Route path="/" element={<Dashboard></Dashboard>}></Route>
                        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
                        <Route path="/users" element={<Users></Users>}></Route>
                        <Route path="/constants" element={<Constant></Constant>}></Route>
                        <Route path="/member-jobs" element={<MemberJobs></MemberJobs>}></Route>
                        <Route path="/member-data" element={<MemberData></MemberData>}></Route>
                        <Route path="/committee-data" element={<CommitteeData></CommitteeData>}></Route>

                      </Routes>

                    </Paper>
                  </Grid>

                </Grid>


              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </BrowserRouter>



    </div>
  );
}

export default App;
