import React from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";

const TransferActions = ({ chief, cannotApply, applyText, helperText, actionOnRequest }) => {
    let actions = (
        <div className="user-actions">
            <div>
            <Button variant="contained" color="primary" disabled={cannotApply}>
                <div onClick={actionOnRequest}>
                    {applyText}
                </div>
            </Button>
            </div>
        </div>
    );
    if (chief){
        actions = (
            <div className="chief-actions">
                <div className="deny">
                    <div onClick={() => actionOnRequest("deny")}>
                        <Button variant="contained" color="secondary">
                            Deny
                        </Button>
                    </div>
                </div>
                <div className="approve">
                    <div onClick={() => actionOnRequest("approve")}>
                        <Button variant="contained" className={"approve-button"}>
                            Approve
                        </Button>
                    </div>
                </div>

            </div>
        )
    }
    return (
        <div className={"transfer-actions-container"}>
            {actions}
            <Typography variant="subtitle2" component="p">
                {helperText}
            </Typography>
        </div>
    );
};

TransferActions.propTypes = {
   chief: PropTypes.bool,
   apply: PropTypes.func,
   cannotApply: PropTypes.bool,
   helperText: PropTypes.string
};

export default TransferActions;
