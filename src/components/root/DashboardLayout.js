
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';

import Users from '../dashboard/Users';
import Constants from '../dashboard/Constants'; // Import your Constants component
import MemberJobs from '../dashboard/MemberJobs';
import MemberData from '../dashboard/MemberData';
import CommitteeData from '../dashboard/CommitteeData';
import DashboardComponent from '../dashboard/Dashboard'; // Import your Dashboard component


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));



export default function DashboardLayout() { // Changed component name to avoid conflicts
  const [open, setOpen] = React.useState(true); // Drawer starts open
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open); // Toggle drawer state
  };


  return (
    <Box sx={{ display: 'flex' }} dir="rtl">
      <CssBaseline />
      <AppBar position="absolute" open={open} sx={{ backgroundColor: "#2f9d58" }}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
            pl: open ? '24px' : 0 // Add left padding when drawer is open
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }), // Hide menu icon when drawer is open
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
         {/* Add Logout button or other elements here */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon /> {/* Close icon */}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
           <React.Fragment>
                  <Link to="/constants">
                    <ListItemButton >
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary="تهيئة ثوابت النظام" />
                    </ListItemButton>
                  </Link>
                  <Link to="/users">
                    <ListItemButton >
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary="إدارة المستخدمين" />
                    </ListItemButton>
                  </Link>

                  <Link to="/member-jobs">
                    <ListItemButton  >
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
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar /> {/* This toolbar is needed to avoid content being hidden under the AppBar */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Routes>
                  <Route path="/" element={<DashboardComponent />} /> {/* Use imported Dashboard component */}
                  <Route path="/dashboard" element={<DashboardComponent />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/constants" element={<Constants />} />
                  <Route path="/member-jobs" element={<MemberJobs />} />
                  <Route path="/member-data" element={<MemberData />} />
                  <Route path="/committee-data" element={<CommitteeData />} />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

