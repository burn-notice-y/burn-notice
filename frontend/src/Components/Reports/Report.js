import React from'react';
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography/Typography";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

const Report = ({ createDate, creator, type, id }) => (
    <Card className={"assignment"}>
        <CardContent>
            <Typography variant="h5" component="h2">
                Create Date: {createDate}
            </Typography>
            <Typography component="p" className={"date"}>
                Creator: {`${creator.firstName} ${creator.lastName}`}
            </Typography>
            <Typography component="p" className={"date"}>
                Report Type: {type.name}
            </Typography>
        </CardContent>
        <CardActions>
            <Link to={`/reports/view/${id}`}>
                <Button size="small">View</Button>
            </Link>
        </CardActions>
    </Card>
);

Report.propTypes = {
    type: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    }),
    creator: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }),
    createDate: PropTypes.string,
};

export default Report;