import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import {reportCategories, reportDisplay} from "../../../data/categories";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";


class SearchByType extends Component {

    state={
        type:""
    }

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    render() {

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