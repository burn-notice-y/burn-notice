import React  from 'react';
import PropTypes from 'prop-types';
import TwoOptionSelect from "../../TwoOptionSelect";
import TeamExpansion from "./TeamExpansion";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FirefighterSearchCont from "./FirefighterSearchCont";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import Divider from "@material-ui/core/Divider/Divider";

const TeamSelect = props => (
    <div className="search-cont">
        <div className="team-header">
            <Typography component="h3" variant="h5" gutterBottom className={"registration-header"}>
                Define the Teams
            </Typography>
        </div>
        <div className={"search-cont"}>
            <TwoOptionSelect inputHandler={props.inputHandler('team')}
                             oneName={"Primary Team"} oneVal={"primaryTeam"}
                             twoName={"Secondary Team"} twoVal={"secondaryTeam"}
                             value={props.team} title={"Which team are you adding to?"}
            />
            <TeamExpansion teamName={"Primary Team"} teamMembers={props.primaryTeam}/>
            <TeamExpansion teamName={"Secondary Team"} teamMembers={props.secondaryTeam}/>



            <Paper elevation={1} className={"search-cont"}>
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
            <FirefighterSearchCont clearSearch={props.clearSearch} addFunction={props.addFiremanToTeam} team={props.team} searchResult={props.searchResult}/>
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
    team: PropTypes.string
};
export default TeamSelect;