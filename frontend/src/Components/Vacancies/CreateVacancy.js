import React, {Component, Fragment} from 'react';
import * as actions from '../../store/actions'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DatePickClass from '../DatePickClass'
import axios from 'axios';
import { fireStations } from '../../data/categories';
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import moment from 'moment';
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider/Divider";
import DropDown from "../DropDown";
import TwoOptionSelect from "../TwoOptionSelect";

class CreateVacancy extends Component{
    state = {
        reportType: "",
        temporary: "false",
        engine: false,
        postDate: moment().format("YYYY-MM-DD"),
        fillDate: "9999",
        station: "24",
        redirect: false,
        error: false,
    };

    submit = () => {
        this.props.toggleLoading();
        this.setState(prevState => ({station: {name: prevState.station}}));
        axios.post("/api/create-vacancy", {
            ...this.state
        }).then(() => {
            this.props.toggleLoading();
            this.setState({redirect: true})
        }).catch(() => {
            this.props.toggleLoading();
            this.props.showModal(["Oops", "Something went wrong", "Please try again later"])
        });
    };

    inputHandler = type => event => {
        switch (type) {
            case "postDate":
                if (event > moment()){
                    this.setState({postDate: event.format("YYYY-MM-DD")});
                }
                break;
            default:
                this.setState({
                [type]: event.target.value
            })
        }
    };

    render(){
        if (this.state.redirect){
            return <Redirect to={"/vacancy/show"}/>
        }
        return (
        <Fragment>
            <div className={"admin-create-vacancy"}>
                <div className="vacancy-header">
                    <Typography component="h3" variant="h3" gutterBottom className={"registration-header"}>
                        Create a Vacancy
                    </Typography>
                </div>
                <Divider className={"vacancy-divider"}/>
                <div className="input-cont">
                    <div className="vac-date-cont reg-input">
                        <DatePickClass labelDisplay={"Start Date"}
                                       value={this.state.postDate} handleChange={this.inputHandler}
                                       argumentName={"postDate"}
                        />
                    </div>
                    <div className="vac-role-cont reg-input">
                        <div>
                            <TwoOptionSelect value={this.state.engine}
                                             oneName={"Yes"} oneVal={"true"}
                                             twoName={"No"} twoVal={"false"}
                                             title={"Vacancy Role"}
                                             inputHandler={this.inputHandler}/>
                        </div>
                    </div>
                    <div className="vac-role-cont reg-input">
                        <div >
                            <TwoOptionSelect value={this.state.role}
                                             title={"Is this role temporary?"}
                                             oneName={"Yes"} oneVal={"true"}
                                             twoName={"No"} twoVal={"false"}
                                             inputHandler={this.inputHandler}/>
                        </div>
                    </div>
                    <div className="vacancy-cat reg-input">
                        <DropDown inputHandler={this.inputHandler} value={this.state.station}
                                  inputArgument={"station"} items={fireStations} label={"Station"}
                        />
                    </div>
                </div>
                <div className="actions-cont">
                    <div className="submit-reg-cont">
                        <Button variant="contained" color="primary"><div onClick={this.submit}>Submit</div></Button>
                    </div>
                </div>
            </div>
        </Fragment>
        )
    }
}

CreateVacancy.propTypes = {
    toggleLoading: PropTypes.func,
    showModal: PropTypes.func,
};

export default withRouter(connect(null, actions)(CreateVacancy));
