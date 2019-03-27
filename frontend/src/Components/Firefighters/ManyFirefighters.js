import React from 'react';
import Firefighter from "./FireFighter";
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import Typography from '@material-ui/core/Typography';
import "../../css/Firefighter.css"
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpansionPanel = (MuiExpansionPanel);
const ExpansionPanelDetails = (MuiExpansionPanelDetails);
const ExpansionPanelSummary = (props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';


const ManyFirefighters = ({ firemanList, title }) => (
    <ExpansionPanel id="ff_content">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography id="ff_title">{title || "he"}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails id="ff_body">
            {firemanList.map(firefighter=> (
                    <Firefighter key={firefighter.id} {...firefighter}/>
                ))}
        </ExpansionPanelDetails>
    </ExpansionPanel>
);

ManyFirefighters.propTypes = {
    firemanList: PropTypes.array
};

export default ManyFirefighters;