import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";

const FirefighterInd = props => {
    return (
        <div className="firefighter-cont">
            <Typography component={"p"} variant="subtitle2">
            {props.firstName}, {props.lastName}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => props.addFunction("primary", props)}>Add</Button>
        </div>
    );
};

export default FirefighterInd;