import React, { Component } from 'react';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import '../../css/Register.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DropDown from "../DropDown";
import {fireStations} from '../../data/categories';
import Divider from "@material-ui/core/Divider/Divider";
import * as PropTypes from "prop-types";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';



class Register extends Component{
    state = {
        sap: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        redirect: false,
        error: false,
        disabled: false,
        station: "40"
    };

    register = event => {
        event.preventDefault();
        event.stopPropagation();
        this.props.toggleLoading();
        axios.post("/api/register", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            sap: this.state.sap,
            password: this.state.password,
            email: this.state.email,
        }).then(() => {
            axios.post("/api/add-station", `stationName=${this.state.station}`)
                .then(result => {
                    console.log(result);
                    this.props.toggleLoading();
                    this.setState({redirect: true})
                }).catch(() => {
                    this.props.toggleLoading();
                    this.setState({error: true})
            })
            }).catch(() => {
                this.props.toggleLoading();
                this.setState({error: true})
            })
    };

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    render(){
        if (this.state.redirect){
            this.props.fetchUser();
            return <Redirect to={"/user/profile"}/>
        }
        return (
            <div className={"big-register-cont"}>
                <div className="register-header">
                    <Typography component="h3" variant="h4" gutterBottom className={"registration-header"}>
                        Create your Account
                    </Typography>
                    <Divider/>
                </div>
                <ValidatorForm ref="form" onSubmit={this.register} onError={error => console.log(error)}>
                <div className="input-cont">
                    <div className="reg-group reg-input">
                        <TextValidator
                            error={this.state.error}
                            id={`register-sap`}
                            label="SAP"
                            value={this.state.sap}
                            onChange={this.inputHandler('sap')}
                            margin="normal"
                            variant="outlined"
                            required
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is not valid']}
                        />
                        <TextField
                            error={this.state.error}
                            id={`register-password`}
                            label="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.inputHandler('password')}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                    </div>
                    <div className="reg-group reg-input">

                        <TextField
                            error={this.state.error}
                            id={`register-first-name`}
                            label="First Name"
                            type="text"
                            value={this.state.firstName}
                            onChange={this.inputHandler('firstName')}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <TextField
                            error={this.state.error}
                            label="Last Name"
                            id={`register-last-name`}
                            type="text"
                            value={this.state.lastName}
                            onChange={this.inputHandler('lastName')}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                    </div>

                    <div className="reg-group reg-input">
                        <TextField
                            error={this.state.error}
                            label="Email"
                            type="email"
                            id={`register-email`}
                            value={this.state.email}
                            onChange={this.inputHandler('email')}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <DropDown items={fireStations}
                                  value={this.state.station}
                                  label={"Your Station"}
                                  inputHandler={this.inputHandler}
                                  inputArgument={"station"}/>
                    </div>
                </div>

                <div className="register-actions-cont">
                    <div className="login-instead-cont">
                        <Link to={"/visitor/login"}><Button color="primary">Sign in instead</Button></Link>
                    </div>
                    <div className="submit-reg-cont">
                        <Button variant="contained" color="primary" type={"submit"} onClick={this.register}>Continue</Button>
                    </div>
                </div>
                </ValidatorForm>

            </div>
        )
    }
}
Register.propTypes = {
    fetchUser: PropTypes.func,
    toggleLoading: PropTypes.func,


};
export default withRouter(connect(null, actions)(Register));