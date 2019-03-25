import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ManyTransferReq from "./ManyTransferReq";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import Typography from "@material-ui/core/Typography/Typography";

class UserTransferReqs extends Component {
    state = {
        transferRequests: []
    };

    componentDidMount(){
        this.props.toggleLoading();
        axios.get(`/api/user-transfer-req?id=${this.props.id}`)
            .then(res => {
                this.props.toggleLoading();
                this.setState({transferRequests: res.data})
            })
            .catch(() => this.props.toggleLoading())
    }

    render() {
        return (
            <div className={"user-requests-cont"}>
                <div className="user-req-header-cont">
                    <Typography component={"h2"} variant={"h4"}>
                        Your Applications
                    </Typography>
                </div>
                <ManyTransferReq admin={false} {...this.state}/>
            </div>
        );
    }
}

UserTransferReqs.propTypes = {
    toggleLoading: PropTypes.func,
    id: PropTypes.string,
};


export default connect(null, actions)(UserTransferReqs);
