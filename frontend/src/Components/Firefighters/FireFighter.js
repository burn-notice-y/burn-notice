// individual firefighter overview

// follow Vacancy for reference

// accepts props as data values

// example: div classname="firefighter-header" --> {this.props.fireman.name}

import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../css/Vacancy.css';

class FireFighter extends Component {

    render() {
        return (
            <Fragment>
                <Typography variant="subheading" component="h6">
                    {this.props.firstName} {this.props.lastName}
                </Typography>
            </Fragment>


        )
    }
}


export default FireFighter;
