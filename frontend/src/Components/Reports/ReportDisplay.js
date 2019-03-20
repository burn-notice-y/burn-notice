import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import '../../css/Reportdisplay.css';
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {reportCategories, reportDisplay} from '../../data/categories';
import ManyFirefighters from "../Firefighters/ManyFirefighters";
import SearchByOne from "./Search/SearchByOne";
import SearchByTwo from "./Search/SearchByTwo";
import SearchByType from "./Search/SearchByType";
import ManyReports from "./ManyReports";






class ReportDisplay extends Component {
    state = {
        type:""
    };

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    determineSearchType = pageStatus => {
        switch (pageStatus) {
            case "By Date":
                return <SearchByOne type={"By Date"}/>
            case "By Name":
                // pass "By Name" as a prop, so the SearchByOne component knows what to render
                return <SearchByOne type={"By Name"}/>
            case "By Date Range":
            //     // no props needed because they only do one thing
                return <SearchByTwo/>
            case "By Type":
                return <SearchByType/>
            // default incase they all fail
            default: return;
        }
    };
    // call this function inside of the return block, passing in `this.state.type` as the parameter

    render() {
console.log(this.state);

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
                <ManyReports/>

        </div>

        )
    }
}
export default ReportDisplay;