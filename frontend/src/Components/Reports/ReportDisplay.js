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

class ReportDisplay extends Component {
    state = {
        type:"",
        displayReports: false,
    };

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    showSearchResults = () => {
        // toggle loading spinner
        // ask db for specified reports - axios.get().then(result =>
        // . then ( once they come back ) result => this.setState({data: result.data, displayReports: true})
        this.props.toggleLoading();

        let requestUrl = "";
        switch (this.state.type) {
            case "By Date":
                requestUrl = "/api/date-report";
                break;
            case "By Name":
                requestUrl = "/api/creator-report";
                break;
            case "By Date Range":
                requestUrl = "/api/date-range-report";
                break;
            case "By Type":
                requestUrl = "/api/type-report";
                break;
            default:
                return;
        }
        axios.get(requestUrl).then(result => {
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
                return <SearchByOne type={"By Date"} searchShow={this.showSearchResults}/>;
            case "By Name":
                // pass "By Name" as a prop, so the SearchByOne component knows what to render
                return <SearchByOne type={"By Last Name"} searchShow={this.showSearchResults}/>;
            case "By Date Range":
            //     // no props needed because they only do one thing
                return <SearchByTwo searchShow={this.showSearchResults}/>;
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

