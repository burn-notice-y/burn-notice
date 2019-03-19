import { InlineDatePicker } from "material-ui-pickers";
import React, { Component } from "react";
import PropTypes from 'prop-types';

const DatePick = ({ labelDisplay, createDate, onChange}) => (
<div className="picker">
            <InlineDatePicker
                clearable
                variant="outlined"
                label={labelDisplay}
                value={createDate}
                onChange={onChange('createDate')}
                format={"MM/DD/YYYY"}
            />
        </div>
    )


DatePick.propTypes = {
    labelDisplay: PropTypes.string,
    createDate: PropTypes.any,
    onChange: PropTypes.func
};

export default DatePick;