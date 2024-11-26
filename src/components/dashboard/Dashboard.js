import * as React from "react";
import { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Users from "./Users";
import axios from "axios";
import Button from "@mui/material/Button";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";
import AddAccount from "./Form/AddAccount";
import Login from "../login/Login";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  direction: 'rtl',
});

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  // Boş bağımlılık dizisi, sadece bir kez çalışmasını sağlar (componentDidMount benzeri)

  const toggleDrawer = () => {
    setOpen(true);
  };

  const handleSignOut = async (event) => {
    event.preventDefault();

    try {
      const apiUrl = "http://127.0.0.1:7080/logout";

      //local stroge token
      // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // const accessToken = userInfo.access_token; 

      //header object
      // const headers = {
      //   // Authorization: `Bearer ${accessToken}`,
      // };
      // console.log(headers.Authorization);

      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        localStorage.clear();
        alertify.success("Logout succesfull.");
        navigate("/");
      }

    } catch (error) {

      alertify.error("Logout failed.");
    }
  };

  const [isFormOpen, setIsFormOpen] = useState(false);


  const SystemConstants = async (event) => {

    try {

      alertify.success("Login succesfull.")
      navigate('/users')


    } catch (error) {
      alertify.error("navigate failed.")
    }

  };
  return (

    <Container  >
      <Grid container spacing={3}>
        {/* Chart */}

        {/* Recent Deposits */}

        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>

                            </Paper>
        </Grid>
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
      </Grid>


    </Container>
  );
}
