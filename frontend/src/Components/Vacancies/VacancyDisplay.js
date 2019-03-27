import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ManyVacancies from "../Vacancies/ManyVacancies";
import '../../css/AdminVacancy.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import * as PropTypes from "prop-types";
import DropDown from "../DropDown";
import {vacancyStatus} from "../../data/categories";
import TwoOptionSelect from "../TwoOptionSelect";
import Divider from "@material-ui/core/Divider/Divider";


// this component is the admin's view of Vacancies in their district

class VacancyDisplay extends Component{
    // if chief is true, send chief to ManyVacancies
    state= {
        allVacancies: [],
        filterTerm: "open"
    };
    componentDidMount(){
       this.fetchVacancies();
    }

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        }, this.fetchVacancies)
    };

    fetchVacancies = () => {
        this.props.toggleLoading();
        axios.get(`/api/${this.state.filterTerm === "all" ? "all" : "open"}-vacancies`)
            .then(res => {
                this.props.toggleLoading();
                this.setState({allVacancies: res.data})
            })
            .catch(() => {
                this.props.toggleLoading();
                this.props.showModal(["Oops", "Something went wrong", "Please try again"])
            })
    };

    render(){
        let chief = false;
        if (this.props.user && this.props.user.chief){
            chief = true;
        }
        let style = "black";
        let text = "Filled";
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
                    <ManyVacancies admin={chief} {...this.state}/>
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