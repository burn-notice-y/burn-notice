import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import '../../css/Profile.css';
import user from '../../data/user';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from "axios";
import * as PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider/Divider";

class Profile extends Component {
    state = {
        editLocked: true,
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        sap: "",
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user && nextProps.user.id !== ""){
            if (nextProps.user.id !== prevState.id){
                return {...nextProps.user}
            }
            return null;
        } else {
            return {...nextProps.user}
        }
    }

    toggleEdit = () => {
        this.setState({editLocked: !this.state.editLocked})
    };

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    saveUserUpdate = event => {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.editLocked) {
            this.props.showModal(["Oops", "Editing is locked", "Click the edit button to make changes"])
        } else {
        this.props.toggleLoading();
            axios.post("/api/edit-profile", {...this.state})
                .then(() => {
                    this.props.toggleLoading();
                    this.props.showPopup("Success!");
                    this.setState({editLocked: true});
                    // setTimeout(() => {
                    //     this.props.closePopup()
                    // }, 4000)
                })
        }
    };

    render() {
        let actionName = "cancel";
        if (this.state.editLocked){
            actionName = "edit"
        }
        let transferEligible = false;
        let transferText = "No";
        if (transferEligible){
            transferText = "Yes";
        }
        return (
            <div className={"big-edit-cont"}>
                <div className="register-header">
                    <div className="top">
                        <Typography component="h3" variant="h4" gutterBottom className={"registration-header"}>
                            Your Profile
                        </Typography>
                        <Divider/>
                        <div className="edit-cont">
                            <Button variant="contained" color="primary">
                                <div onClick={this.toggleEdit}>{actionName}</div>
                            </Button>
                        </div>
                    </div>

                    <Typography component="p" variant="body1" gutterBottom className={"registration-header"}>
                        Press the edit button to make changes
                    </Typography>
                </div>
                <div className="prof-input-cont">
                    <form>
                    <div className="editable">
                        <div className="reg-email prof-input">
                            <TextField
                                label="Email"
                                type="email"
                                value={this.state.email}
                                onChange={this.inputHandler('email')}
                                margin="normal"
                                variant="outlined"
                                disabled={this.state.editLocked}
                            />
                        </div>
                        <div className="reg-first-name prof-input">
                            <TextField
                                label="First Name"
                                type="text"
                                value={this.state.firstName}
                                onChange={this.inputHandler('firstName')}
                                margin="normal"
                                variant="outlined"
                                disabled={this.state.editLocked}
                            />
                        </div>
                        <div className="reg-last-name prof-input">
                            <TextField
                                label="Last Name"
                                type="text"
                                value={this.state.lastName}
                                onChange={this.inputHandler('lastName')}
                                margin="normal"
                                variant="outlined"
                                disabled={this.state.editLocked}
                            />
                        </div>
                    </div>
                    <div className="static">
                        <div className="overview">
                            <div className="static-header">
                                <Typography component="h3" variant="h6" gutterBottom className={"edit-transfer"}>
                                    Overview:
                                </Typography>
                            </div>
                            <div className="edit-transfer-cont reg-input">
                                <Typography component="p" variant="subtitle2" gutterBottom className={"edit-transfer"}>
                                    SAP: {this.state.sap}
                                </Typography>
                            </div>
                            <div className="edit-transfer-cont reg-input">
                                <Typography component="p" variant="subtitle2" gutterBottom className={"edit-transfer"}>
                                    Eligible For Transfer: {transferText}
                                </Typography>
                            </div>
                            <div className="edit-station-cont reg-input">
                                <Typography component="p" variant="subtitle2" gutterBottom className={"edit-transfer"}>
                                    Current Station: {user.fireStation.code}
                                </Typography>
                            </div>
                            <div className="edit-station-cont reg-input">
                                <Typography component="p" variant="subtitle2" gutterBottom className={"edit-transfer"}>
                                    Current District: {user.fireStation.district}
                                </Typography>
                            </div>
                        </div>
                        <div className="prof-actions-cont">
                            <Button variant="contained" color="primary" type={"submit"} onClick={this.saveUserUpdate}>Save
                            </Button>
                        </div>
                    </div>
                    </form>

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

Profile.propTypes = {
    showPopup: PropTypes.func,
    toggleLoading: PropTypes.func,
    closePopup :PropTypes.func
};
export default connect(mapStateToProps, actions)(Profile);