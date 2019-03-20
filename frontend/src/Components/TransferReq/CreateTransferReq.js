
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from '@material-ui/core/Button';
import vacancy from "../../data/bigVacancy";
import ManyFirefighters from "../Firefighters/ManyFirefighters";
import moment from 'moment';
import "../../css/Firefighter.css"
import axios from "axios";
import * as PropTypes from "prop-types";
import {Redirect} from "react-router-dom";








class CreateTransferReq extends Component{
    state = {
        editLocked: true,
        sap: "",
        email: "",
        firstName: "",
        lastName: ""
    };

    componentDidMount(){
        // fetch the vacancy via axios.get()

        // store vacancy to a variable

        //

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
        if (this.state.redirect){
            this.props.fetchUser();
            return <Redirect to={"/vacancy/show"}/>
        }
        let fillDate = () => {
            if (vacancy.fillDate === "9999") {
                return "Open";
            } else {
                return (moment(vacancy.fillDate).format("MMMM Do YYYY"));
            }
        };

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
                            <div className="reg-sation reg-input">
                                <TextField
                                    label={"Station"}
                                    value={vacancy.fireStation.code}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-role reg-input">
                                <TextField
                                    label="Role"
                                    value={role}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-temporary reg-input">
                                <TextField
                                    label="Temporary"
                                    value={temporary}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-post-date reg-input">
                                <TextField
                                    label="Post Date"
                                    value={postDate}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-fill-date reg-input">
                                <TextField
                                    label="Fill Date"
                                    value={fillDate()}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-crew reg-input">
                                <br/>
                                    <ManyFirefighters/>
                            </div>
                            <br/>
                        </div>
                        <div className="top">
                            <Typography component="h3" variant="h4" gutterBottom className={"application-header"}>
                                {this.props.applicantHeader}
                            </Typography>
                        </div>
                    </div>
                    <div className="input-cont">
                        <div className="editable">
                            <div className="reg-sap reg-input">
                                <TextField
                                    label="SAP"
                                    value={this.state.sap}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-email reg-input">
                                <TextField
                                    label="Email"
                                    value={this.state.email}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-firstname reg-input">
                                <TextField
                                    label="First Name"
                                    value={this.state.firstName}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>
                            <div className="reg-lastname reg-input">
                                <TextField
                                    label="Last Name"
                                    value={this.state.lastName}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}/>
                            </div>

                            <Button variant="contained" color="primary"><div onClick={this.apply}>
                                Submit Application
                            </div></Button>
                        </div>
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
