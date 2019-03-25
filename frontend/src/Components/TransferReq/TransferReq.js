import React from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import moment from 'moment';
import '../../css/TransferReq.css';

const TransferReq = props => {
    console.log(props);
    return (
        <Card className={"transfer-card"}>
            <CardContent>
                <div className="vacancy-header-cont">
                    <div className="vacancy-header">
                        <Typography variant="h5" component="h2">
                            Station {props.vacancy.station.name}
                        </Typography>
                    </div>
                </div>
                {props.admin ? (
                    <Typography color="textSecondary" gutterBottom>
                        Applicant: {props.user.firstName} {props.user.lastName}
                    </Typography>
                ) : ""}
                <Typography color="textSecondary">
                    Sent Date: {moment(props.sentDate).format("MMMM Do YYYY")}
                </Typography>
                <Typography color="textSecondary">
                    Status: {props.status}
                </Typography>
            </CardContent>
            <CardActions className={"vacancy-actions-cont"}>
                <Link to={`/transfer/review/${props.id}`}><Button size="small">See more</Button></Link>
            </CardActions>
        </Card>
    );
}

TransferReq.propTypes = {
    id: PropTypes.number,
    sentDate: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    vacancy: PropTypes.object
};

export default TransferReq;