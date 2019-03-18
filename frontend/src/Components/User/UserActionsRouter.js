import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Profile from "./Profile";
import Login from "./Login";
import Register from "./Register";

const UserActionRouter = () => (
    <Switch>
        <Route path={"/user/profile"} render={() => <Profile />}/>
        <Route path={"/user/login"} render={() => <Login/>}/>
        <Route path={"/user/register"} render={() => <Register/>}/>
    </Switch>
);

export default UserActionRouter;