import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import Drawer from "@material-ui/core/Drawer/Drawer";
import AboutSection from "../AboutSection";
import AdminActions from "./AdminActions";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import PersonalActions from "../PersonalActions";

const UserDesktopHeader = ({user, logout, closeMenu}) => (
    <div className={"desktop desktop-header"}>
        <CssBaseline/>
        <AppBar position="fixed" className={"top-bar"}>
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    Burn Notice
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            anchor="left"
            className={"perm-drawer"}
        >
            <CardHeader title={"Welcome"}
                        subheader={`${user.firstName} ${user.lastName}`}/>
            <AdminActions closeMenu={closeMenu} user={user}/>
            <PersonalActions closeMenu={closeMenu} logout={logout}/>
            <AboutSection closeMenu={closeMenu}/>
        </Drawer>
    </div>
);

UserDesktopHeader.propTypes = {
    closeMenu: PropTypes.func,
    logout: PropTypes.func,
    user: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }),
};



export default UserDesktopHeader;
