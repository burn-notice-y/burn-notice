import React from 'react';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import moment from 'moment';

const Assignment = props => {
    let role = "Truck";
    if (props.engine){
        role = "Engine"
    }

    let startDate = moment(props.startDate).format('MMMM Do YYYY');
    let endDate = "Open";
    if (props.endDate !== "9999"){
        endDate = moment(props.endDate).format('MMMM Do YYYY');
    }
    return (
        <Card className={"assignment"}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Role: {role}
                </Typography>
                <Typography variant="h5" component="h2">
                    Station: {props.station.code}
                </Typography>
                <Typography color="textSecondary" className={"assignment-dates"}>
                    Dates of Assignment:
                </Typography>
                <Typography component="p" className={"date"}>
                    Start: {startDate}
                </Typography>
                <Typography component="p" className={"date"}>
                    End: {endDate}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default Assignment