import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import Typography from "@material-ui/core/Typography/Typography";

const Snackbar = props => {
    // check props render accordingly
    return (
        <div className={`success-message ${successActive}`}>
            <CheckCircleIcon/>
            <Typography component="p" className={'success-p'}>
                Success!
            </Typography>
            <CloseIcon className={"close-icon"} onClick={this.hideSuccess}/>
        </div>
    );
}

const mapStateToProps = state => {
    return {

    }
};
export default connect(mapStateToProps, actions)(Snackbar);