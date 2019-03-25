import React, {Fragment} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Typography from "@material-ui/core/Typography/Typography";
import Drawer from "@material-ui/core/Drawer/Drawer";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import AboutSection from "../AboutSection";
import LoggedOutContent from "./LoggedOutContent";

const LoggedOutDesktop = () => (
        <nav className={"desktop"}>
            <CssBaseline/>
            <AppBar position="fixed" className={"top-bar"}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Burn Notice
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" anchor="left" className={"perm-drawer"}>
                <LoggedOutContent/>
                <AboutSection/>
            </Drawer>
        </nav>
);

export default LoggedOutDesktop;