import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import PersonalActions from "../PersonalActions";
import AboutSection from "../AboutSection";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import UserActions from "./UserActions";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: "#9d1112",
        width: "100%"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

const DesktopUser = (props) => {
    const { classes } = props;

    return (
        <div className={"desktop desktop-menu"}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Burn Notice
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={"drawer"}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <CardHeader title={"Welcome"}
                            subheader={`${props.user.firstName} ${props.user.lastName}`}/>
                <List>
                <UserActions closeMenu={props.closeMenu} user={props.user}/>
                <PersonalActions closeMenu={props.closeMenu} logout={props.logout}/>
                <AboutSection closeMenu={props.closeMenu}/>
                </List>
            </Drawer>
        </div>
    );
};

DesktopUser.propTypes = {
    classes: PropTypes.object.isRequired,
    closeMenu: PropTypes.func,
    logout: PropTypes.func,
    user: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }),
};

export default withStyles(styles)(DesktopUser);