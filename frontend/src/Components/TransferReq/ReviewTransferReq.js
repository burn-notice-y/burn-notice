import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import Typography from "@material-ui/core/Typography/Typography";
import ManyFirefighters from "../Firefighters/ManyFirefighters";
import moment from 'moment';
import "../../css/Firefighter.css"
import axios from "axios";
import VacancyInfo from './VacancyInfo';
import VacancyUserInfo from "./VacancyUserInfo";
import * as PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

class ReviewTransferReq extends Component{
    state = {
        editLocked: true,
        id: "",
        sap: "",
        email: "",
        firstName: "",
        lastName: "",
        eligibleForTransfer: "",
        chief: false,
        vacancy: null
    };

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

    static getDerivedStateFromProps(nextProps){
        return {...nextProps.user}
    }

    actionOnRequest = action => {
        let url = "";

      switch (action) {
          case "approve": url = "/api/approve-transfer";
            break;
          case "deny": url = "/api/deny-request";
              break;
          default: url = "/api/submitApplication"
      }

        this.props.toggleLoading();
        axios.post(url, {
            id: this.props.match.params.id,
            sentDate: moment().format("YYYY-MM-DD"),
            status: "Pending",
            user: {
                id: this.state.id
            },
            vacancy: {
                id: this.state.vacancy.id
            }
        }).then(() => {
            this.props.toggleLoading();
            this.setState({redirect: true});
        }).catch(() => {
            this.props.toggleLoading();
            this.setState({error: true})
        })
    };

    render() {
        if (this.state.vacancy === null){
            return <div/>;
        }
        if (this.state.redirect && !this.state.chief){
            return <Redirect to={`/transfer/view/${this.state.id}`}/>
        } else if (this.state.redirect) {
            return <Redirect to={"/transfer/view"}/>
        }
        let vacancy = this.state.vacancy;
        let fillDate = moment(vacancy.fillDate, "MMMM Do YYYY");
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
        return (
            <div className={"big-edit-cont"}>
                <div className="application-header">
                    <div className="top">
                        <Typography component="h3" variant="h4" gutterBottom className={"application-header"}>
                            {this.props.header}
                        </Typography>
                    </div>
                    <div className="input-cont">
                        <div className="apply">
                            <VacancyInfo fillDate={fillDate} postDate={moment(vacancy.postDate).format("MMMM Do YYYY")} role={vacancy.engine ? "Engine" : "Truck"} temporary={vacancy.temporary ? "Yes" : "No"}
                                         stationName={vacancy.station.name}


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
        user: state.user,
    }
};

ReviewTransferReq.propTypes = {
    header: PropTypes.string,
    applicant: PropTypes.object,
    applicantHeader: PropTypes.string
};
export default connect(mapStateToProps, actions)(ReviewTransferReq);
