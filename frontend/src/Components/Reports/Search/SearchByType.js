import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import {reportCategories } from "../../../data/categories";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import ManyReports from "../ManyReports";
import Button from "@material-ui/core/Button/Button";


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

            <div className="type-info">
                <TextField className={"dropdown-type"}
                    id="outlined-select-currency"
                    select
                    label="Type of Report"
                    value={this.props.category}
                    onChange={this.props.handleChange('category')}
                    margin="normal"
                    variant="outlined">
                    {reportCategories.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" color="primary" className="type-search" onClick={this.props.searchShow}>
                    Search
                </Button>
            </div>


        )
    }
}

export default SearchByType;