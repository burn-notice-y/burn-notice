import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class CreateTransferReq extends Component{
    render(){
        return (
            <div className="create-req-cont">
                <div className="create-req-cont">
                    <Typography component="h1" variant="h3">
                        Apply for this vacancy
                    </Typography>
                </div>
                <div className="create-req-content">

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};
export default connect(mapStateToProps, actions)(CreateTransferReq);