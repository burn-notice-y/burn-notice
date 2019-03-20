import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import '../../../css/Reportdisplay.css';
import DatePick from "../../DatePickClass";
import ManyReports from "../ManyReports";


class SearchByTwo extends Component {

    state={
        search:""
    };

    displayReports = () => {
        this.setState({
            displayReports: !this.state.displayReports
        })
    };

    render() {

        if(this.state.displayReports) {
            return <ManyReports/>;
        }

        return(
        <div>
            <div className="time">
                <DatePick labelDisplay={"Start Date"}/>
                <DatePick labelDisplay={"End Date"}/>
            </div>
            <div className="action-container">
                <Button variant="contained" color="primary" className="date-search" onClick={this.displayReports}>
                    Search
                </Button>
            </div>

        </div>








        )
    }
}
export default SearchByTwo;