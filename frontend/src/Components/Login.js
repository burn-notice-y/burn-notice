import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { Link, withRouter, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import '../css/Login.css';


class Login extends Component {
    state = {
      sap: "",
      password: "",
      error: false,
      redirect: false
    };

    login = () => {
        this.props.toggleLoading();
        setTimeout(() => {
            this.setState({redirect: true});
            this.props.toggleLoading()
        }, 2000)
        // axios.post("/api/login", {
        //     sap: this.state.sap,
        //     password: this.state.password
        // })
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
            <div className="login-cont">
                <div className="login-header">
                    <Typography component="h3" variant="h2" gutterBottom className={"login-header"}>
                        Sign in
                    </Typography>
                </div>
                <div className="login-info">
                    <Typography component="p" gutterBottom className={"login-header"}>
                        Use your SAP number, and your custom password
                    </Typography>
                </div>
                <div className="form-cont">
                    <div className="input-cont">
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
                    <div className="input-cont">
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
                </div>
                <div className="login-actions-cont">
                    <div className="submit-login-cont">
                        <Button variant="contained" color="primary" className={"login-button"}><div onClick={this.login}>Continue</div></Button>
                    </div>
                    <div className="login-instead-cont">
                        <Link to={"/forgot-password"}><Button color="primary">Forgot Password</Button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(null, actions)(Login));