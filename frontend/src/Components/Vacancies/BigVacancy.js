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
import VacancyInfo from "../TransferReq/VacancyInfo";
import VacancyUserInfo from "../TransferReq/VacancyUserInfo";
import Redirect from "react-router-dom/es/Redirect";
import Divider from "@material-ui/core/Divider/Divider";

class BigVacancy extends Component {
    state = {
        vacancy: null,
        id: "",
        firstName: "",
        lastName: "",
    };

    static getDerivedStateFromProps(nextProps) {
        return {...nextProps.user}
    }


    componentDidMount(){
        this.props.toggleLoading();
        axios.get(`/api/one-vacancy?id=${this.props.match.params.id}`)
            .then(res => {
                this.props.toggleLoading();
                this.setState({vacancy: res.data})
            })
            .catch(error => {
                this.props.toggleLoading();
                console.log(error);
            })
    }

    apply = () => {
        axios.post("/api/submitApplication", {
            sentDate: moment().format('YYYY Do MM'),
            status: "Pending",
            applicants: this.props.user,
            vacancy: vacancy,
        }).then(result => console.log(result))
    };

    render(){
        if (this.state.vacancy === null){
            return <div/>;
        }
        if (this.state.redirect){
            return <Redirect to={`/transfer/view/${this.state.id}`}/>
        }
        let vacancy = this.state.vacancy;
        let fillDate = moment("2019-03-20").format("MMMM Do YYYY");
        let applyText = "Closed";
        let cannotApply = true;
        let helperText = "";
        if (vacancy.fillDate === "9999"){
            fillDate = "Open";
            applyText = "Apply";
            if (this.state.eligibleForTransfer){
                cannotApply = false;
            } else {
                helperText = "You are not eligible for transfer"
            }
        }
        let captain = "";
            //this.state.vacancy.station.captain.firstName + " " + this.state.vacancy.station.captain.lastName;

        return (
            <div className={"big-edit-cont"}>
                <div className="application-header">
                    <div className="top">
                        <Typography component="h3" variant="h4" gutterBottom className={"application-header"}>
                            Apply to this vacancy
                        </Typography>
                    </div>
                        <Divider/>
                    <div className="input-cont">
                        <div className="apply">
                            <VacancyInfo fillDate={fillDate} postDate={moment(vacancy.postDate).format("MMMM Do YYYY")} role={vacancy.engine ? "Engine" : "Truck"} temporary={vacancy.temporary ? "Yes" : "No"}
                                         stationName={vacancy.station.name} captain={captain}


                            />

                            <div className={"fireman-cont"}>
                                <ManyFirefighters firemanList={this.state.vacancy.station.currentCrew}/>
                            </div>
                        </div>
                        <div className="top">
                            <Typography component="h3" variant="h4" gutterBottom className={"application-header"}>
                                {this.props.applicantHeader}
                            </Typography>
                        </div>
                    </div>
                    <div className="input-cont">
                        <VacancyUserInfo {...this.state} apply={this.apply}
                                         cannotApply={cannotApply}
                                         applyText={applyText}
                                         chief={this.state.chief}
                                         helperText={helperText}
                                         actionOnRequest={this.actionOnRequest}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};
export default connect(mapStateToProps, actions)(BigVacancy);
