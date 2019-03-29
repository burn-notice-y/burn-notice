import React from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import '../../css/Vacancy.css';
import PropTypes from 'prop-types';
import moment from "moment";

const Vacancy = props => (
    <Card className={"vacancy-cont"}>
        <CardContent>
            <div className="vacancy-header-cont">
                <div className="vacancy-header">
                    <Typography variant="h5" component="h2">
                        Station {props.station.name}
                    </Typography>
                </div>
                {props.admin ? (<div className="delete-cont">
                    <IconButton aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </div>) : ""}
            </div>
            <Typography color="textSecondary" gutterBottom>
                Role: {props.engine ? "Engine" : "Truck"}
            </Typography>
            <Typography color="textSecondary">
                Temporary: {props.temporary ? "Yes" : "No"}
            </Typography>
            <Typography color="textSecondary">
                Status: {props.fillDate === "9999" ? <span style={{color: "green"}}>Open</span> : `Closed: ${moment(props.fillDate).format("MMMM Do YYYY")}`}
            </Typography>
        </CardContent>
        <CardActions className={"vacancy-actions-cont"}>
        {props.admin ? (<Link to={`/transfer/vacancy/${props.id}`}><Button size="small">See Requests</Button></Link>) : (
            <Link to={`/vacancy/apply/${props.id}`}><Button size="small">Continue</Button></Link>
        )}
            </CardActions>

    </Card>
);

Vacancy.propTypes = {
    admin: PropTypes.bool
};
export default Vacancy;