import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import {reportCategories } from "../../../data/categories";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from "@material-ui/core/Button/Button";
import * as PropTypes from "prop-types";

const SearchByType = ({ category, handleChange, searchShow }) => (
    <div className="type-info">
        <TextField className={"dropdown-type"}
            id="outlined-select-currency"
            select
            label="Type of Report"
            value={category}
            onChange={handleChange('category')}
            margin="normal"
            variant="outlined">
            {reportCategories.map(option => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
        <Button variant="contained" color="primary" className="type-search" onClick={searchShow}>
            Search
        </Button>
    </div>
);

SearchByType.propTypes = {
    category: PropTypes.string,
    searchShow: PropTypes.func,
    handleChange: PropTypes.func
};

export default SearchByType;