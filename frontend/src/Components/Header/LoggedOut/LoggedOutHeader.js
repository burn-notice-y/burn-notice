import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'
import LoggedOutMobile from "./LoggedOutMobile";
import LoggedOutDesktop from "./LoggedOutDesktop";

class LoggedOutHeader extends Component {
    render() {
        return (
            <Fragment>
                <LoggedOutMobile/>
                <LoggedOutDesktop/>
            </Fragment>
        )
    }
}

export default connect(null, actions)(LoggedOutHeader);



