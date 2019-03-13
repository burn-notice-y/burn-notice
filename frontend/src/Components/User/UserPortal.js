import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom'
import Profile from "./Profile";

// this component is to route the user actions

class UserPortal extends Component {
    render(){
        return (
            <Fragment>
                <Switch>
                    <Route path={"/profile"} render={() => <Profile/>}/>
                </Switch>
            </Fragment>
        )
    }
}
export default UserPortal;