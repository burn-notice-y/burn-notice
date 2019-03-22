import React from 'react';
import TransferReq from '../TransferReq/TransferReq'
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core";


const ManyTransferReq = ({ admin, manyTransferReq }) => {
    let emptyDisplay = null;
    if (manyTransferReq.length === 0){
        emptyDisplay = (
            <Typography component={"h2"} variant={"h3"}>
                No Transfer Requests have been made to this station
            </Typography>
        )
    }
    return (
        <div className="many-transferReq-cont">
            <div className="transferReq-body">
                {manyTransferReq.map(transferReq => <TransferReq admin={admin} key={transferReq.id} {...transferReq} />)}
                {emptyDisplay}
            </div>
        </div>
    );
};

ManyTransferReq.propTypes = {
    admin: PropTypes.bool,
    allTransferReq: PropTypes.array
};

export default ManyTransferReq;