import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography/Typography";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';

const Popup = ({ show, message, close }) => {

    return (
        <div className={`success-message  ${show ? "popup-active" : ""}`}>
            <CheckCircleIcon/>
            <Typography component="p" className={`success-p`}>
                {message}
            </Typography>
            <CloseIcon className={"close-icon"} onClick={close}/>
        </div>
    );
};

Popup.propTypes = {
    show: PropTypes.bool,
    message: PropTypes.string,
    close: PropTypes.func
};

export default Popup;
