import React from 'react';
import List from "@material-ui/core/List/List";
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';
import DropDownList from "./DropDownList";
import * as PropTypes from "prop-types";
import Public from '@material-ui/icons/Public';
import ContactMail from '@material-ui/icons/ContactMail';
import About from '@material-ui/icons/School';

const AboutSection = ({ closeMenu }) => (
    <List>
       <DropDownList closeMenu={closeMenu}
                     listItems={[
                         [<ContactMail/>, "Contact", "/visitor/contact"],
                        [<About/>, "About", "/visitor/About"],
                     ]}
                     primaryText={"Information"}
                     mainIcon={<Public/>}
       />
    </List>
);
AboutSection.propTypes = {
    closeMenu: PropTypes.func,
};


export default AboutSection;
