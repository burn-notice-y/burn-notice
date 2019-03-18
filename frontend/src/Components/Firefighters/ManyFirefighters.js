// component to show the list of firefighter components

// follow many vacancies for reference

// Can be put in multiple places

import React, { Component } from 'react';
import allFireFighters from '../../data/firefighters';
import Firefighter from "./FireFighter";
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from "@matergitial-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import Typography from '@material-ui/core/Typography';
import "../../css/Firefighter.css"


const ExpansionPanel = (MuiExpansionPanel);
const ExpansionPanelDetails = (MuiExpansionPanelDetails);
const ExpansionPanelSummary = (props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';


class ManyFirefighters extends Component {
    render(){
        return (

            <ExpansionPanel id="ff_content">
                <ExpansionPanelSummary>
                    <Typography id="ff_title">Current Crew v</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails id="ff_body">
                    {allFireFighters.map(firefighter => <Firefighter key={firefighter.id} {...firefighter} />)}
                </ExpansionPanelDetails>
            </ExpansionPanel>

        )
    }
}


export default ManyFirefighters;