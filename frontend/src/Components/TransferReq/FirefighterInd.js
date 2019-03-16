import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import PropTypes from 'prop-types';


const FirefighterInd = ({id, firstName, lastName, addFunction}) => (
        <div className="firefighter-cont">
            <Typography component={"p"} variant="subtitle2">
            {firstName} {lastName}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => addFunction("primaryTeam", { firstName, id, lastName })}>Add</Button>
        </div>
    );

FirefighterInd.propTypes = {
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    addFunction: PropTypes.func
};

export default FirefighterInd;