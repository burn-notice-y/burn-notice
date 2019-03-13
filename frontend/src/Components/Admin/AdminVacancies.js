import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ManyVacancies from "../Vacancies/ManyVacancies";
import '../../css/AdminVacancy.css';


// this component is the admin's view of Vacancies in their district

class AdminVacancies extends Component{
    render(){
        return(
            <div className="view-vacancy-cont">
                <div className="view-vacancy-header">
                    <Typography variant="h5" component="h2">
                        View vacancies in your district
                    </Typography>
                </div>
                <div className="vacancy-cont">
                    <ManyVacancies admin={true}/>
                </div>
            </div>
        )
    }
}
export default AdminVacancies;