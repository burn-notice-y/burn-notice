import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types'; 
import Station from './Station';

const ManyStations = props => (
    <div className="stations-cont">
        <div className="station-header">
            <Typography component="h3" variant="h3" gutterBottom className={"registration-header"}>
                Peep deez Stations
            </Typography>
        </div>
        <div className="station-content">
            {props.stationList.map(station => <Station {...station}/>)}
        </div>
    </div>
)

ManyStations.propTypes = {
    stationList: PropTypes.array
}

export default ManyStations;