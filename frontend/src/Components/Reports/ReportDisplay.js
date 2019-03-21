import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import '../../css/Reportdisplay.css';
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {reportCategories, reportDisplay} from '../../data/categories';
import SearchByOne from "./Search/SearchByOne";
import SearchByTwo from "./Search/SearchByTwo";
import SearchByType from "./Search/SearchByType";
import ManyReports from "./ManyReports";
import axios from "axios";
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import moment from 'moment';







class ReportDisplay extends Component {
    state = {
        type:"",
        name: "",
        oneDate: moment().format("YYYY-MM-DD"),
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        displayReports: false,
    };

    inputHandler = type => event => {
        if (type === "oneDate" || type === "startDate" || type === "endDate"){
            this.setState({[type]: event})
        } else {

            this.setState({
                [type]: event.target.value
            })
        }
    };

    showSearchResults = () => {
        // toggle loading spinner
        // ask db for specified reports - axios.get().then(result =>
        // . then ( once they come back ) result => this.setState({data: result.data, displayReports: true})
        this.props.toggleLoading();

        let requestUrl = "";
        let queryString = "";
        switch (this.state.type) {
            case "By Date":
                requestUrl = "/api/date-report";
                queryString = `?createDate=${this.state.oneDate}`;
                break;
            case "By Last Name":
                requestUrl = "/api/creator-report";
                queryString = `?creatorName=${this.state.name}`;
                break;
            case "By Date Range":
                requestUrl = "/api/date-range-report";
                queryString = `?startDate=${this.state.startDate}endDate=${this.state.endDate}`;
                break;
            case "By Type":
                requestUrl = "/api/type-report";
                queryString = `?type=${this.state.type}`;
                break;
            default:
                return;
        }
        console.log(requestUrl + queryString);
        axios.get(requestUrl + queryString).then(result => {
            this.props.toggleLoading();
            this.setState({data: result.data, displayReports: true})
        }).catch(error => {
            console.log(error);
            this.props.toggleLoading();
        });
    };

        determineSearchType = pageStatus => {
        switch (pageStatus) {
            case "By Date":
                return <SearchByOne {...this.state} handleChange={this.inputHandler} searchShow={this.showSearchResults}/>;
            case "By Last Name":
                // pass "By Name" as a prop, so the SearchByOne component knows what to render
                return <SearchByOne {...this.state} handleChange={this.inputHandler} searchShow={this.showSearchResults}/>;
            case "By Date Range":
            //     // no props needed because they only do one thing
                return <SearchByTwo {...this.state} searchShow={this.showSearchResults} handleChange={this.inputHandler}/>;
            case "By Type":
                return <SearchByType searchShow={this.showSearchResults}/>;
            // default in case they all fail
            default: return;
        }
    };
    // call this function inside of the return block, passing in `this.state.type` as the parameter

    render() {


        return (


            <div className="report-d-cont">
                <div className="report-d-header">
                    <Typography component="h3" variant="h2" gutterBottom className={"report-d-header"}>
                        Reports
                    </Typography>
                </div>
                <div className="report-info">
                    <Typography component="h3" variant="h4" gutterBottom className={"report-d-header"}>
                        What type of Report?
                    </Typography>
                </div>
                <div className="report-info">
                    <Typography component="h2" variant="h5" className={"report-d-header"}>
                        Search By:
                    </Typography>
                </div>
                <div className="">
                    <TextField className={"dropdown"}
                               id="outlined-select-currency"
                               select
                               label="Type"
                               value={this.state.type}
                               onChange={this.inputHandler('type')}
                               margin="normal"
                               variant="outlined">
                        {reportDisplay.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div>
                    {this.determineSearchType(this.state.type)}

                </div>
                <ManyReports data={this.state.data} show={this.state.displayReports}/>

            </div>

        )
    }
}

ReportDisplay.propTypes = {
    toggleLoading: PropTypes.func
};

export default connect(null, actions)(ReportDisplay);

