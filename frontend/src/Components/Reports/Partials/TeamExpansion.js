import React from 'react';

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types';
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton/IconButton";

const TeamExpansion = props => (
    <div className="teams-cont">
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>{props.teamName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className="primary-display">
                    {props.teamMembers.map(teamMember => (
                        <div className="team-member-cont" key={teamMember.id}>
                            <Typography component="p" variant="subtitle2" key={teamMember.id}>
                                {teamMember.firstName} {teamMember.lastName}
                            </Typography>
                            <IconButton aria-label="Search">
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
    }))
};

export default TeamExpansion;