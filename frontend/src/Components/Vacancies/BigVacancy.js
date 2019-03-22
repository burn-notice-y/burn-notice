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
    state = { firemanList: [] };

    componentDidMount(){
        this.props.toggleLoading();
        axios.get(`/api/one-vacancy?id=${this.props.match.params.id}`)
            .then(res => {
                this.props.toggleLoading();
                this.setState({firemanList: res.data.station.currentCrew})
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
                        defaultValue={vacancyText}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div>
                    <ManyFirefighters firemanList={this.state.firemanList}/>
                </div>

                <Link to={"/transfer/create"}><Button gutterBottom variant="contained"
                                                      className="vacancy-btn-color" disabled={canApply}>
                    <div onClick={this.apply}>
                    {applyText}
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
