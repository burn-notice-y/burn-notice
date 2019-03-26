import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateReport from './CreateReport';
import ReportDisplay from './ReportDisplay';
import BigReport from "./BigReport";
import UserReportDisplay from "./UserReportDisplay";

const ReportsRouter = () => (
    <Switch>
        <Route path={"/reports/display"} render={() => <ReportDisplay/>}/>
        <Route path={"/reports/create/:pageNumber"} render={(routeProps) => <CreateReport {...routeProps}/>}/>
        <Route path={"/reports/view/:id"} render={(routeProps) => <BigReport {...routeProps}/>}/>
        <Route path={"/reports/all"} render={() => <UserReportDisplay/>}/>
    </Switch>
);

export default ReportsRouter;