import { InlineDatePicker } from "material-ui-pickers";
import React from "react";
import PropTypes from 'prop-types';

const DatePick = ({ labelDisplay, value, handleChange, argumentName}) => (
<div className="picker">
            <InlineDatePicker
                clearable
                variant="outlined"
                label={labelDisplay}
                value={value}
                onChange={handleChange(argumentName)}
                format={"YYYY-MM-DD"}
            />
        </div>
    );

DatePick.propTypes = {
    labelDisplay: PropTypes.string,
    value: PropTypes.any,
    handleChange: PropTypes.func,
    argumentName: PropTypes.string
};

export default DatePick;