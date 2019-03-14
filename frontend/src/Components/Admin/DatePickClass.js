import { InlineDatePicker } from "material-ui-pickers";
import React, { Component } from "react";

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
                label="Start Date"
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                format={"MM/DD/YYYY"}
            />
        </div>)
    }
}

export default DatePick;