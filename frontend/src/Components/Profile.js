import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import '../css/Profile.css';
import user from '../data/user';

class Profile extends Component {
    state = {
        editLocked: true,
        sap: "",
        password: "",
        email: "",
        firstName: "",
        lastName: ""
    };
    componentDidMount(){
        this.setState({...user})
    }

    toggleEdit = () => {
        this.setState({editLocked: !this.state.editLocked})
    };

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    saveUserUpdate = () => {
        // put to db with user changes using state
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
                <div className="input-cont">

                    <div className="editable">
                        <div className="reg-sap reg-input">
                            <TextField
                                label="SAP"
                                value={this.state.sap}
                                onChange={this.inputHandler('sap')}
                                margin="normal"
                                variant="outlined"
                                helperText="Requires Approval"
                                disabled={this.state.editLocked}
                            />
                        </div>
                        <div className="reg-email reg-input">
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
                        <div className="reg-first-name reg-input">
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
                        <div className="reg-last-name reg-input">
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
                        <div className="static-header">
                            <Typography component="h3" variant="h6" gutterBottom className={"edit-transfer"}>
                                Overview:
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

                </div>
                <div className="actions-cont">
                        <Button variant="contained" color="primary">
                            <div onClick={this.register}>Save</div>
                        </Button>
                    </div>
            </div>
        )
    }
}

export default Profile;