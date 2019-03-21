import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ManyVacancies from "../Vacancies/ManyVacancies";
import '../../css/AdminVacancy.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';


// this component is the admin's view of Vacancies in their district

class VacancyDisplay extends Component{
    // if chief is true, send chief to ManyVacancies
    state= {
        allVacancies: []
    };
    componentDidMount(){
        this.props.toggleLoading();
        axios.get("/api/all-vacancies")
            .then(res => {
                this.props.toggleLoading();
                this.setState({allVacancies: res.data})
            })
            .catch(error => {
                this.props.toggleLoading();
                console.log(error)
            })
    }

    render(){
        let chief = false;
        if (this.props.user && this.props.user.chief){
            chief = true;
        }
        return(
            <div className="view-vacancy-cont">
                <div className="view-vacancy-header">
                    <Typography variant="h5" component="h2">
                        View vacancies in your district
                    </Typography>
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


export default connect(mapStateToProps, actions)(VacancyDisplay);