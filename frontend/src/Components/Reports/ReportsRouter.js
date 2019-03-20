import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateReport from './CreateReport';
import ReportDisplay from './ReportDisplay';

const ReportsRouter = () => (
    <Switch>
        <Route path={"/reports/display"} render={() => <ReportDisplay/>}/>
        <Route path={"/reports/create/:pageNumber"} render={(routeProps) => <CreateReport {...routeProps}/>}/>
    </Switch>
);

export default ReportsRouter;