import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Divider from "@material-ui/core/Divider/Divider";
import SearchIcon from '@material-ui/icons/Search';


class SearchByOne extends Component {

    state={
        search:""
    }

    inputHandler = search => event => {
        this.setState({
            [search]: event.target.value
        })
    };
    render() {
        return(

            <Paper elevation={1} className={"search-cont"}>
                <input type="text" id={"search"}
                       value={this.state.search}
                       onChange={this.inputHandler('search')}
                       placeholder={this.props.type}
                       autoComplete={"off"}
                />
                <IconButton aria-label="Search" onClick={""}>
                    <SearchIcon/>
                </IconButton>
                <Divider/>
            </Paper>

        )
    }
}
export default SearchByOne;