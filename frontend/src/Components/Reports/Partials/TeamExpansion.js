import React from 'react';

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types';

const TeamExpansion = props => (
    <div className="teams-cont">
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>{props.teamName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className="primary-display">
                    {props.teamMembers.map(teaMember => (
                        <Typography component="p" variant="subtitle2" key={teaMember.id}>
                            {teaMember.firstName} {teaMember.lastName}
                        </Typography>
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