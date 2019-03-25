import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
import Drawer from '@material-ui/core/Drawer';
import * as PropTypes from "prop-types";
import LoggedOutContent from "./LoggedOutContent";
import AboutSection from "../AboutSection";

class LoggedOutMobile extends Component{
    render(){
        return (
            <div className={"mobile mobile-header"}>
                <Drawer variant={"temporary"} className={"mobile"} open={this.props.menuShown} onClose={() => this.props.closeMenu()}>
                    <div className={"close-div"}
                         tabIndex={0}
                         role="button"
                         onClick={this.props.closeMenu}
                         onKeyDown={this.props.closeMenu}
                         onScrollCapture={this.props.closeMenu}>
                        <div className={"nav-items-test"}>
                            <LoggedOutContent/>
                            <AboutSection/>
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}

LoggedOutMobile.propTypes = {
    closeMenu: PropTypes.func,
    menuShown: PropTypes.bool,
};

const mapStateToProps = state => {
    return {
        menuShown: state.menuShown,
    }
};

export default connect(mapStateToProps, actions)(LoggedOutMobile);



