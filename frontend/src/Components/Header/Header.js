import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import LoggedOutHeader from './LoggedOut/LoggedOutHeader';
import LoggedInHeader from './LoggedIn/LoggedInHeader';
import * as PropTypes from "prop-types";

const Header = ({ user }) => (
    <Fragment>
        {user ? <LoggedInHeader/> : <LoggedOutHeader/>}
    </Fragment>
);

Header.propTypes = {
    user: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
};
export default connect(mapStateToProps)(Header);