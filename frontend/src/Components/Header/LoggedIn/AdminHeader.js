import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from "prop-types";
import AdminActions from "./AdminActions";
import TopNavBar from "../TopBar";
import PersonalActions from "../PersonalActions";

const AdminHeader = ({ menuShown, closeMenu, logout, user}) => (
    <div className="mobile mobile-admin-header">
        <TopNavBar/>
    <Drawer variant={"temporary"} open={menuShown} onClose={closeMenu.bind(this)}>
        <div className={"close-div"}
             tabIndex={0}
             role="button"
             onScrollCapture={closeMenu}>
            <div className={"nav-items-test"}>
                <CardHeader title={"Burn Notice"} subheader={`Welcome, Chief ${user.lastName}`}/>
                <List>
                    <AdminActions closeMenu={closeMenu} user={user}/>
                </List>
                <Divider/>
                <List>
                    <PersonalActions logout={logout} closeMenu={closeMenu}/>
                </List>
            </div>
        </div>
    </Drawer>
    </div>
);

AdminHeader.propTypes = {
    closeMenu: PropTypes.func,
    user: PropTypes.object,
    menuShown: PropTypes.bool,
    logout: PropTypes.func,
};

const mapStateToProps = state => {
    return {
        menuShown: state.menuShown,
        user: state.user
    }
};
export default connect(mapStateToProps, actions)(AdminHeader);



