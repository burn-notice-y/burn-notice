import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem, TextField} from "@material-ui/core";
import {reportCategories} from "../../../data/categories";
import DatePickClass from "../../DatePickClass";
import TimePick from "../../TimePick";
import TwoOptionSelect from "../../TwoOptionSelect";
import Typography from "@material-ui/core/Typography/Typography";

const ReportPage1 = ({ inputHandler, reportType, chemicals, fireRetardant, createDate }) => (
    <div className="page-1">
        <Typography variant="subheading" component="p">
            Incident Details:
        </Typography>
        <div className="vacancy-cat reg-input">
            <div className="report-group">
                <TextField
                    id="report-dropdown"
                    select
                    label="Type of Report"
                    value={reportType}
                    onChange={inputHandler('reportType')}
                    margin="normal"
                    variant="outlined"
                    className={"report-dropdown"}
                >
                    {reportCategories.map((option, index) => (
                        <MenuItem key={option} value={index + 1}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <div className="reg-input">

                    <DatePickClass labelDisplay={"Incident Date"} handleChange={inputHandler} argumentName={"createDate"} value={createDate}/>
                </div>
            </div>

        </div>

        <div className="time">
            <div className="time1-cont">
                <TimePick label={"Time Dispatched"} helperText={"Format: XX:XX"} onChange={inputHandler}/>
            </div>
            <div className="time2-cont">
                <TimePick label={"Time Arrived"} helperText={"24hr time"} onChange={inputHandler}/>
            </div>
        </div>
        <div className="radio">
            <TwoOptionSelect title={"Exposure to Chemicals?"} value={chemicals}
                             inputHandler={inputHandler('chemicals')}
                             oneVal={"true"} oneName={"Yes"} twoVal={"false"} twoName={"No"}
            />
            <TwoOptionSelect title={"Fire Retardant Present?"} value={fireRetardant}
                             inputHandler={inputHandler('fireRetardant')} oneName={"Yes"} oneVal={"true"} twoName={"No"} twoVal={"false"}
            />
        </div>

    </div>
);

ReportPage1.propTypes = {
    inputHandler: PropTypes.func,
    reportType: PropTypes.number,
    chemicals: PropTypes.string,
    fireRetardant: PropTypes.string
};

export default ReportPage1;