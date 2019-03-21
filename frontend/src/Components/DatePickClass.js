import { InlineDatePicker } from "material-ui-pickers";
import React from "react";
import PropTypes from 'prop-types';

const DatePick = ({ labelDisplay, startDate, handleChange, argumentName}) => (
<div className="picker">
            <InlineDatePicker
                clearable
                variant="outlined"
                label={labelDisplay}
                value={startDate}
                onChange={handleChange(argumentName)}
                format={"MM/DD/YYYY"}
            />
        </div>
    );


DatePick.propTypes = {
    labelDisplay: PropTypes.string,
    startDate: PropTypes.any,
    handleChange: PropTypes.func,
    argumentName: PropTypes.string
};

export default DatePick;