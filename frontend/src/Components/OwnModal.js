import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import '../css/OwnModal.css';


const OwnModal = props => (
    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.shown}
        onClose={props.handleClose}
    >
        <div className={"modal-cont"}>
            <Typography variant="h6" id="modal-title">
                {props.header}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
                {props.body}
            </Typography>
            <Typography variant="subtitle2" className={"modal-directions"}>
                {props.directions}
            </Typography>
        </div>
    </Modal>
);

OwnModal.propTypes = {
    shown: PropTypes.bool,
    handleClose: PropTypes.func,
    header: PropTypes.string,
    body: PropTypes.string,
    directions: PropTypes.string
};

export default OwnModal;
