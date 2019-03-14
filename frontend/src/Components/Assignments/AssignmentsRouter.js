import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AssignmentsDisplay from './AssignmentDisplay';
import BigAssignment from './BigAssignment';

const AssignmentsRouter = () => (
    <Switch>
        <Route path={"/assignments/show"} render={() => <AssignmentsDisplay/>}/>
        <Route path={"/assignments/:id"} render={() => <BigAssignment/>}/>

    </Switch>
);
export default AssignmentsRouter;