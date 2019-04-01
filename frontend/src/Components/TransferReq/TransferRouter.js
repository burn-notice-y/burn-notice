import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import ReviewTransferReq from "./ReviewTransferReq";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import transferRequest from '../../data/transferRequest';
import TransferReqDisplay from "./TransferReqDisplay";
import UserTransferReqs from "./UserTransferReqs";
import TransferReqByVacancy from "./TransferReqByVacancy";

class TransferRouter extends Component{
    state ={
      user: null
    };

    static getDerivedStateFromProps(nextProps){
        return {...nextProps}
    }

    render(){
        let applicant = this.state.user;
        let applicantHeader = "Review Your Application";
        let header = "Review Your Application";
        if (applicant && applicant.chief){
            header = "Review the Application";
            applicantHeader = "Applicants Information";
            applicant = transferRequest;
        }
        return (
            <Switch>
                <Route path={"/transfer/review/:id"} render={routeProps =>
                    <ReviewTransferReq applicantHeader={applicantHeader}
                                       header={header}
                                       {...routeProps}
                                       {...applicant}/>}/>
                <Route path={"/transfer/view/:id"}  render={routeProps => <UserTransferReqs {...routeProps.match.params}/>}/>
                <Route path={"/transfer/vacancy/:id"}  render={routeProps => <TransferReqByVacancy {...routeProps.match.params}/>}/>
                <Route path={"/transfer/view"}  render={() => <TransferReqDisplay />}/>
            </Switch>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default withRouter(connect(mapStateToProps, actions)(TransferRouter));