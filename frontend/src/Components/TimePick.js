import React from "react";
import { TimePicker } from "material-ui-pickers";
import PropTypes from 'prop-types';

const TimePick = ({ helperText, label, value, changeHandler, argument }) => (
    <div className="picker">
        <TimePicker
            keyboard
            clearable
            helperText={helperText}
            showTodayButton
            ampm={false}
            label={label}
            value={value}
            onChange={changeHandler(argument)}
            required
            format={"LT"}
        />
    </div>
);

TimePick.propTypes = {
    helperText: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.object,
    changeHandler: PropTypes.func,
    argument: PropTypes.string,
};

export default TimePick;
