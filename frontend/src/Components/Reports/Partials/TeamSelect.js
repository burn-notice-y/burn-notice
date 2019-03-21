import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import TwoOptionSelect from "../../TwoOptionSelect";
import TeamExpansion from "./TeamExpansion";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FirefighterSearchCont from "./FirefighterSearchCont";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import Divider from "@material-ui/core/Divider/Divider";

class TeamSelect extends Component {
    state = {
        newItems: 0,
    };

    additionHandler = type => {
        if (type === "clear"){
            console.log("clear")
        } else {
            console.log("else")
        }
    };

    render() {
        return (<div className="search-container">
            <div className="team-header">
                <Typography component="h3" variant="h5" gutterBottom className={"registration-header"}>
                    Who Responded to this Call?
                </Typography>
            </div>
            <div className={"search-cont"}>
                <TeamExpansion teamName={"Responders"} teamMembers={this.props.primaryTeam} clearInput={this.additionHandler} newItems={this.state.newItems}/>
                <div className={"search-input-cont"}>
                    <Paper elevation={1} className={"search-input"}>
                        <input type="text" id={"search"}
                               value={this.props.search}
                               onChange={this.props.inputHandler('search')}
                               placeholder={"Search"}
                               autoComplete={"off"}
                        />
                        <IconButton aria-label="Search" onClick={this.props.searchFirefighters}>
                            <SearchIcon/>
                        </IconButton>
                        <Divider/>
                    </Paper>
                </div>

                <FirefighterSearchCont clearSearch={this.props.clearSearch} addFunction={this.props.addFiremanToTeam} team={this.props.team} searchResult={this.props.searchResult}/>
            </div>
        </div>)
    }
}

TeamSelect.propTypes = {
    inputHandler: PropTypes.func,
    searchResult: PropTypes.array,
    search: PropTypes.string,
    searchFirefighters: PropTypes.func,
    addFiremanToTeam: PropTypes.func,
    primaryTeam: PropTypes.array,
    secondaryTeam: PropTypes.array,
    team: PropTypes.string,
    newItems: PropTypes.number
};
export default TeamSelect;