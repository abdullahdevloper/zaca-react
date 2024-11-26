import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import * as React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemText from '@mui/material/ListItemText';
import alertify from "alertifyjs";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { useNavigate } from "react-router-dom";

export default function Drawer() {

  const navigate = useNavigate();

    const SystemConstants = async (event) => {

        try {

            alertify.success("Login succesfull.")


        } catch (error) {
            alertify.error("navigate failed.")
        }

    };

    return (
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
                    <ListItemButton >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="تهيئة ثوابت النظام" />
                    </ListItemButton>
                    <ListItemButton onClick={SystemConstants}>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="إدارة المستخدمين" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="وظائف أعضاء اللجان" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="الأعضاء" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <LayersIcon />
                        </ListItemIcon>
                        <ListItemText primary="اللجان" />
                    </ListItemButton>
                </React.Fragment>

            </List>
        </Drawer>
    );

}