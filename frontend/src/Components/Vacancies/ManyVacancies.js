import React, { Component } from 'react';
import allVacancies from '../../data/vacancies';
import Vacancy from "./Vacancy";
import PropTypes from 'prop-types';


class ManyVacancies extends Component {
    render(){
        return (
            <div className="many-vacancies-cont">
                <div className="vacancy-body">
                    {allVacancies.map(vacancy => <Vacancy admin={this.props.admin} key={vacancy.id} {...vacancy}/>)}
                </div>
            </div>
        )
    }
}

ManyVacancies.propTypes = {
    admin: PropTypes.bool
};

export default ManyVacancies;