import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import TimePick from "../TimePicker";
import '../../css/Reportdisplay.css';


class SearchByTwo extends Component {

    render() {

        return(
        <div>
            <div className="time">
                <div className="time1-cont">
                    <Typography component="h2" variant="h5" className={"report-d-header"}>
                        Start Date:
                    </Typography>
                    <TextField
                        id="outlined-bare"
                        className={""}
                        defaultValue=""
                        margin="normal"
                        variant="outlined"/>
                </div>
                <div className="time2-cont">
                    <Typography component="h2" variant="h5" className={"report-d-header"}>
                        End Date:
                    </Typography>
                    <TextField className="end-date"
                               id="outlined-bare"
                               className={""}
                               defaultValue=""
                               margin="normal"
                               variant="outlined"/>
                    <Button variant="contained" color="primary" className="date-search">
                        Search
                    </Button>
                </div>
            </div>
        </div>








        )
    }
}
export default SearchByTwo;