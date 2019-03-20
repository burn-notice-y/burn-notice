import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Divider from "@material-ui/core/Divider/Divider";
import SearchIcon from '@material-ui/icons/Search';
import ManyReports from "../ManyReports";
import * as PropTypes from "prop-types";


class SearchByOne extends Component {

    state={
        search:""
    };


    inputHandler = search => event => {
        this.setState({
            [search]: event.target.value
        })
    };

    displayReports = () => {
        if (this.state.displayReports){
            return <ManyReports/>
        }
        this.setState({
            displayReports: !this.state.displayReports

        })
    };


    render() {
        console.log(this.props);
        return(

            <Paper elevation={1} className={"search-cont"}>
                <input type="text" id={"search"}
                       value={this.state.search}
                       onChange={this.inputHandler('search')}
                       placeholder={this.props.type}
                       autoComplete={"off"}
                />
                <IconButton aria-label="Search" onClick={() => this.props.searchShow()}>
                    <SearchIcon/>
                </IconButton>
                <Divider/>
            </Paper>

        )
    }
}

SearchByOne.propTypes = {
    searchShow: PropTypes.func
};

export default SearchByOne;