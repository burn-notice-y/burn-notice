import React from'react';
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography/Typography";

const Report = props => {


        return (

            <Card className={"assignment"}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Create Date: {props.createDate}
                    </Typography>
                    <Typography component="p" className={"date"}>
                        Creator: {`${props.creator.firstName} ${props.creator.lastName}`}
                    </Typography>
                    <Typography component="p" className={"date"}>
                        Report Type: {props.type.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">View</Button>
                </CardActions>
            </Card>
        )

};


export default Report;