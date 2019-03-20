import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import TimePick from "../../TimePicker";
import '../../../css/Reportdisplay.css';


class SearchByTwo extends Component {

    render() {

        return(
        <div>
            <div className="time">
                <div className="time1-cont">
                    <TextField
                        className={"time-input"}
                        label="Start Date:"
                        value={""}
                        onChange={""}
                        margin="normal"
                        variant="outlined"/>
                </div>
                <div className="time2-cont">
                    <TextField
                        className={"time-input"}
                        label="End Date:"
                        value={""}
                        onChange={""}
                        margin="normal"
                        variant="outlined"/>
                </div>
            </div>
            <div className="action-container">
                <Button variant="contained" size="large" color="primary" className="date-search">
                    Search
                </Button>
            </div>

        </div>








        )
    }
}
export default SearchByTwo;