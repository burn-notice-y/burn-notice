import React from 'react';
import Vacancy from "./Vacancy";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography/Typography";
import EmptyDisplay from "../EmptyDisplay";


const ManyVacancies = ({ admin, allVacancies }) => (
    <div className="many-vacancies-cont">
        <div className="vacancy-body">
            {allVacancies.map(vacancy => <Vacancy admin={admin} key={vacancy.id} {...vacancy} />)}
            <EmptyDisplay name={"vacancies"} variant={"h5"} items={allVacancies}/>
        </div>
    </div>
);


ManyVacancies.propTypes = {
    admin: PropTypes.bool,
    allVacancies: PropTypes.array
};

export default ManyVacancies;