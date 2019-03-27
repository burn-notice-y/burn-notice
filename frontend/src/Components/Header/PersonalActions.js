import React from 'react';
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem/ListItem";
import Person from '@material-ui/icons/Person';
import PersonOutline from '@material-ui/icons/PersonOutline';
import Link from "@material-ui/core/Link/Link";
import {Link as RouterLink} from "react-router-dom";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";


const PersonalActions = ({closeMenu, logout}) => (
    <List>
        <ListSubheader>Personal</ListSubheader>
        <Link component={RouterLink} to={"/user/profile"} className={"router-link"}>
            <ListItem button>
            <ListItemIcon><Person/></ListItemIcon>
                <ListItemText primary={"Profile"} onClick={closeMenu}/>
            </ListItem>
        </Link>
        <ListItem button onClick={logout}>
            <ListItemIcon><PersonOutline/></ListItemIcon>
                <ListItemText primary={"Logout"}/>
        </ListItem>
    </List>
);

PersonalActions.propTypes = {
    closeMenu: PropTypes.func,
    logout: PropTypes.func,

};

export default PersonalActions;
