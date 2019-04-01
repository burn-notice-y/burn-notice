import React from 'react';
import TransferReq from '../TransferReq/TransferReq'
import PropTypes from 'prop-types';
import EmptyDisplay from "../EmptyDisplay";

const ManyTransferReq = ({ admin, transferRequests, executedSearch }) => {
    return (
        <div className="many-transferReq-cont">
            <div className="transferReq-body" style={{width: "60%"}}>
                {transferRequests.map(transferReq => <TransferReq admin={admin} key={transferReq.id} {...transferReq} />)}
                <EmptyDisplay variant={"h5"} items={transferRequests} name={"requests"} show={executedSearch}/>
            </div>
        </div>
    );
};

ManyTransferReq.propTypes = {
    admin: PropTypes.bool,
    transferRequests: PropTypes.array
};

export default ManyTransferReq;