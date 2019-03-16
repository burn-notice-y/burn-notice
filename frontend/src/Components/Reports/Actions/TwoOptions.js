import React from 'react';
import Button from "@material-ui/core/Button/Button";
import { Link } from 'react-router-dom';

const TwoOptions = ({ page }) => (
    <div className={"multi-action-cont"}>
        <Link to={`/reports/create/${page - 1}`}><Button variant="contained" color="default">Previous</Button></Link>
        <Link to={`/reports/create/${page + 1}`}><Button variant="contained" color="primary">Next</Button></Link>
    </div>
);

export default TwoOptions