import React, {Component, Fragment} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions';
import './css/global.css';
import Register from "./Components/Register";
import TopNavBar from './Components/Header/TopBar';
import Header from './Components/Header/Header';
import CircularProgress from '@material-ui/core/CircularProgress';

class App extends Component {
    componentDidMount() {
        // reaches out and sets user-logged in to store
        this.props.fetchUser();
        this.props.toggleLoading();
        setTimeout(() => {
            this.props.toggleLoading()
        }, 2000)
    }
    render() {
        let loadingStyle = "";
        let spinnerStyle = "";
        if (this.props.isLoading){
            loadingStyle = "loading-active";
            spinnerStyle = "spinner-active";
        }
        return (
            <BrowserRouter>
                <Fragment>
                    <Header/>
                    <TopNavBar/>
                    <main className={`main-content-cont ${loadingStyle}`}>
                    <Switch>
                        <Route path={"/register"} render={() => <Register/>}/>
                    </Switch>
                    </main>
                    <CircularProgress className={`spinner ${spinnerStyle}`} />
                </Fragment>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        menuShown: state.menuShown,
        isLoading: state.isLoading
    }
};
export default connect(mapStateToProps, actions)(App);
