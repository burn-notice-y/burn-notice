import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography/Typography";

class ManyStations extends Component{
    render(){
        return (
            <div className="stations-cont">
                <div className="station-header">
                    <Typography component="h3" variant="h3" gutterBottom className={"registration-header"}>
                        Peep deez Stations
                    </Typography>
                </div>
                <div className="station-content">

                </div>
            </div>
        )
    }
}

export default ManyStations;