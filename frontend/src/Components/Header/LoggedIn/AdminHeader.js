import React, {Component} from 'react';
import {Link as RouterLink } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Assignment from '@material-ui/icons/Assignment';

import Description from '@material-ui/icons/Description';
import PropTypes from "prop-types";
import UserActions from "./UserActions";
import AdminActions from "./AdminActions";

class AdminHeader extends Component {
    state = {
        redirect: false
    };

    render() {
        return (
            <Drawer variant={"temporary"} open={this.props.menuShown} onClose={this.props.closeMenu.bind(this)}>
                <div className={"close-div"}
                     tabIndex={0}
                     role="button"
                     onClick={this.props.closeMenu}
                     onKeyDown={this.props.closeMenu}
                     onScrollCapture={this.props.closeMenu}>
                    <div className={"nav-items-test"}>
                        <CardHeader title={"Burn Notice"} subheader={`Welcome, Chief ${this.props.user.lastName}`}/>
                        <List>
                            <AdminActions closeMenu={this.props.closeMenu}/>
                        </List>
                        <Divider/>
                        <List>
                            <UserActions user={this.props.user} closeMenu={this.props.closeMenu}/>
                        </List>
                    </div>
                </div>
            </Drawer>
        )
    }
}

AdminHeader.propTypes = {
    closeMenu: PropTypes.func,
    user: PropTypes.object,
    menuShown: PropTypes.bool,
};

const mapStateToProps = state => {
    return {
        menuShown: state.menuShown,
        user: state.user
    }
};
export default connect(mapStateToProps, actions)(AdminHeader);



