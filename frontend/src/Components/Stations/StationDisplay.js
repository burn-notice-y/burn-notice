import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ManyStations from './ManyStations';
import stationList from '../../data/stationsArray';

class StationDisplay extends Component {
    render() {
        return (
            <div className="all-stations-cont">   
                <ManyStations stationList={stationList}/>
            </div>
        );
    }
}

StationDisplay.propTypes = {

};

export default StationDisplay;