import React from 'react';
import PropTypes from 'prop-types';
import TeamExpansion from "./TeamExpansion";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FirefighterSearchCont from "./FirefighterSearchCont";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import Divider from "@material-ui/core/Divider/Divider";

const TeamSelect = props => (
    <div className="search-container">
        <div className="team-header">
            <Typography component="h3" variant="h5" gutterBottom className={"registration-header"}>
                Who Responded to this Call?
            </Typography>
        </div>
        <div className={"search-cont"}>
            <TeamExpansion teamName={"Responders"} teamMembers={props.teamMembers} removeFiremanFromTeam={props.removeFiremanFromTeam}
                           clearNotifications={props.clearNotifications} newMembers={props.newMembers}/>
            <div className={"search-input-cont"}>
                <Paper elevation={1} className={"search-input"}>
                    <input type="text" id={"search"}
                           value={props.search}
                           onChange={props.inputHandler('search')}
                           placeholder={"Search"}
                           autoComplete={"off"}
                    />
                    <IconButton aria-label="Search" onClick={props.searchFirefighters}>
                        <SearchIcon/>
                    </IconButton>
                    <Divider/>
                </Paper>
            </div>

            <FirefighterSearchCont clearSearch={props.clearSearch} addFunction={props.addFiremanToTeam}
                                   searchResult={props.searchResult}/>
        </div>
    </div>
);

TeamSelect.propTypes = {
    inputHandler: PropTypes.func,
    searchResult: PropTypes.array,
    search: PropTypes.string,
    searchFirefighters: PropTypes.func,
    addFiremanToTeam: PropTypes.func,
    primaryTeam: PropTypes.array,
    secondaryTeam: PropTypes.array,
    team: PropTypes.string,
    newMembers: PropTypes.number,
    clearNotifications: PropTypes.func,
    clearSearch: PropTypes.func,
    removeFiremanFromTeam: PropTypes.func
};

export default TeamSelect;