import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";

const DropDown = ({label, value, inputHandler, items, cssName, inputArgument}) => (
    <div className={cssName}>
        <TextField
            select
            label={label}
            value={value}
            onChange={inputHandler(inputArgument)}
            margin="normal"
            variant="outlined"
        >
            {items.map(option => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    </div>
);

DropDown.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    inputHandler: PropTypes.func,
    items: PropTypes.array,
    inputArgument: PropTypes.string,
    cssName: PropTypes.string,
};

export default DropDown;
