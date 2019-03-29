import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

const FireFighter = ({ firstName, lastName }) => (
    <div className={"fireman-block"}>
        <KeyboardArrowRight className={"fireman-arrow"}/>
        <Typography variant="subheading" component="h6" className={"fireman"}>
             {firstName} {lastName}
        </Typography>
    </div>
);

FireFighter.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string
};

export default FireFighter;
