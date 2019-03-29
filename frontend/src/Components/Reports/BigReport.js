import React, {Component, Fragment} from 'react';
import axios from "axios";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Divider from "@material-ui/core/Divider/Divider";
import ManyFirefighters from "../Firefighters/ManyFirefighters";
import Fab from "@material-ui/core/Fab/Fab";
import ArrowBack from '@material-ui/icons/ArrowBack';
import moment from 'moment';
import '../../css/Reportdisplay.css'

class BigReport extends Component {
    state = { report: null };

    componentDidMount() {
        this.props.toggleLoading();
        axios.get(`/api/one-report?id=${this.props.match.params.id}`)
            .then(res => {
                this.props.toggleLoading();
                this.setState({report: res.data})
            })
            .catch(() => {
                this.props.toggleLoading();
                this.props.showModal(["Oops", "Looks like something went wrong", "Try again in a little bit"])
            })
    }

    showStation = () => {
        if (this.state.report !== null) {
            let report = this.state.report;
            let exposedToChemicals = "";
            report.exposedToChemicals ? exposedToChemicals = "Yes" : exposedToChemicals = "No";
            let fireRetardantPresent = "";
            report.fireRetardantPresent ? fireRetardantPresent = "Yes" : fireRetardantPresent = "No";
            return (
                <div className={"big-report"}>
                    <div className="report-header">
                        <Typography component="h3" variant="h2">
                            Report Details
                        </Typography>
                    </div>
                    <Divider className={"big-report-divider"}/>
                    <div>
                        <Typography component="h5" variant="h6">
                            Creator:
                        </Typography>
                        <Typography component={"p"} variant="subtitle1">
                            {`${report.creator.firstName} ${report.creator.lastName}`}
                        </Typography>
                    </div>
                    <div className="report-body">
                        <Typography component="h5" variant="h6">
                            Create Date:
                        </Typography>
                        <Typography component="p" variant="subtitle1">
                            {moment(report.createDate).format("MMMM Do YYYY")}
                        </Typography>
                        <Typography component="h5" variant="h6">
                            Report Type:
                        </Typography>
                        <Typography component={"p"} variant={"subtitle1"}>
                            {report.type.name}
                        </Typography>
                        <Typography component="h5" variant="h6">
                            Exposed to Chemicals:
                        </Typography>
                        <Typography component={"p"} variant={"subtitle1"}>
                            {exposedToChemicals}
                        </Typography>
                        <Typography component="h5" variant="h6">
                            Time Dispatched:
                        </Typography>
                        <Typography component={"p"} variant={"subtitle1"}>
                            {moment(report.timeDispatched).format("LT")}
                        </Typography>
                        <Typography component="h5" variant="h6">
                            Time Arrived:
                        </Typography>
                        <Typography component="p" variant="subtitle1">
                            {moment(report.timeArrived).format("LT")}
                        </Typography>
                        <Typography component="h5" variant="h6">
                            Fire Retardant Present:
                        </Typography>
                        <Typography component="p" variant="subtitle1">
                            {fireRetardantPresent}
                        </Typography>
                        <Typography component="h5" variant="h6">
                            Team Actions:
                        </Typography>
                        <Typography component="p" variant="subtitle1">
                            {report.teamActions}
                        </Typography>
                        <Typography component="h5" variant="h6">
                            Description:
                        </Typography>
                        <Typography component="p" variant="subtitle1">
                            {report.description}
                        </Typography>
                        <div className="team-members-cont">
                            <ManyFirefighters title={"Team Members"} firemanList={report.users}/>
                        </div>
                    </div>
                </div>
            )
        }
    };

    render() {
        return (
            <Fragment>
                {this.showStation()}
                <Fab className={"back-button"} color="primary" onClick={() => this.props.history.goBack()}>
                    <ArrowBack/>
                </Fab>
            </Fragment>

        )
    }

}

BigReport.propTypes = {
    toggleLoading: PropTypes.func,
    showModal: PropTypes.func,
    match: PropTypes.any
};

export default connect(null, actions)(BigReport);