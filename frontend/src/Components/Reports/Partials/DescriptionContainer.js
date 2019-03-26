import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField/TextField";

const DescriptionContainer = props => (
    <div className="description-cont">
        <div className="reg-email reg-input">
            <TextField
                label="Team Actions"
                type="text"
                value={props.teamActions}
                onChange={props.inputHandler('teamActions')}
                margin="normal"
                multiline
                variant="outlined"
                required
            />
        </div>
        <div className="reg-last-name reg-input">
            <TextField
                label="General Description"
                type="text"
                multiline
                value={props.description}
                onChange={props.inputHandler('description')}
                margin="normal"
                variant="outlined"
                helperText={"Anything important that wasn't covered by other fields"}
                required
            />
        </div>
    </div>
);

DescriptionContainer.propTypes = {
    teamActions: PropTypes.string,
    description: PropTypes.string,
    inputHandler: PropTypes.func
};

export default DescriptionContainer;
