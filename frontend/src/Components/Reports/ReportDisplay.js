import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import '../../css/Reportdisplay.css';
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {reportCategories, reportDisplay} from '../../data/categories';






class ReportDisplay extends Component {
    state={
        type:""
    }

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };
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
            </div>


        )
    }
}
export default ReportDisplay;