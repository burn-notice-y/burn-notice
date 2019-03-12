import React, { Component } from 'react';
import * as actions from '../store/actions'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import '../css/Register.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';


class Register extends Component{
    state = {
        sap: "",
        password: "",
        email: "",
        redirect: false,
        error: false,
        disabled: false

    };

    register = () => {
        // post to db here
        //simulating with timeout
        this.props.toggleLoading();
        setTimeout(() => {
            this.setState({redirect: true});
            this.props.toggleLoading();
        }, 2000)
    };

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    render(){
        if (this.state.redirect){
            return <Redirect to={"/profile"}/>
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
                <div className="actions-cont">
                    <div className="login-instead-cont">
                        <Link to={"/login"}><Button color="primary">Sign in instead</Button></Link>
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