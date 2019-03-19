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
                        id={`outlined-start-date`}
                        label="Start Date:"
                        value={""}
                        onChange={""}
                        margin="normal"
                        variant="outlined"/>
                </div>
                <div className="time2-cont">
                    <TextField
                        id={`outlined-end-date`}
                        label="End Date:"
                        value={""}
                        onChange={""}
                        margin="normal"
                        variant="outlined"/>
                </div>
                <Button variant="contained" color="primary" className="date-search">
                    Search
                </Button>
            </div>
        </div>








        )
    }
}
export default SearchByTwo;