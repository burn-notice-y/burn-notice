import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom'
import Profile from "./Profile";
import UserVacancies from "./UserVacancies";

// this component is to route the user actions

class UserPortal extends Component {
    render(){
        return (
            <Fragment>
                <Switch>
                    <Route path={"/profile/vacancies"} render={() => <UserVacancies/>}/>
                    <Route path={"/profile"} render={() => <Profile/>}/>
                </Switch>
            </Fragment>
        )
    }
}
export default UserPortal;