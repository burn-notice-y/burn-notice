import React from 'react';
import TransferReq from '../TransferReq/TransferReq'
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";

const ManyTransferReq = ({ admin, manyTransferReq, executedSearch }) => {
    let emptyDisplay = null;
    if (manyTransferReq.length === 0 && executedSearch){
        emptyDisplay = (
            <Typography component={"h2"} variant={"h4"}>
                No applications have been made to this station
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