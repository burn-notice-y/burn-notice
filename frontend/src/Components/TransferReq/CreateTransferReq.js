import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import user from '../../data/user';
import Button from '@material-ui/core/Button';
import vacancy from "../../data/bigVacancy";
import ManyFirefighters from "../Firefighters/ManyFirefighters";
import moment from 'moment';
import "../../css/Firefighter.css"








class CreateTransferReq extends Component{
    state = {
        sap: "",
        password: "",
        email: "",
        firstName: "",
        lastName: ""
    };
    componentDidMount(){
        this.setState({...user})
    }

    render() {

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
                            Review your Application
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
                                    disabled={vacancy.fireStation.code}/>
                            </div>
                            <div className="reg-role reg-input">
                                <TextField
                                    label="Role"
                                    value={role}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={role}/>
                            </div>
                            <div className="reg-temporary reg-input">
                                <TextField
                                    label="Temporary"
                                    value={temporary}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={temporary}/>
                            </div>
                            <div className="reg-post-date reg-input">
                                <TextField
                                    label="Post Date"
                                    value={postDate}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={postDate}/>
                            </div>
                            <div className="reg-fill-date reg-input">
                                <TextField
                                    label="Fill Date"
                                    value={fillDate()}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={fillDate()}/>
                            </div>
                            <div className="reg-crew reg-input">
                                <br/>
                                <Typography id="mff">
                                    <ManyFirefighters/>
                                </Typography>
                            </div>
                            <br/>
                        </div>
                        <div className="top">
                            <Typography component="h3" variant="h4" gutterBottom className={"application-header"}>
                                 Your Information
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
                                    disabled={this.state.sap}/>
                            </div>
                            <div className="reg-email reg-input">
                                <TextField
                                    label="Email"
                                    value={this.state.email}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={this.state.email}/>
                            </div>
                            <div className="reg-firstname reg-input">
                                <TextField
                                    label="First Name"
                                    value={this.state.firstName}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={this.state.firstName}/>
                            </div>
                            <div className="reg-lastname reg-input">
                                <TextField
                                    label="Last Name"
                                    value={this.state.lastName}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={this.state.lastName}/>
                            </div>

                            <Button variant="contained" color="primary">
                                Submit Application
                            </Button>
                        </div>
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
export default connect(mapStateToProps, actions)(CreateTransferReq);
