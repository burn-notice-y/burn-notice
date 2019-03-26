import React, { Component } from "react";
import { TimePicker } from "material-ui-pickers";

class TimePick extends Component{
    state = {
        selectedTime: null
    };

    handleChange = event => {
        this.setState({selectedTime: event})
    };

    render(){
        return (
            <div className="picker">
                <TimePicker
                    keyboard
                    clearable
                    helperText={this.props.helper}
                    showTodayButton
                    ampm={false}
                    label={this.props.label}
                    value={this.state.selectedTime}
                    onChange={this.handleChange}
                    required
                />
            </div>
        )
    }
}

export default TimePick;
