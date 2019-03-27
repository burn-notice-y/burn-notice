import React from "react";
import { TimePicker } from "material-ui-pickers";
import PropTypes from 'prop-types';

const TimePick = ({ helperText, label, value, inputHandler }) => (
    <div className="picker">
        <TimePicker
            keyboard
            clearable
            helperText={helperText}
            showTodayButton
            ampm={false}
            label={label}
            value={value}
            onChange={inputHandler}
            required
        />
    </div>
);

TimePick.propTypes = {
    helperText: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    inputHandler: PropTypes.func,
};


export default TimePicker;
