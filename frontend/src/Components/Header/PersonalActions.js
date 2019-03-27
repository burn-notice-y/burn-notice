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
        <ListItem button>
            <Link component={RouterLink} to={"/user/profile"} className={"router-link"}>
            <ListItemIcon><Person/></ListItemIcon>
                <ListItemText primary={"Profile"} onClick={closeMenu}/>
            </Link>
        </ListItem>
            <div className={"close-div router-link"}
                 tabIndex={0}
                 role="button"
                 onClick={logout}
                 >
        <ListItem button>
            <ListItemIcon><PersonOutline/></ListItemIcon>
                <ListItemText primary={"Logout"}/>
        </ListItem>
            </div>
    </List>
);

PersonalActions.propTypes = {
    closeMenu: PropTypes.func,
    logout: PropTypes.func,

};

export default PersonalActions;
