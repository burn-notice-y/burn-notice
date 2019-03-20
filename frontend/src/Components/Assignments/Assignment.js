import React from 'react';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import moment from 'moment';

const Assignment = ({ engine, startDate, endDate, station }) => {
    let role = "Truck";
    if (engine){
        role = "Engine"
    }

    let beginningDate = moment(startDate).format('MMMM Do YYYY');
    let closeDate = "Open";
    if (endDate !== "9999"){
        closeDate = moment(endDate).format('MMMM Do YYYY');
    }
    return (
        <Card className={"assignment"}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Role: {role}
                </Typography>
                <Typography variant="h5" component="h2">
                    Station: {station.code}
                </Typography>
                <Typography color="textSecondary" className={"assignment-dates"}>
                    Dates of Assignment:
                </Typography>
                <Typography component="p" className={"date"}>
                    Start: {beginningDate}
                </Typography>
                <Typography component="p" className={"date"}>
                    End: {closeDate}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default Assignment

