import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../css/TransferReq.css';
import PropTypes from 'prop-types';

const TransferReq = (props) => {
    return (
        <Card className={"viewTransfer"}>
            <CardContent>
                <div className="vacancy-header-cont">
                    <div className="vacancy-header">
                        <Typography variant="h5" component="h2">
                            Station {props.vacancy.station.name}
                        </Typography>
                    </div>
                </div>
                <Typography color="textSecondary" gutterBottom>
                    Applicant: {props.user.firstName} {props.user.lastName}
                </Typography>
                <Typography color="textSecondary">
                    Sent Date: {props.sentDate}
                </Typography>
            </CardContent>
            <CardActions className={"vacancy-actions-cont"}>
                <Link to={``}><Button size="small">See more</Button></Link>
            </CardActions>
        </Card>
    )
};

TransferReq.propTypes = {

}

export default (TransferReq);