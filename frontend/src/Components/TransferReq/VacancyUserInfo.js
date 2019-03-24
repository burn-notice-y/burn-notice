import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import TransferActions from "./TransferActions";

const VacancyUserInfo = props => {

    return (
        <div className="editable">
            <div className="reg-sap reg-input">
                <TextField
                    label="SAP"
                    value={props.sap}
                    margin="normal"
                    variant="outlined"
                    disabled={true}/>
            </div>
            <div className="reg-email reg-input">
                <TextField
                    label="Email"
                    value={props.email}
                    margin="normal"
                    variant="outlined"
                    disabled={true}/>
            </div>
            <div className="reg-firstname reg-input">
                <TextField
                    label="First Name"
                    value={props.firstName}
                    margin="normal"
                    variant="outlined"
                    disabled={true}/>
            </div>
            <div className="reg-lastname reg-input">
                <TextField
                    label="Last Name"
                    value={props.lastName}
                    margin="normal"
                    variant="outlined"
                    disabled={true}/>
            </div>
            <TransferActions {...props}/>
        </div>
    );
};

VacancyUserInfo.propTypes = {
    sap: PropTypes.string,
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    applyText: PropTypes.string,
    apply: PropTypes.func,
    cannotApply: PropTypes.bool,
    email: PropTypes.string,
    helperText: PropTypes.string,
    chief: PropTypes.bool,
    actionOnRequest: PropTypes.func
};

export default VacancyUserInfo;
