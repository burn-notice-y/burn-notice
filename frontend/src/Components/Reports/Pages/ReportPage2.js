import React from 'react';
import PropTypes from 'prop-types';
import DescriptionContainer from "../Partials/DescriptionContainer";
import Typography from "@material-ui/core/Typography/Typography";

const ReportsPage2 = (props) => {
    return (
        <div className="page2">
            <Typography variant="subheading" component="p">
                General Description:
            </Typography>
            <DescriptionContainer inputHandler={props.inputHandler} description={props.description}
                                  primaryTeamActions={props.primaryTeamActions} secondaryTeamActions={props.secondaryTeamActions}
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