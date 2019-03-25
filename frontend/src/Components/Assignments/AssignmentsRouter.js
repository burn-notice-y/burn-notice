import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BigAssignment from './BigAssignment';
import ManyAssignments from "./ManyAssignments";

const AssignmentsRouter = () => (
    <Switch>
        <Route path={"/assignments/show/:id"} render={routeProps => <ManyAssignments {...routeProps.match.params}/>}/>
        <Route path={"/assignments/:id"} render={() => <BigAssignment/>}/>

    </Switch>
);
export default AssignmentsRouter;