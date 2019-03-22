import React from 'react';
import PropTypes from 'prop-types'; 
import Station from './Station';

const ManyStations = props => (

        <div className="station-content">
            {props.stationList.map(station => <Station key={station.id} {...station}/>)}
        </div>
)

ManyStations.propTypes = {
    stationList: PropTypes.array
}

export default ManyStations;