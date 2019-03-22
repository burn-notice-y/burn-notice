import React, {Component, Fragment} from 'react';
import axios from "axios";
import Typography from "@material-ui/core/Typography/Typography";
import ManyFirefighters from "../Firefighters/ManyFirefighters";
import PropTypes from "prop-types";
import props from "../../data/exampleReports";
import * as actions from '../../store/actions';
import { connect } from 'react-redux';


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
            return (
                <Fragment>
                    <div className="station-header">
                        <Typography component="h3" variant="h2">
                            Creator: {`${report.creator.firstName} ${report.creator.lastName}`}
                        </Typography>
                    </div>
                    <div className="station-body">
                        <Typography component="h4" variant="h5">
                            Create Date: {report.createDate}
                        </Typography>
                        <Typography component="h4" variant="h5">
                            Report Type: {report.type.name}
                        </Typography>
                        <Typography component="h4" variant="h5">
                            Exposed to Chemicals: {report.exposedToChemicals}
                        </Typography>
                        <Typography>
                            Time Dispatched: {report.timeDispatched}
                        </Typography>
                        <Typography>
                            Time Arrived: {report.timeArrived}
                        </Typography>
                        <Typography>
                            Fire Retardant Present: {report.fireRetardantPresent}
                        </Typography>
                    </div>
                </Fragment>
            )
        }
    };


    render() {
    console.log(this.props);
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