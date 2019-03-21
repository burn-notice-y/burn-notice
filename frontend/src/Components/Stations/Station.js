import React from 'react';
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import PropTypes from 'prop-types';

const Station = props => (
    <Card className="station-cont">
        <CardContent>
            <div className="vacancy-header-cont">
                <div className="vacancy-header">
                    <Typography variant="h5" component="h2">
                        Station {props.name}
                    </Typography>
                </div>
            </div>
            <Typography color="textSecondary" gutterBottom>
                District: {props.district.name}
            </Typography>
            <Typography color="textSecondary">
                Captain: {props.captain.firstName + " " + props.captain.lastName}
            </Typography>
        </CardContent>
        <CardActions className={"vacancy-actions-cont"}>
            <Link to={`/stations/view/${props.id}`}><Button size="small">See more</Button></Link>
        </CardActions>
    </Card>
);

Station.propTypes = {
    id: PropTypes.number,
    captain: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }),
    district: PropTypes.shape({
        name: PropTypes.string,
    }),
    name: PropTypes.string,
};
export default Station;