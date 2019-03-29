import React from 'react';
import Vacancy from "./Vacancy";
import PropTypes from 'prop-types';
import EmptyDisplay from "../EmptyDisplay";


const ManyVacancies = ({ admin, vacancies }) => (
    <div className="many-vacancies-cont">
        <div className="vacancy-body">
            {vacancies.map(vacancy => <Vacancy admin={admin} key={vacancy.id} {...vacancy} />)}
            <EmptyDisplay name={"vacancies"} variant={"h5"} items={vacancies}/>
        </div>
    </div>
);


ManyVacancies.propTypes = {
    admin: PropTypes.bool,
    vacancies: PropTypes.arrayOf(PropTypes.object)
};

export default ManyVacancies;