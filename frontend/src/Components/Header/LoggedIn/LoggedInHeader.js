import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'
import axios from 'axios';
import AdminHeader from "./AdminHeader";
import UserHeader from "./UserHeader";
import * as PropTypes from "prop-types";
import DesktopUser from "./DesktopUser";
import DesktopAdmin from "./DesktopAdmin";

class LoggedInHeader extends Component {
    state = {
        redirect: false
    };

    determineAdmin = () => {
        switch (this.props.user.chief) {
            case null:
                return;
            case false:
                return (
                    <Fragment>
                        <UserHeader logout={this.logout} closeMenu={this.props.closeMenu}/>
                        <DesktopUser logout={this.logout} closeMenu={this.props.closeMenu}
                                           user={this.props.user}
                        />
                    </Fragment>
                );
            default:
                return (
                    <Fragment>
                        <AdminHeader logout={this.logout} closeMenu={this.props.closeMenu} user={this.props.user} menuShown={this.props.menuShown}/>
                        <DesktopAdmin logout={this.logout} closeMenu={this.props.closeMenu}
                                           user={this.props.user}
                        />
                    </Fragment>
                );
        }
    };

    logout = () => {
        axios.get("/api/logout").then(() => {
            this.setState({redirect: true})
        })
            .catch(error => {
                console.log(error)
            })
    };

    render() {
        if (this.state.redirect){
            return (<Redirect to={"/"}/>)
        }
        return (
            <Fragment>
                {this.determineAdmin()}
            </Fragment>
        )
    }
}

LoggedInHeader.propTypes = {
    user: PropTypes.object,
    menuShown: PropTypes.bool,
};


const mapStateToProps = state => {
    return {
        user: state.user,
        menuShown: state.menuShown
    }
};
export default connect(mapStateToProps, actions)(LoggedInHeader);



