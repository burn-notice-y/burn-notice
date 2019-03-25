import React from 'react';
import PropTypes from 'prop-types';
import DescriptionContainer from "../Partials/DescriptionContainer";
import Typography from "@material-ui/core/Typography/Typography";

const ReportsPage2 = ({inputHandler, description, teamActions}) => {
    return (
        <div className="page2">
            <Typography variant="subheading" component="p">
                General Description:
            </Typography>
            <DescriptionContainer inputHandler={inputHandler} description={description}
                                  teamActions={teamActions}
            />
        </div>
    )
};

ReportsPage2.propTypes = {
    inputHandler: PropTypes.func,
    description: PropTypes.string,
    teamActions: PropTypes.string,
};

export default ReportsPage2;