import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateReport from './CreateReport';
import ReportDisplay from './ReportDisplay';

const ReportsRouter = () => (
    <Switch>
        <Route path={"/reports/create"} render={() => <CreateReport/>}/>
        <Route path={"/reports/display"} render={() => <ReportDisplay/>}/>
    </Switch>
);

export default ReportsRouter;