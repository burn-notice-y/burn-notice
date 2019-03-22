import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateReport from './CreateReport';
import ReportDisplay from './ReportDisplay';
import BigReport from "./BigReport";

const ReportsRouter = () => (
    <Switch>
        <Route path={"/reports/display"} render={() => <ReportDisplay/>}/>
        <Route path={"/reports/create/:pageNumber"} render={(routeProps) => <CreateReport {...routeProps}/>}/>
        <Route path={"/reports/view/:id"} render={(routeProps) => <BigReport {...routeProps}/>}/>
    </Switch>
);

export default ReportsRouter;