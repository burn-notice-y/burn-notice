import React from 'react';
import PropTypes from 'prop-types';
import DescriptionContainer from "../Partials/DescriptionContainer";
import TeamSelect from "../Partials/TeamSelect";

const ReportsPage2 = (props) => {
    console.log(props);
    return (
        <div className="page2">
            <DescriptionContainer inputHandler={props.inputHandler} description={props.description}
                                  primaryTeamActions={props.primaryTeamActions} secondaryTeamActions={props.secondaryTeamActions}
            />
            <TeamSelect {...props}
            />
        </div>
    )
};

ReportsPage2.propTypes = {
    inputHandler: PropTypes.func,
    description: PropTypes.string,
    primaryTeamActions: PropTypes.string,
    secondaryTeamActions: PropTypes.string,
    searchFirefighters: PropTypes.func,
    addFiremanToTeam: PropTypes.func,
    primaryTeam: PropTypes.array,
    secondaryTeam: PropTypes.array,
    team: PropTypes.string,
    searchResult: PropTypes.array,
    search: PropTypes.string,
};

export default ReportsPage2;