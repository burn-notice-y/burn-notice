import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom'
import CreateVacancy from "./CreateVacancy";
import AdminVacancies from "./AdminVacancies";

// this component is the view for the admin to route to actions

class AdminPortal extends Component {
    render(){
        // if not admin, check if logged in. if yes, redirect to profile, if not logged in, redirect to login
        return (
            <Fragment>
                <Switch>
                    <Route path={"/admin/create/vacancy"} render={() => <CreateVacancy/>}/>
                    <Route path={"/admin/view/vacancy"} render={() => <AdminVacancies/>}/>
                </Switch>
            </Fragment>
        )
    }
}
export default AdminPortal;