import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ManyVacancies from "../Vacancies/ManyVacancies";
import '../../css/AdminVacancy.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';


// this component is the admin's view of Vacancies in their district

class VacancyDisplay extends Component{
    // if chief is true, send chief to ManyVacancies

    render(){
        let chief = false;
        // waits for the db to come back with a value
        if (this.props.user){
            // if they are a chief,
            if (this.props.user.chief){
                chief = true;
            }
        }
        return(
            <div className="view-vacancy-cont">
                <div className="view-vacancy-header">
                    <Typography variant="h5" component="h2">
                        View vacancies in your district
                    </Typography>
                </div>
                <div className="vacancy-cont">
                    <ManyVacancies admin={chief}/>
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