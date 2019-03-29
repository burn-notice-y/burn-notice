import React, {Component} from 'react';
import axios from "axios";
import Typography from "@material-ui/core/Typography/Typography";
import ManyReports from "./ManyReports";
import * as PropTypes from "prop-types";
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import EmptyDisplay from "../EmptyDisplay";

class UserReportDisplay extends Component {

    state = {
        reports: []
    };

    componentDidMount(){
        this.props.toggleLoading();
        axios.get(`/api/reports?id=${this.props.id}`)
            .then(res => {
                this.props.toggleLoading();
                this.setState({
                    reports: res.data
                })
            })
            .catch(error => {
                this.props.toggleLoading();
                console.log(error)
            })
    }

    render() {

        return(
            <div className="all-stations-cont">
                <div className="station-header">
                    <Typography component="h3" variant="h4" gutterBottom className={"registration-header"}>
                        Your Reports
                    </Typography>
                </div>
                <ManyReports data={this.state.reports} show={true}/>
                <EmptyDisplay items={this.state.reports} show={true} variant={"h5"} name={"reports"}/>
            </div>

        )
    }
}

UserReportDisplay.propTypes = {
    toggleLoading: PropTypes.func,
    id: PropTypes.string,
};



export default connect(null, actions)(UserReportDisplay);
