import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import '../../css/Reportdisplay.css';
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { reportDisplay } from '../../data/categories';
import SearchByOne from "./Search/SearchByOne";
import SearchByTwo from "./Search/SearchByTwo";
import SearchByType from "./Search/SearchByType";
import ManyReports from "./ManyReports";
import axios from "axios";
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import moment from 'moment';
import Divider from "@material-ui/core/Divider/Divider";
import EmptyDisplay from "../EmptyDisplay";

class ReportDisplay extends Component {
    state = {
        type: "",
        name: "",
        category: "",
        createDate: moment().format("YYYY-MM-DD"),
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        displayReports: false,
        data: []
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

    showSearchResults = event => {
        event.preventDefault();
        event.stopPropagation();
        this.props.toggleLoading();
        let requestUrl = "";
        let queryString = "";
        switch (this.state.type) {
            case "By Date":
                requestUrl = "/api/date-report";
                queryString = `?createDate=${this.state.createDate}`;
                break;
            case "By Last Name":
                requestUrl = "/api/creator-report";
                queryString = `?creatorName=${this.state.name}`;
                break;
            case "By Date Range":
                requestUrl = "/api/date-range-report";
                queryString = `?startDate=${this.state.startDate}&endDate=${this.state.endDate}`;
                break;
            case "By Type":
                requestUrl = "/api/type-report";
                queryString = `?type=${this.state.category}`;
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
                return <SearchByType {...this.state} searchShow={this.showSearchResults} handleChange={this.inputHandler}/>;
            // default in case they all fail
            default: return;
        }
    };

    render() {
        return (
            <div className="report-d-cont">
                <div className="report-d-header">
                    <Typography component="h3" variant="h2" gutterBottom className={"report-d-header"}>
                        Search Reports
                    </Typography>
                </div>
                <Divider className={"report-search-divider"}/>
                <div className="report-filter">

                <div className="big-search">
                    <div className="search-group">
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
                <div className={"filter-type-cont"}>
                    {this.determineSearchType(this.state.type)}

                </div>
                </div>
                </div>
                <ManyReports data={this.state.data} show={this.state.displayReports}/>
                <EmptyDisplay name={"reports"} variant={"h5"} show={this.state.displayReports} items={this.state.data}/>
            </div>

        )
    }
}

ReportDisplay.propTypes = {
    toggleLoading: PropTypes.func
};

export default connect(null, actions)(ReportDisplay);

