import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Link, withRouter, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import '../../css/Login.css';
import axios from 'axios';
import PropTypes from 'prop-types';


class Login extends Component {
    state = {
      sap: "",
      password: "",
      error: false,
      redirect: false
    };

    login = () => {
        this.props.toggleLoading();
        axios.post("/api/login", `sap=${this.state.sap}&password=${this.state.password}`)
            .then(() => {
                this.setState({redirect: true});
                this.props.toggleLoading()
            })
            .catch(() => {
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
            return <Redirect to={"/user/profile"}/>
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

Login.propTypes = {
    toggleLoading: PropTypes.any.isRequired
};

export default withRouter(connect(null, actions)(Login));