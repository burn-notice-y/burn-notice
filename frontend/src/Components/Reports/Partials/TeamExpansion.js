import React from 'react';

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types';
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Badge from "@material-ui/core/Badge/Badge";

const TeamExpansion = props => (
    <div className="teams-cont" onClick={props.clearNotifications}>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} >
                <Badge badgeContent={props.newMembers} color="secondary">
                    <Typography>{props.teamName} </Typography>
                </Badge>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className="primary-display">
                    {props.teamMembers.map(teamMember => (
                        <div className="team-member-cont" key={teamMember.id}>
                            <Typography component="p" variant="subtitle2" key={teamMember.id}>
                                {teamMember.firstName} {teamMember.lastName}
                            </Typography>
                            <IconButton aria-label="Search" onClick={() => props.removeFiremanFromTeam(teamMember.id)}>
                                <ClearIcon/>
                            </IconButton>
                        </div>
                    ))}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
);

TeamExpansion.propTypes = {
    teamName: PropTypes.string,
    teamMembers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string
    })),
    clearNotifications: PropTypes.func,
    newMembers: PropTypes.number,
    removeFiremanFromTeam: PropTypes.func
};

export default TeamExpansion;