import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField/TextField";

const DescriptionContainer = props => (
    <div className="description-cont">
        <div className="reg-email reg-input">
            <TextField
                label="Primary Team Actions"
                type="text"
                value={props.primaryTeamActions}
                onChange={props.inputHandler('primaryTeamActions')}
                margin="normal"
                variant="outlined"
            />
        </div>
        <div className="reg-email reg-input">
            <TextField
                label="Secondary Team Actions"
                type="text"
                value={props.secondaryTeamActions}
                onChange={props.inputHandler('secondaryTeamActions')}
                margin="normal"
                variant="outlined"
            />
        </div>
        <div className="reg-last-name reg-input">
            <TextField
                label="General Description"
                type="text"
                value={props.description}
                onChange={props.inputHandler('description')}
                margin="normal"
                variant="outlined"
                helperText={"Anything important that wasn't covered by other fields"}
            />
        </div>
    </div>
);

DescriptionContainer.propTypes = {
    primaryTeamActions: PropTypes.string,
    secondaryTeamActions: PropTypes.string,
    description: PropTypes.string,
    inputHandler: PropTypes.func
};

export default DescriptionContainer;
