import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import vacancy from "../../data/bigVacancy";
import moment from 'moment';
import ManyFirefighters from "../Firefighters/ManyFirefighters";
import "../../css/Transfer.css"
import Chip from '@material-ui/core/Chip';


class BigTransfer extends Component{


    render() {

        let postDate = moment(vacancy.postDate).format("MMMM Do YYYY");

        let fillDate = () => {
            if(vacancy.fillDate === "9999") {
                return <Chip label={"Open"} className={open} variant="outlined" />;
            } else {
                return (moment(vacancy.fillDate).format("MMMM Do YYYY"))
            }
        };

        let temporary = "";
        vacancy.temporary ? temporary = "Yes" : temporary = "No";
        let role = "";
        vacancy.engine ? role = "Engine" : role = "Truck";
        let open = '';
        vacancy.fillDate === "9999" ? open = "open" : open = "not open";

        return (
            <div className="transferMain">
                <Typography variant="h2" component="h2" className="reviewTransfer">
                    Review Transfer
                </Typography>
                <Typography variant="h5" component="h2" className="transferStation">
                    Station {vacancy.fireStation.code}
                </Typography>
                <Typography variant="h5" component="h2" className="transferRole">
                    Role: {role}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Temporary: {temporary}
                </Typography>
                <Typography variant="body1" component="h2" gutterBottom>
                    Post Date: {postDate}
                </Typography>
                <Typography variant="subtitle2" component="h2" className="fillDate">
                    {fillDate()}
                </Typography>

                <Typography fontWeight="fontWeightMedium">
                    Person who is applying goes here
                </Typography>
                <ManyFirefighters/>
            </div>


            // wanna see
            // who applied
            // station
            // district
            // who is currently there
        )
    }

};

export default BigTransfer;

