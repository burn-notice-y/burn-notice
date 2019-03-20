import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateReport from './CreateReport';
import ReportDisplay from './ReportDisplay';
import ManyReports from "./ManyReports";

const ReportsRouter = () => (
    <Switch>
<<<<<<< HEAD
        <Route path={"/reports/create"} render={() => <CreateReport/>}/>
        <Route path={"/reports/display"} render={() => <ReportDisplay/>}/>
=======
        <Route path={"/reports/create/:pageNumber"} render={(routeProps) => <CreateReport {...routeProps}/>}/>
>>>>>>> 9b45d3325227137c56534df0e7eb78f4fab844e6
    </Switch>
);

export default ReportsRouter;