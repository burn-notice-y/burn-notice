import React, {Component, Fragment} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions';
import './css/global.css';
import Register from "./Components/Register";
import Login from "./Components/Login";
import TopNavBar from './Components/Header/TopBar';
import Landing from './Components/Landing';
import Header from './Components/Header/Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import AdminPortal from "./Components/Admin/AdminPortal";
import UserPortal from "./Components/User/UserPortal";
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import VacancyDisplay from "./Components/Vacancies/VacancyDisplay";
import Profile from "./Components/Profile";



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
                    <Header/>
                    <TopNavBar/>
                    <main className={`main-content-cont ${loadingStyle}`}>
                    <Switch>
                        <Route path={"/register"} render={() => <Register/>}/>
                        <Route path={"/admin"} render={() => <AdminPortal/>}/>
                        <Route path={"/login"} render={() => <Login/>}/>
                        <Route path={"/vacancies"} render={() => <VacancyDisplay/>}/>
                        <Route path={"/profile"} render={() => <Profile/>}/>
                        <Route path={"/"} render={() => <Landing/>}/>
                    </Switch>
                    </main>
                    <CircularProgress className={`spinner ${spinnerStyle}`} />
                </Fragment>
            </BrowserRouter>
            </MuiPickersUtilsProvider>
        );
    }
}

App.propTypes = {
    fetchUser: PropTypes.any.isRequired
};

const mapStateToProps = state => {
    return {
        menuShown: state.menuShown,
        isLoading: state.isLoading
    }
};
export default connect(mapStateToProps, actions)(App);
