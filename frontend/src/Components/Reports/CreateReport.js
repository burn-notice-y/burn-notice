import React, { Component } from 'react';
import * as actions from '../../store/actions'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import DatePickClass from '../DatePickClass'
import axios from 'axios';
import '../../css/CreateReport.css';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { reportCategories } from '../../data/categories';
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import TimePick from "../TimePicker";
import Paper from "@material-ui/core/Paper/Paper";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Divider from "@material-ui/core/Divider/Divider";


class CreateVacancy extends Component{
    state = {
        reportType: "",
        chemicals: "",
        fireRetardant: "",
        primaryTeamActions: "",
        secondaryTeamActions: "",
        team: "",
        description: "",
        timeArrived: "",
        timeDispatched: "",
        redirect: false,
        error: false,
        disabled: false,
    };

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    render(){
        if (this.state.redirect){
            return <Redirect to={"/reports"}/>
        }

        return (
            <div className={"create-report-cont"}>
                <div className="register-header">
                    <Typography component="h3" variant="h3" gutterBottom className={"registration-header"}>
                        File a Report
                    </Typography>
                </div>
                <div className="input-cont">
                    <div className="vacancy-cat reg-input">
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Type of Report"
                            value={this.state.reportType}
                            onChange={this.inputHandler('reportType')}
                            margin="normal"
                            variant="outlined"
                        >
                            {reportCategories.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="reg-input">
                        <DatePickClass labelDisplay={"Incident Date"}/>
                    </div>
                    <div className="time">
                        <div className="time1-cont">
                            <TimePick label={"Time Dispatched"}/>
                        </div>
                        <div className="time2-cont">
                            <TimePick label={"Time Arrived"}/>
                        </div>
                    </div>
                    <div className="vac-role-cont reg-input">
                        <FormLabel component="legend">Exposure to Chemicals?</FormLabel>
                        <div>
                            <RadioGroup
                                className="role-cont"
                                name="engine"
                                value={this.state.chemicals}
                                onChange={this.inputHandler('chemicals')}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Yes"/>
                                <FormControlLabel value="false" control={<Radio />} label="No"/>
                            </RadioGroup>
                        </div>

                    </div>
                    <div className="vac-role-cont reg-input">
                        <FormLabel component="legend">Fire Retardant Present?</FormLabel>
                        <div >
                            <RadioGroup
                                className="role-cont"
                                aria-label="Was there exposure to chemicals?"
                                name="engine"
                                value={this.state.fireRetardant}
                                onChange={this.inputHandler('fireRetardant')}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Yes"/>
                                <FormControlLabel value="false" control={<Radio />} label="No"/>
                            </RadioGroup>
                        </div>

                    </div>
                    <div className="reg-email reg-input">
                        <TextField
                            error={this.state.error}
                            label="Primary Team Actions"
                            type="text"
                            value={this.state.primaryTeamActions}
                            onChange={this.inputHandler('primaryTeamActions')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="reg-email reg-input">
                        <TextField
                            error={this.state.error}
                            label="Secondary Team Actions"
                            type="text"
                            value={this.state.secondaryTeamActions}
                            onChange={this.inputHandler('secondaryTeamActions')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="reg-last-name reg-input">
                        <TextField
                            error={this.state.error}
                            label="General Description"
                            type="text"
                            value={this.state.description}
                            onChange={this.inputHandler('description')}
                            margin="normal"
                            variant="outlined"
                            helperText={"Anything important that wasn't covered by other fields"}
                        />
                    </div>
                    <div className="team-header">
                        <Typography component="h3" variant="h5" gutterBottom className={"registration-header"}>
                            Define the Teams
                        </Typography>
                    </div>
                    <div>
                        <div className="vac-role-cont reg-input">
                            <FormLabel component="legend">Choose the Team</FormLabel>
                            <div>
                                <RadioGroup
                                    className="role-cont group"
                                    name="engine"
                                    value={this.state.chemicals}
                                    onChange={this.inputHandler('team')}
                                >
                                    <FormControlLabel value="primary" control={<Radio />} label="Primary Team"/>
                                    <FormControlLabel value="secondary" control={<Radio />} label="Secondary Team"/>
                                </RadioGroup>
                            </div>

                        </div>
                        <Paper elevation={1} className={"search-cont"}>
                            <input type="text" id={"search"}
                                   value={this.state.search}/>
                            <IconButton aria-label="Search">
                                <SearchIcon/>
                            </IconButton>
                            <Divider/>
                        </Paper>
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