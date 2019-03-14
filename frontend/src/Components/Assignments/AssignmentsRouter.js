import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BigAssignment from './BigAssignment';
import ManyAssignments from "./ManyAssignments";

const AssignmentsRouter = () => (
    <Switch>
        <Route path={"/assignments/show"} render={() => <ManyAssignments/>}/>
        <Route path={"/assignments/:id"} render={() => <BigAssignment/>}/>

    </Switch>
);
export default AssignmentsRouter;