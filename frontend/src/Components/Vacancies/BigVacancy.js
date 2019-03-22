import React, { Component } from 'react';
import vacancy from '../../data/bigVacancy';
import Typography from "@material-ui/core/Typography/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import moment from 'moment';
import ManyFirefighters from '../Firefighters/ManyFirefighters';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import * as actions from '../../store/actions';
import { connect }  from 'react-redux';
import {Link} from "react-router-dom";

class BigVacancy extends Component {
    state = { vacancy: null };

    componentDidMount(){
        this.props.toggleLoading();
        axios.get(`/api/one-vacancy?id=${this.props.match.params.id}`)
            .then(res => {
                this.props.toggleLoading();
                this.setState({vacancy: res.data})
            })
            .catch(error => {
                this.props.toggleLoading();
                console.log(error);
            })
    }

    determineAdmin = () => {
        if (this.props.admin) {
            return (
                <div className="delete-cont">
                    <IconButton aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        }
    };

    apply = () => {
        axios.post("/api/submitApplication", {
            sentDate: moment().format('YYYY Do MM'),
            status: "Pending",
            applicants: this.props.user,
            vacancy: vacancy,
        }).then(result => console.log(result))
    };

    render(){
        if (this.state.vacancy === null){
            return <div/>;
        }
        console.log(this.state);
        let vacancy = this.state.vacancy;
        let vacancyText = moment(vacancy.fillDate).format("MMMM Do YYYY");
        let applyText = "Apply";
        let canApply = true;
        if (vacancy.fillDate !== "9999"){
            applyText = "Closed";
            canApply = false;
            vacancyText = "Closed"
        }
        let postDate = moment(vacancy.postDate).format("MMMM Do YYYY");

        let temporary = "";
        vacancy.temporary ? temporary = "Yes" : temporary = "No";
        let role = "";
        vacancy.engine ? role = "Engine" : role = "Truck";

        return (
            <div className={"big-edit-cont"}>
                <div className="application-header">
                    <div className="top">
                        <Typography component="h3" variant="h4" gutterBottom className={"application-header"}>
                            {this.props.header}
                        </Typography>
                    </div>
                    <div className="input-cont">
                        <div className="apply">
                            <div className="reg-sation reg-input">
                                <TextField
                                    label={"Station"}
                                    value={this.state.vacancy.station.name}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-role reg-input">
                                <TextField
                                    label="Role"
                                    value={role}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-temporary reg-input">
                                <TextField
                                    label="Temporary"
                                    value={temporary}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-post-date reg-input">
                                <TextField
                                    label="Post Date"
                                    value={postDate}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-fill-date reg-input">
                                <TextField
                                    label="Fill Date"
                                    value={vacancyText}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-crew reg-input">
                                <br/>
                                <ManyFirefighters/>
                            </div>
                            <br/>
                        </div>
                        <div className="top">
                            <Typography component="h3" variant="h4" gutterBottom className={"application-header"}>
                                {this.props.applicantHeader}
                            </Typography>
                        </div>
                    </div>
                    <div className="input-cont">
                        <div className="editable">
                            <div className="reg-sap reg-input">
                                <TextField
                                    label="SAP"
                                    value={this.state.sap}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-email reg-input">
                                <TextField
                                    label="Email"
                                    value={this.state.email}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-firstname reg-input">
                                <TextField
                                    label="First Name"
                                    value={this.state.firstName}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-lastname reg-input">
                                <TextField
                                    label="Last Name"
                                    value={this.state.lastName}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>

                            <Button variant="contained" color="primary" disabled={canApply}><div onClick={this.apply}>
                                Submit Application
                            </div></Button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, actions)(BigVacancy);
