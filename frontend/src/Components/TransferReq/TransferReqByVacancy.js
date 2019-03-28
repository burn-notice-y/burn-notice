import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import ManyTransferReq from "./ManyTransferReq";
import '../../css/TransferReq.css';
import Typography from "@material-ui/core/Typography/Typography";
import DropDown from "../DropDown";
import { vacancyStatus } from '../../data/categories';
import EmptyDisplay from '../EmptyDisplay'

class TransferReqByVacancy extends Component {
    state = {
        requests: [],
        filterTerm: ""
    };

    componentDidMount() {
        this.props.toggleLoading();
        axios.get(`/api/station-vacancies?id=${this.props.id}`)
            .then(res => {
                this.props.toggleLoading();
                this.setState({requests: res.data})
            }).catch(() => {
                this.props.toggleLoading();
                this.props.showModal(["Oops", "Looks like something went wrong", "Please try again later"])
        })
    }

    inputHandler = type => event => {
        event.target.value === "All" ? this.setState({[type]: ""}) :
            this.setState({
            [type]: event.target.value
        })
    };

    render() {
        const filteredRequests = this.state.requests.filter(request => request.status.includes(this.state.filterTerm));
        return (
            <div className={"vacancy-transfers-big-cont"}>
                <div className="vac-tran-header-cont">
                    <Typography variant="h4" component="h2">
                        Requests for this vacancy
                    </Typography>
                </div>
                <div className="filter-cont">
                    <DropDown inputHandler={this.inputHandler} inputArgument={"filterTerm"}
                              value={this.state.filterTerm} label={"Search By"}
                              items={vacancyStatus} cssName={"vacancy-search"}
                    />
                </div>
                <ManyTransferReq admin={true} transferRequests={filteredRequests}/>
                <EmptyDisplay items={filteredRequests} show={true} variant={"h5"} name={"requests"}/>
            </div>
        );
    }
}

TransferReqByVacancy.propTypes = {
    toggleLoading: PropTypes.func,
    showModal: PropTypes.func,
    id: PropTypes.string,
};

export default connect(null, actions)(TransferReqByVacancy);
