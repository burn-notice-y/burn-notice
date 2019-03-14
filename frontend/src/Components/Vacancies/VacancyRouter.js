import React from 'react';
import { Switch, Route } from 'react-router-dom';
import VacancyDisplay from "./VacancyDisplay";
import CreateVacancy from "../User/CreateReport";

const VacancyRouter = () => (
    <Switch>
        <Route path={"/vacancy/show"} render={() => <VacancyDisplay/>} />
        <Route path={"/vacancy/create"} render={() => <CreateVacancy/>} />
    </Switch>
);

export default VacancyRouter;