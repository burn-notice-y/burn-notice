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



class Register extends Component{
    state = {
        sap: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        redirect: false,
        error: false,
        disabled: false

    };

    register = () => {
        this.props.toggleLoading();
        axios.post("/api/register", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            sap: this.state.sap,
            password: this.state.password,
            email: this.state.email,
        }).then(() => {
            this.props.toggleLoading();
            this.setState({redirect: true})
        }).catch(() => {
            this.props.toggleLoading();
            this.setState({error: false})
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
                </div>
                <div className="input-cont">
                    <div className="reg-sap reg-input">
                        <TextField
                            error={this.state.error}
                            id={`outlined-username`}
                            label="SAP"
                            value={this.state.sap}
                            onChange={this.inputHandler('sap')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="reg-password reg-input">
                        <TextField
                            error={this.state.error}
                            id={`outlined-password`}
                            label="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.inputHandler('password')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="reg-email reg-input">
                        <TextField
                            error={this.state.error}
                            label="Email"
                            type="email"
                            value={this.state.email}
                            onChange={this.inputHandler('email')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="reg-first-name reg-input">
                        <TextField
                            error={this.state.error}
                            label="First Name"
                            type="email"
                            value={this.state.firstName}
                            onChange={this.inputHandler('firstName')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="reg-last-name reg-input">
                        <TextField
                            error={this.state.error}
                            label="Last Name"
                            type="text"
                            value={this.state.lastName}
                            onChange={this.inputHandler('lastName')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className="register-actions-cont">
                    <div className="login-instead-cont">
                        <Link to={"/visitor/login"}><Button color="primary">Sign in instead</Button></Link>
                    </div>
                    <div className="submit-reg-cont">
                        <Button variant="contained" color="primary"><div onClick={this.register}>Continue</div></Button>
                    </div>
                </div>

            </div>
        )
    }
}
export default withRouter(connect(null, actions)(Register));