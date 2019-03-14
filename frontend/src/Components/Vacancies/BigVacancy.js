import React, { Component } from 'react';
import vacancy from '../../data/bigVacancy';
import Typography from "@material-ui/core/Typography/Typography";
import Vacancy from "./Vacancy";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";



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


        let fillDate = () => {
            if(vacancy.fillDate === "9999") {
                return "Open";
            }
        };



        let temporary = "";
        vacancy.temporary ? temporary = "Yes" : temporary = "No";
        let role = "";
        vacancy.engine ? role = "Engine" : role = "Truck";

        console.log(vacancy.fireStation.currentCrew);

        // let mappedCrew = vacancy.fireStation.

        return (


            <Card className={"vacancy-cont"}>
                <CardContent>
                    <div className="vacancy-header-cont" className="card-size">
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
                    <Typography variant="h5" component="h2" gutterBottom>
                         Current Crew: {vacancy.fireStation.currentCrew[0].firstName}
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Post Date: {vacancy.postDate}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Fill Date: {fillDate()}
                    </Typography>
                </CardContent>
            </Card>

        )
    }
}
export default BigVacancy;