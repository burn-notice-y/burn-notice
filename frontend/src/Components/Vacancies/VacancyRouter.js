import React from 'react';
import { Switch, Route } from 'react-router-dom';
import VacancyDisplay from "./VacancyDisplay";
import CreateVacancy from "../Vacancies/CreateVacancy";

const VacancyRouter = () => (
    <Switch>
        <Route path={"/vacancy/show"} render={() => <VacancyDisplay/>} />
        <Route path={"/vacancy/create"} render={() => <CreateVacancy/>} />
    </Switch>
);

export default VacancyRouter;