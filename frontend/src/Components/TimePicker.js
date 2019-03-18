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
                    clearable
                    showTodayButton
                    ampm={false}
                    label={this.props.label}
                    value={this.state.selectedTime}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default TimePick;
