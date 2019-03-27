import React, {Fragment} from 'react';
import List from "@material-ui/core/List/List";
import * as PropTypes from "prop-types";
import Email from '@material-ui/icons/Email';
import About from '@material-ui/icons/School';
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import Link from "react-router-dom/es/Link";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";

const AboutSection = ({ closeMenu }) => (
    <Fragment>
        <ListSubheader>Information</ListSubheader>
        <List>
            {[[`Contact`, `/visitor/contact}`], ['About Us', '/visitor/about']].map((text, index) => (
            <ListItem button key={index} onClick={closeMenu}>
                <Link to={text[1]} className={"router-link"}>
                    <ListItemIcon>{text[0] === "Contact" ? <Email/> : <About/> }</ListItemIcon>
                    <ListItemText primary={text[0]}/>
                </Link>
            </ListItem>))}
        </List>
    </Fragment>
);
AboutSection.propTypes = {
    closeMenu: PropTypes.func,
};

export default AboutSection;
