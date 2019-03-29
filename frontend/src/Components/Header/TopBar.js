import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import '../../css/Header.css';
import * as PropTypes from "prop-types";
import logo from '../../assets/images/company-logo.png';

const TopNavBar = (props) => (
        <div className="top-nav-cont">
            <div className={"logo-cont"}>
                <div className="menu-tog" onClick={props.toggleMenu}><i className="fas fa-bars"/></div>
            </div>
            <div className={"logo-cont"}>
                <img src={logo} alt={"company logo"} className={"logo"}/>
            </div>
        </div>
);

TopNavBar.propTypes = {
    toggleMenu: PropTypes.func,
};

export default connect(null, actions)(TopNavBar);