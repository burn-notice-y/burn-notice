import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'
import LoggedOutMobile from "./LoggedOutMobile";
import DesktopLoggedOut from "./DesktopLoggedOut";

class LoggedOutHeader extends Component {
    render() {
        return (
            <Fragment>
                <LoggedOutMobile/>
                <DesktopLoggedOut/>
            </Fragment>
        )
    }
}

export default connect(null, actions)(LoggedOutHeader);



