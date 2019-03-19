import React, {Component} from 'react';
import allVacancies from "../../data/vacancies";
import Vacancy from "../Vacancies/Vacancy";
import PropTypes from "prop-types";
import ManyVacancies from "../Vacancies/ManyVacancies";


class ManyReports extends Component {

    render() {

        return(
            <div className="many-reports-cont">
                <div className="report-body">
                    {allVacancies.map(vacancy => <Vacancy admin={this.props.admin} key={vacancy.id} {...vacancy} />)}
                </div>
            </div>

        )
    }
}

ManyReports.propTypes = {
    admin: PropTypes.bool
};

export default ManyReports;