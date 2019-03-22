import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ManyStations from './ManyStations';
import axios from 'axios';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography/Typography";

class StationDisplay extends Component {
    state ={
        stations: []
    };

    componentDidMount(){
        this.props.toggleLoading();
        axios.get("/api/stations")
            .then(res => {
                this.props.toggleLoading();
                this.setState({
                    stations: res.data
                })
            })
            .catch(error => {
                this.props.toggleLoading();
                console.log(error)
            })
    }
    render() {
        return (
            <div className="all-stations-cont">
                    <div className="station-header">
                        <Typography component="h3" variant="h4" gutterBottom className={"registration-header"}>
                            Stations in your District
                        </Typography>
                    </div>
                <ManyStations stationList={this.state.stations}/>
            </div>
        );
    }
}


StationDisplay.propTypes = {
    toggleLoading: PropTypes.func
};

export default connect(null, actions)(StationDisplay);