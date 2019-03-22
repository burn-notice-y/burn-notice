import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import Typography from "@material-ui/core/Typography/Typography";
import vacancy from "../../data/bigVacancy";
import ManyFirefighters from "../Firefighters/ManyFirefighters";
import moment from 'moment';
import "../../css/Firefighter.css"
import axios from "axios";
import VacancyInfo from './VacancyInfo';
import VacancyUserInfo from "./VacancyUserInfo";

class CreateTransferReq extends Component{
    state = {
        editLocked: true,
        sap: "",
        email: "",
        firstName: "",
        lastName: "",
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
        return {...nextProps}
    }

    apply = () => {
        this.props.toggleLoading();
        axios.post("/api/submitApplication", {
            sentDate: moment().format('YYYY Do MM'),
            status: "Pending",
            user: this.state.user,
            vacancy: vacancy,
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
        console.log(this.state);
        let vacancy = this.state.vacancy;
        let fillDate = moment().format("MMMM Do YYYY");
        let applyText = "Apply";
        let canApply = true;
        if (vacancy.fillDate !== "9999"){
            applyText = "Closed";
            canApply = false;
            fillDate = "Closed"
        }
        let postDate = moment(vacancy.postDate).format("MMMM Do YYYY");

        let temporary = "";
        vacancy.temporary ? temporary = "Yes" : temporary = "No";
        let role = "";
        vacancy.engine ? role = "Engine" : role = "Truck";



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
                            <VacancyInfo fillDate={fillDate} postDate={postDate} role={role} temporary={temporary}
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
                        <VacancyUserInfo {...this.state} apply={this.apply} canApply={canApply} applyText={applyText}/>
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

CreateTransferReq.propTypes = {
    header: PropTypes.string,
    applicant: PropTypes.object,
    applicantHeader: PropTypes.string
};
export default connect(mapStateToProps, actions)(CreateTransferReq);
