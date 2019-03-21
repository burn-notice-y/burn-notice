import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from '@material-ui/core/Button';
import vacancy from "../../data/bigVacancy";
import ManyFirefighters from "../Firefighters/ManyFirefighters";
import moment from 'moment';
// import "../../css/Firefighter.css"
import MenuItem from "@material-ui/core/MenuItem";
import {reportCategories} from "../../data/categories";
import "../../css/TransferReq.css"







class ViewTransferReq extends Component{



    inputHandler = type => event => {
            this.setState({
                [type]: event.target.value
            })
    };

    render(){
        return (
            <div className="viewTransfer">
                <TextField
                    id="outlined-select-Station"
                    select
                    label="Choose a Station"
                    value={"station"}
                    onChange={this.inputHandler('station')}

                    variant="outlined"
                >
                    {reportCategories.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        );

    }

};


export default ViewTransferReq;