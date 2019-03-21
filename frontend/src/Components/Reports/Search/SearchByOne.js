import React, {Component, Fragment} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Divider from "@material-ui/core/Divider/Divider";
import SearchIcon from '@material-ui/icons/Search';
import ManyReports from "../ManyReports";
import * as PropTypes from "prop-types";
import DatePick from "../../DatePickClass";
import Button from "@material-ui/core/Button/Button";


class SearchByOne extends Component {

    state={
        search:""
    };



    displayReports = () => {
        if (this.state.displayReports){
            return <ManyReports/>
        }
        this.setState({
            displayReports: !this.state.displayReports

        })
    };

    determineSearchType = () => {
        switch (this.props.type){
            case "By Date":
                return <div className={"date"}>
                <DatePick value={this.props.value} argumentName={"oneDate"} handleChange={this.props.handleChange} labelDisplay={"Reports on this Date"}/>
                    <br/>
                    <Button variant="contained" color="primary" className="date-search" onClick={this.displayReports}>
                       Search
                    </Button>

                </div>

            case "By Last Name":
                return <Paper elevation={1} className={"search-cont"}>
                    <input type="text" id={"search"}
                           value={this.state.search}
                           onChange={this.props.handleChange}
                           placeholder={this.props.type}
                           autoComplete={"off"}
                    />
                    <IconButton aria-label="Search" onClick={() => this.props.searchShow()}>
                        <SearchIcon/>
                    </IconButton>
                    <Divider/>
                </Paper>
        }

    }


    render() {
        return(

            <Fragment>
                {this.determineSearchType()}
            </Fragment>

        )
    }
}

SearchByOne.propTypes = {
    searchShow: PropTypes.func,
    handleChange: PropTypes.func
};

export default SearchByOne;