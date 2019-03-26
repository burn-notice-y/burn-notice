import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import '../../css/Header.css';

const TopNavBar = (props) => {
    return (
        <React.Fragment>
            <div className="top-nav-cont">
                <div className="menu-tog" onClick={props.toggleMenu}><i className="fas fa-bars"/></div>
            </div>
        </React.Fragment>
    )
};

const mapStateToProps = state => {

    return {
        ...state
    }
};
export default connect(mapStateToProps, actions)(TopNavBar);