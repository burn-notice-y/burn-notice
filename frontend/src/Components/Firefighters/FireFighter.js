import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const FireFighter = ({ firstName, lastName }) => (
    <Typography variant="subheading" component="h6">
        {firstName} {lastName}
    </Typography>
);

FireFighter.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string
};

export default FireFighter;
