import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import Typography from "@material-ui/core/Typography/Typography";
import ManyFirefighters from "../Firefighters/ManyFirefighters";
import Fab from "@material-ui/core/Fab/Fab";
import ArrowBack from '@material-ui/icons/ArrowBack';

class BigStation extends Component {
    state = {
       station: null
    };

    componentDidMount(){
        this.props.toggleLoading();
        axios.get(`/api/one-station?id=${this.props.match.params.id}`)
            .then(res => {
                this.props.toggleLoading();
                this.setState({station: res.data})
            })
            .catch(error => {
                console.log(error);
                this.props.toggleLoading()
            })
    }

    showStation = () => {
        if (this.state.station !== null){
            let station = this.state.station;
            return (
                <div className="inside-big-station">
                    <div className="station-header">
                        <Typography component="h3" variant="h2">
                            Station: {station.name}
                        </Typography>
                    </div>
                    <div className="station-body">
                        <Typography component="h4" variant="h5">
                            Captain: {station.captain.firstName + " " + station.captain.lastName}
                        </Typography>
                        <Typography component="h4" variant="h5">
                            District: {station.district.name}
                        </Typography>
                        <Typography component="h4" variant="h5">
                            Chief: {station.district.chief.lastName}
                        </Typography>
                        <ManyFirefighters firemanList={station.currentCrew}/>
                    </div>
                </div>
            )
        }
    };

    render() {
        return (
            <div className="big-station-cont">
                {this.showStation()}
                <Fab className={"back-button"} color="primary" onClick={() => this.props.history.goBack()}>
                    <ArrowBack/>
                </Fab>
            </div>
        );
    }
}

BigStation.propTypes = {
    toggleLoading: PropTypes.func,
    match: PropTypes.any
};

export default connect(null, actions)(BigStation);