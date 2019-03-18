import React, { Component } from 'react';
import * as actions from '../../store/actions'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DatePickClass from '../DatePickClass'
import axios from 'axios';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { fireStations } from '../../data/categories';
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";


class CreateVacancy extends Component{
    state = {
        reportType: "",
        temporary: "",
        redirect: false,
        error: false,
        disabled: false,
    };

    postToDb = () => {
        axios.post("/api/create-user", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            sap: this.state.sap,
            password: this.state.password,
            email: this.state.email,
            chief: false
        }).then(() => {
            // do stuff
        })
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
            return <Redirect to={"/vacancies"}/>
        }
        return (
            <div className={"admin-create-vacancy"}>
                <div className="vacancy-header">
                    <Typography component="h3" variant="h3" gutterBottom className={"registration-header"}>
                        Create a Vacancy
                    </Typography>
                </div>
                <div className="input-cont">
                    <div className="vac-date-cont reg-input">
                        <DatePickClass labelDisplay={"Start Date"}/>
                    </div>
                    <div className="vac-role-cont reg-input">
                        <FormLabel component="legend">Vacancy Role</FormLabel>
                        <div >
                            <RadioGroup
                                className="role-cont"
                                aria-label="Role"
                                name="engine"
                                value={this.state.engine}
                                onChange={this.inputHandler('engine')}
                            >
                                <FormControlLabel value="engine" control={<Radio />} label="Engine" />
                                <FormControlLabel value="truck" control={<Radio />} label="Truck" />
                            </RadioGroup>
                        </div>

                    </div>

                    <div className="vac-role-cont reg-input">
                        <FormLabel component="legend">Is this role temporary?</FormLabel>
                        <div >
                            <RadioGroup
                                className="role-cont"
                                aria-label="Role"
                                name="temporary"
                                value={this.state.temporary}
                                onChange={this.inputHandler('temporary')}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </div>

                    </div>
                    <div className="vacancy-cat reg-input">
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Station With Vacancy"
                            value={this.state.reportType}
                            onChange={this.inputHandler('reportType')}
                            margin="normal"
                            variant="outlined"
                        >
                            {fireStations.map(option => (
                                <MenuItem key={option} value={option} className={"station-num"}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
                <div className="actions-cont">
                    <div className="submit-reg-cont">
                        <Button variant="contained" color="primary"><div onClick={this.register}>Continue</div></Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(connect(null, actions)(CreateVacancy));