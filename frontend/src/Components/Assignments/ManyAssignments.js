import React, { Component } from 'react';
import Assignment from './Assignment';
import Typography from "@material-ui/core/Typography/Typography";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import '../../css/Assignments.css';
import * as PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider/Divider";


class ManyAssignments extends Component {
    state = {
        assignments: [],
        id: ""
    };

    componentDidMount(){
        this.fetch(this.props.id)
    }

    fetch = id => {
        this.props.toggleLoading();
        axios.get(`/api/assignments?id=${id}`)
            .then(res => {
                this.props.toggleLoading();
                this.setState({assignments: res.data})
            }).catch(() => {
            this.props.toggleLoading();
        })
    };
    render() {


        return (
            <div className="assignments-cont">
                <div className="assignment-header">
                    <Typography component="h3" variant="h4" gutterBottom>
                        View your Assignments
                    </Typography>
                </div>
                <Divider className={"assignment-divider"}/>
                <div className="assignments-content">
                    {this.state.assignments.map(assignment => <Assignment key={assignment.id} {...assignment}/>)}
                </div>
            </div>
        );
    }
}

ManyAssignments.propTypes = {
    toggleLoading: PropTypes.func,
};

const mapStateToProps = state => {
    return { user: state.user }
};

export default connect(mapStateToProps, actions)(ManyAssignments);