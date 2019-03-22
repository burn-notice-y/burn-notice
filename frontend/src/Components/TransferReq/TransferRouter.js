import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateTransferReq from "./CreateTransferReq";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import transferRequest from '../../data/transferRequest';
import ViewTransferReq from "./ViewTransferReq";

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
                <Route path={"/transfer/create/:id"} render={(routeProps) =>
                    <CreateTransferReq applicantHeader={applicantHeader}
                                       header={header}
                                       {...routeProps}
                                       {...applicant}/>}/>
                <Route path={"/transfer/view"}  render={() => <ViewTransferReq/>}/>
            </Switch>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, actions)(TransferRouter);