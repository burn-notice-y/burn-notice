import { InlineDatePicker } from "material-ui-pickers";
import React, { Component } from "react";
import PropTypes from 'prop-types';

class DatePick extends Component {
    state = {
        selectedDate: new Date()
    };

    handleDateChange = event => {
        // console.log(event)
        this.setState({selectedDate: event})
    };

    render() {
        return (<div className="picker">
            <InlineDatePicker
                clearable
                variant="outlined"
                label={this.props.labelDisplay}
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                format={"MM/DD/YYYY"}
            />
        </div>)
    }
}


DatePick.propTypes = {
    labelDisplay: PropTypes.string
};

export default DatePick;