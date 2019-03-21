import React, { Component } from 'react';
import vacancy from '../../data/bigVacancy';
import Typography from "@material-ui/core/Typography/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import moment from 'moment';
import ManyFirefighters from '../Firefighters/ManyFirefighters';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from "axios";
import * as actions from '../../store/actions';
import { connect }  from 'react-redux';
import {Link} from "react-router-dom";







// show all of the properties from the vacancy object

// use material UI and containers with flexbox to put them all pretty like

// give current crew as props to ManyFirefighters,
// which then maps over the array and returns a Firefighter component for each one

class BigVacancy extends Component {

    state={

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
        console.log(vacancy);

        let applicable = () =>
        {
            if(vacancy.fillDate === "9999")
            {
                return "Apply";
            }
            else
            {
                return "Closed";
            }
        };

        let postDate = moment(vacancy.postDate).format("MMMM Do YYYY");

        let fillDate = () => {
            if(vacancy.fillDate === "9999") {
                return "Open";
            } else {
                return (moment(vacancy.fillDate).format("MMMM Do YYYY"))
            }
        };

        let temporary = "";
        vacancy.temporary ? temporary = "Yes" : temporary = "No";
        let role = "";
        vacancy.engine ? role = "Engine" : role = "Truck";

        function ListDividers(props)
        {
            const {classes} = props;
        }


        return (

            <div className="vacancy-scroll">
                <Typography variant="h2">
                    Vacancy Details
                </Typography>


                <div>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Station"
                        defaultValue={vacancy.fireStation.code}
                        className="text-field-width"
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Role"
                        className="text-field-width"
                        defaultValue={role}
                        margin="normal"
                        variant="outlined"
                    />
                </div>

                <div>
                    <TextField
                        disabled
                        id="Temporary"
                        label="Temporary"
                        className="text-field-width"
                        defaultValue={temporary}
                        margin="normal"
                        variant="outlined"
                    />
                </div>

                <div>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Post Date"
                        className="text-field-width"
                        defaultValue={postDate}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Fill Date"
                        className="text-field-width "
                        defaultValue={fillDate()}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div>
                    <Typography>
                        <ManyFirefighters/>
                    </Typography>
                </div>


                <Link to={"/transfer/create"}><Button gutterBottom variant="contained" className="vacancy-btn-color"><div onClick={this.apply}>
                    {applicable()}
                </div>
                </Button></Link>

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
