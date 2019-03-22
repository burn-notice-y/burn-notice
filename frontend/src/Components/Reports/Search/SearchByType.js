import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import {reportCategories } from "../../../data/categories";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import ManyReports from "../ManyReports";


class SearchByType extends Component {

    state={
        type:""
    }

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    displayReports = () => {
        this.setState({
            displayReports: !this.state.displayReports

        })
    };

    render() {

        if(this.state.displayReports) {
            return <ManyReports/>;
        }


        return(

            <div className="report-info">
                <Typography component="h2" variant="h5" className={"report-d-header"}>
                    Search By:
                </Typography>
                <TextField className={"dropdown"}
                    id="outlined-select-currency"
                    select
                    label="Type of Report"
                    value={this.state.type}
                    onChange={this.inputHandler('type')}
                    margin="normal"
                    variant="outlined">
                    {reportCategories.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </div>


        )
    }
}

export default SearchByType;