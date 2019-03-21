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
import moment from 'moment';
import PropTypes from "prop-types";


class CreateVacancy extends Component{
    state = {
        reportType: "",
        temporary: "",
        engine: false,
        postDate: moment().format("YYYY-MM-DD"),
        fillDate: "9999",
        station: { name: "40"},
        redirect: false,
        error: false,
        disabled: false,
    };

    submit = () => {
        this.props.toggleLoading();
        axios.post("/api/create-vacancy", {
            ...this.state
        }).then(res => {
            this.props.toggleLoading();
            console.log(res)
        }).catch(error => {
            this.props.toggleLoading();
            console.log(error)
        });
    };

    inputHandler = type => event => {
        switch (type) {
            case "postDate":
                this.setState({postDate: event});
                break;
            case "station":
                this.setState({station: {name: event.target.value}});
                break;
            default:
                this.setState({
                [type]: event.target.value
            })
        }
    };

    render(){
        if (this.state.redirect){
            return <Redirect to={"/vacancies"}/>
        }
        console.log(this.state);
        return (
            <div className={"admin-create-vacancy"}>
                <div className="vacancy-header">
                    <Typography component="h3" variant="h3" gutterBottom className={"registration-header"}>
                        Create a Vacancy
                    </Typography>
                </div>
                <div className="input-cont">
                    <div className="vac-date-cont reg-input">
                        <DatePickClass labelDisplay={"Start Date"}
                                       startDate={this.state.postDate} handleChange={this.inputHandler}
                                       argumentName={"postDate"}
                        />
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
                            value={this.state.station.name}
                            onChange={this.inputHandler('station')}
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
                        <Button variant="contained" color="primary"><div onClick={this.submit}>Submit</div></Button>
                    </div>
                </div>
            </div>
        )
    }
}

CreateVacancy.propTypes = {
    toggleLoading: PropTypes.func
};

export default withRouter(connect(null, actions)(CreateVacancy));