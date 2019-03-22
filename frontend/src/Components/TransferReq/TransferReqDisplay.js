import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import '../../css/AdminVacancy.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import ManyTransferReq from "./ManyTransferReq";
import {fireStations} from "../../data/categories";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";


// this component is the admin's view of Vacancies in their district

class TransferReqDisplay extends Component{
    // if chief is true, send chief to ManyTransferReq
    state= {
        manyTransferReq: [],
        station: ""
    };
    componentDidMount(){

    }

    fetchTransfers = () => {
        this.props.toggleLoading();
        axios.get(`/api/findTransferByStation?stationName=${this.state.station}`)
            .then(res => {
                this.props.toggleLoading();
                this.setState({manyTransferReq: res.data})
            })
            .catch(error => {
                this.props.toggleLoading();
                console.log(error)
            })
    };

    inputHandler = type => event => {
            this.setState({
                [type]: event.target.value
        })
    };

    render(){
        let chief = false;
        if (this.props.user && this.props.user.chief){
            chief = true;
        }
        return(
            <div className="view-vacancy-cont">
                <div className="view-vacancy-header">
                    <Typography variant="h5" component="h2">
                        View all Requests by Station #
                    </Typography>
                    <div className="reg-input viewTransfer">
                        <div className="stationSelect-cont">
                            <TextField
                                select
                                label="Station #"
                                value={this.state.station}
                                onChange={this.inputHandler('station')}
                                id={"station-select"}
                                variant="outlined"
                                margin="normal"
                            >
                                {fireStations.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="stationSearchButton">
                            <Button variant="contained" color="primary">
                                <div onClick={this.fetchTransfers}>
                                    Submit
                                </div>
                            </Button>
                        </div>

                    </div>
                </div>
                <div className="transferReq-cont">
                    <ManyTransferReq admin={chief} {...this.state}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};


export default connect(mapStateToProps, actions)(TransferReqDisplay);