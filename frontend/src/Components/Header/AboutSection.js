import React, {Fragment} from 'react';
import List from "@material-ui/core/List/List";
import * as PropTypes from "prop-types";
import About from '@material-ui/icons/School';
import Public from '@material-ui/icons/Public';
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import Link from "react-router-dom/es/Link";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";

const AboutSection = ({ closeMenu }) => (
    <Fragment>
        <ListSubheader>Information</ListSubheader>
        <List>
            <Link to={"/visitor/about"} className={"router-link"}>
                <ListItem button onClick={closeMenu}>
                    <ListItemIcon><About className={"icon"}/></ListItemIcon>
                    <ListItemText primary={"About Us"}/>
                </ListItem>
            </Link>
            <Link to={"/visitor/disclaimer"} className={"router-link"}>
                <ListItem button onClick={closeMenu}>
                    <ListItemIcon><Public className={"icon"}/></ListItemIcon>
                    <ListItemText primary={"Disclaimer"}/>
                </ListItem>
            </Link>
        </List>
    </Fragment>
);
AboutSection.propTypes = {
    closeMenu: PropTypes.func,
};

export default AboutSection;
