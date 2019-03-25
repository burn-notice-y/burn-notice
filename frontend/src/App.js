import React, {Component, Fragment} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions';
import './css/global.css';
import TopNavBar from './Components/Header/TopBar';
import Landing from './Components/Landing';
import Header from './Components/Header/Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import MainRouter from "./MainRouter";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import Profile from "./Components/User/Profile";
import Popup from "./Components/Popup";
import OwnModal from "./Components/OwnModal";
import UserDesktopHeader from "./Components/Header/LoggedIn/UserDesktopHeader";

class App extends Component {
    componentDidMount() {
        // reaches out and sets user-logged in to store
        this.props.fetchUser();
    }
    render() {
        let loadingStyle = "";
        let spinnerStyle = "";
        if (this.props.isLoading){
            spinnerStyle = "spinner-active";
            loadingStyle = "loading-active";
        }

        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <BrowserRouter>
                <Fragment>
                    <Header user={this.props.user}/>
                    <main className={`main-content-cont ${loadingStyle}`}>
                    <Switch>
                        <Route path={"/visitor/register"} render={() => <Register/>}/>
                        <Route path={"/visitor/login"} render={() => <Login/>}/>
                        <Route path={"/user/profile"} render={() => <Profile />}/>
                        <Route path={"/:path"} render={(routeProps) => <MainRouter {...routeProps}/>}/>
                        <Route path={"/"} render={() => <Landing/>}/>
                    </Switch>
                    </main>
                    <CircularProgress className={`spinner ${spinnerStyle}`}/>
                    <Popup {...this.props.popup} close={this.props.closePopup}/>
                    <OwnModal handleClose={this.props.closeModal} {...this.props.modal}
                    />
                </Fragment>
            </BrowserRouter>
            </MuiPickersUtilsProvider>
        );
    }
}

App.propTypes = {
    fetchUser: PropTypes.func,
    menuShown: PropTypes.bool,
    isLoading: PropTypes.bool,
    modal: PropTypes.object,
    popup: PropTypes.shape({
        show: PropTypes.bool,
        message: PropTypes.string
    }),
    closePopup: PropTypes.func,
    closeModal: PropTypes.func,
    user: PropTypes.object,

};

const mapStateToProps = state => {
    return {
        menuShown: state.menuShown,
        isLoading: state.isLoading,
        modal: state.modal,
        popup: state.popup,
        user: state.user
    }
};
export default connect(mapStateToProps, actions)(App);
