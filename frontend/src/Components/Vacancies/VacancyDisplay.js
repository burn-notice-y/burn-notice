import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ManyVacancies from "../Vacancies/ManyVacancies";
import '../../css/AdminVacancy.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import * as PropTypes from "prop-types";
import TwoOptionSelect from "../TwoOptionSelect";
import Divider from "@material-ui/core/Divider/Divider";
import EmptyDisplay from "../EmptyDisplay";

class VacancyDisplay extends Component{
    state= {
        allVacancies: [],
        openVacancies: [],
        filterTerm: "open"
    };

    componentDidMount(){
        this.props.toggleLoading();
        axios.get(`/api/all-vacancies`)
            .then(allVacancies => {
                axios.get("/api/open-vacancies")
                    .then(openVacancies => {
                        this.props.toggleLoading();
                        this.setState({
                            allVacancies: allVacancies.data,
                            openVacancies: openVacancies.data
                        })
                    }).catch(() => {
                    this.props.toggleLoading();
                    this.props.showModal(["Oops", "Something went wrong", "Please try again"])
                })
            })
            .catch(() => {
                this.props.toggleLoading();
                this.props.showModal(["Oops", "Something went wrong", "Please try again"])
            })
    }

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    render(){
        let chief = false;
        if (this.props.user && this.props.user.chief){
            chief = true;
        }
        let style = "black";
        let text = "All";
        if(this.state.filterTerm === "open") {
            style = "green";
            text = "Open";
        }
        return(
            <div className="view-vacancy-cont">
                <div className="view-vacancy-header">
                    <Typography variant="h4" component="h2">
                        View vacancies in your district
                    </Typography>
                    <Divider className={"vacancy-district-cont"}/>
                    <div className="search-cont">
                        <div className="status-cont">
                            <Typography component="p" variant="h6" className={"current-status"}>
                                Currently showing:
                            </Typography>
                            <Typography component="p" variant="subheading">
                                <span style={{color: style}}>{text}</span> Vacancies
                            </Typography>
                        </div>
                        <TwoOptionSelect className={"vacancy-filter"} value={this.state.filterTerm}
                                         inputHandler={this.inputHandler} title={"Vacancy Type Displayed"}
                                         oneName={"Open"} oneVal={"open"} twoName={"All"} twoVal={"all"}
                                         argument={"filterTerm"}
                        />
                    </div>


                </div>
                <div className="vacancy-cont">
                    <ManyVacancies admin={chief} vacancies={this.state.filterTerm === "open" ? this.state.openVacancies : this.state.allVacancies}/>
                    <EmptyDisplay show={true} items={this.state.filterTerm === "open" ? this.state.openVacancies : this.state.allVacancies} variant={"h5"} name={"vacancies"}/>
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

VacancyDisplay.propTypes = {
    toggleLoading: PropTypes.func,
    showModal: PropTypes.func,
};



export default connect(mapStateToProps, actions)(VacancyDisplay);