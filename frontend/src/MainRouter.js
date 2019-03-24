import React, {PureComponent} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import VacancyRouter from "./Components/Vacancies/VacancyRouter";
import AssignmentRouter from "./Components/Assignments/AssignmentsRouter";
import TransferRouter from "./Components/TransferReq/TransferRouter";
import ReportsRouter from "./Components/Reports/ReportsRouter";
import StationRouter from "./Components/Stations/StationRouter";
import { connect } from 'react-redux';
import * as actions from './store/actions';

class MainRouter extends PureComponent {
    render() {
        switch (this.props.user) {
            case null:
                return <div/>;
            case false:
                return <Redirect to={"/visitor/login"}/>;
            default: break;
        }
        return (
            <Switch>
                <Route path={"/vacancy"} render={() => <VacancyRouter/>}/>
                <Route path={"/assignments"} render={() => <AssignmentRouter/>}/>
                <Route path={"/transfer"} render={() => <TransferRouter/>}/>
                <Route path={"/reports"} render={() => <ReportsRouter/>}/>
                <Route path={"/stations"} render={() => <StationRouter/>}/>
            </Switch>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, actions)(MainRouter);
