import React, {Component, Fragment} from 'react';
import axios from "axios";
import Typography from "@material-ui/core/Typography/Typography";
import ManyFirefighters from "../Firefighters/ManyFirefighters";
import PropTypes from "prop-types";
import props from "../../data/exampleReports";
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import report from "../../data/bigReport";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";


class BigReport extends Component {

    state = {
        report: null

    };

    componentDidMount() {
        this.props.toggleLoading();
        axios.get(`/api/one-report?id=${this.props.match.params.id}`)
            .then(res => {
                this.props.toggleLoading();
                this.setState({report: res.data})
            })
            .catch(error => {
                console.log(error);
                this.props.toggleLoading()
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
                <Fragment>
                    <div className="report-header">
                        <Typography component="h3" variant="h2">
                            Report Details
                        </Typography>
                    </div>
                    <Card>
                    <CardContent>
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
                            {report.createDate}
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
                            {report.timeDispatched}
                        </Typography>
                        <Typography component="h5" variant="h6">
                            Time Arrived:
                        </Typography>
                        <Typography component="p" variant="subtitle1">
                            {report.timeArrived}
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
                            {/*{report.teamActions}*/}
                        </Typography>
                        <Typography component="h5" variant="h6">
                            Description:
                        </Typography>
                        <Typography component="p" variant="subtitle1">
                            {report.description}
                        </Typography>
                    </div>
                    </CardContent>
                    </Card>
                </Fragment>
            )
        }
    };


    render() {

    console.log(this.state);
    console.log(report.description);

        return (
            <Fragment>
                <div>
                {this.showStation()}
                </div>
            </Fragment>

        )
    }

}

BigReport.propTypes = {
    toggleLoading: PropTypes.func,
    match: PropTypes.any
};

const mapStateToProps = store => {
    return {
        unicorn: store.user
    }
};

export default connect(mapStateToProps, actions)(BigReport);