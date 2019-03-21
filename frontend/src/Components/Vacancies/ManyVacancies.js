import React from 'react';
import Vacancy from "./Vacancy";
import PropTypes from 'prop-types';


const ManyVacancies = ({ admin, allVacancies }) => (
    <div className="many-vacancies-cont">
        <div className="vacancy-body">
            {allVacancies.map(vacancy => <Vacancy admin={admin} key={vacancy.id} {...vacancy} />)}
        </div>
    </div>
);

ManyVacancies.propTypes = {
    admin: PropTypes.bool,
    allVacancies: PropTypes.array
};

export default ManyVacancies;