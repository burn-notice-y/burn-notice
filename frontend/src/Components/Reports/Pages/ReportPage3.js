import React from 'react';
import TeamSelect from "../Partials/TeamSelect";
import Typography from "@material-ui/core/Typography/Typography";

const ReportsPage3 = props => (
    <div className="page3">
        <Typography variant="subheading" component="p">
            Team Members:
        </Typography>
        <TeamSelect {...props}
        />
    </div>
);

export default ReportsPage3;