import React, { Component } from 'react';
import vacancy from '../../data/bigVacancy';
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import IconButton from "@material-ui/core/IconButton/IconButton";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import moment from 'moment';
import ManyFirefighters from '../Firefighters/ManyFirefighters';

// show all of the properties from the vacancy object

// use material UI and containers with flexbox to put them all pretty like

// give current crew as props to ManyFirefighters,
// which then maps over the array and returns a Firefighter component for each one

class BigVacancy extends Component {

    determineAdmin = () => {
        if (this.props.admin) {
            return (
                <div className="delete-cont">
                    <IconButton aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        }
    };
    render(){

        let postDate = moment(vacancy.postDate).format("MMMM Do YYYY");

        let fillDate = () => {
            if(vacancy.fillDate === "9999") {
                return "Open";
            } else {
                return (moment(vacancy.fillDate).format("MMMM Do YYYY"))
            }
        };

        let temporary = "";
        vacancy.temporary ? temporary = "Yes" : temporary = "No";
        let role = "";
        vacancy.engine ? role = "Engine" : role = "Truck";

        return (

            <Card className={"vacancy-cont"}>
                <CardContent>
                    <div className="vacancy-header-cont card-size">
                        <div className="vacancy-header">
                            <Typography variant="h5" component="h2" gutterBottom>
                                Station {vacancy.fireStation.code}
                            </Typography>
                        </div>
                        {this.determineAdmin()}
                    </div>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Role: {role}
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Temporary: {temporary}
                    </Typography>
                    <Typography variant="body1" component="h2" gutterBottom>
                        Post Date: {postDate}
                    </Typography>
                    <Typography variant="subtitle2" component="h2">
                        Fill Date: {fillDate()}
                    </Typography>
                    <ManyFirefighters/>
                </CardContent>
            </Card>

        )
    }
}
export default BigVacancy;