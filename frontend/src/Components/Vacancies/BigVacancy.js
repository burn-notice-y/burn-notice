import React, { Component } from 'react';
import vacancy from '../../data/bigVacancy';
import Typography from "@material-ui/core/Typography/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import moment from 'moment';
import ManyFirefighters from '../Firefighters/ManyFirefighters';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';







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

        let applicable = () =>
        {
            if(vacancy.fillDate === "9999")
            {
                return "Apply";
            }
            else
            {
                return "Closed";
            }
        }

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

        function ListDividers(props) {
            const {classes} = props;
        }


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
                </div>


                <Button gutterBottom variant="contained" className="vacancy-btn-color">
                    {applicable()}
                </Button>



</div>
        )
    }
}
export default BigVacancy;