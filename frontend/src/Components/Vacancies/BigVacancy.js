import React, { Component } from 'react';
import vacancy from '../../data/bigVacancy';
import Typography from "@material-ui/core/Typography/Typography";


// show all of the properties from the vacancy object

// use material UI and containers with flexbox to put them all pretty like

// give current crew as props to ManyFirefighters,
// which then maps over the array and returns a Firefighter component for each one

class BigVacancy extends Component {
    render(){
        return (
            <Typography component="h2" variant="h1" gutterBottom>
                View your giant vacancy, big boi
            </Typography>

        )
    }
}
export default BigVacancy;