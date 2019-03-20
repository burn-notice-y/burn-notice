import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateTransferReq from "./CreateTransferReq";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import vacancy from "../../data/bigVacancy";
import transferRequest from '../../data/transferRequest';


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
            header = "Applicants Information";
            applicantHeader = "Review the Application";
            applicant = transferRequest;
        }
        return (
            <Switch>
                <Route path={"/transfer/create/:id"} render={() => <CreateTransferReq applicantHeader={applicantHeader}
                                                                                      header={header}
                                                                                      {...applicant}/>}/>
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