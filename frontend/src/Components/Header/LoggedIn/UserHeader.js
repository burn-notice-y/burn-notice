import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CardHeader from '@material-ui/core/CardHeader';
import PersonalActions from "../PersonalActions";
import * as PropTypes from "prop-types";
import TopNavBar from "../TopBar";
import UserActions from "./UserActions";
import AboutSection from "../AboutSection";

class UserHeader extends Component {
    state = {
        firstName: "",
        lastName: "",
        open: false
    };

    static getDerivedStateFromProps(nextState) {
        return {...nextState.user}
    }

    render() {
        return (
            <div className={"mobile mobile-header"}>
                <TopNavBar/>
                <Drawer variant={"temporary"} open={this.props.menuShown} onClose={this.props.closeMenu.bind(this)}>
                    <div className={"close-div"}
                         tabIndex={0}
                         role="button"
                         onScrollCapture={this.props.closeMenu}>
                        <div className={"nav-items-test"}>
                            <CardHeader title={"Burn Notice"}
                                        subheader={`Welcome, ${this.state.firstName} ${this.state.lastName}`}/>
                            <List>
                                <UserActions closeMenu={this.props.closeMenu} user={this.props.user}/>
                            </List>
                            <PersonalActions closeMenu={this.props.closeMenu} logout={this.props.logout}/>
                            <AboutSection/>
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}

UserHeader.propTypes = {
    closeMenu: PropTypes.func,
    menuShown: PropTypes.bool,
    logout: PropTypes.func,

};

const mapStateToProps = state => {
    return {
        user: state.user,
        menuShown: state.menuShown
    }
};
export default connect(mapStateToProps, actions)(UserHeader);



