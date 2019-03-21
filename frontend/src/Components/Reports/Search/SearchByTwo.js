import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import '../../../css/Reportdisplay.css';
import DatePick from "../../DatePickClass";
import ManyReports from "../ManyReports";
import PropTypes from 'prop-types';


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
                <DatePick labelDisplay={"Start Date"} argumentName={"startDate"} value={this.props.startDate} handleChange={this.props.handleChange}/>
                <DatePick labelDisplay={"End Date"} argumentName={"endDate"} value={this.props.endDate} handleChange={this.props.handleChange}/>
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

SearchByTwo.propTypes = {
    handleChange: PropTypes.func,
    searchShow: PropTypes.func,
    startDate: PropTypes.string,
    endDate: PropTypes.string


};

export default SearchByTwo;