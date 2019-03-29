import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem, TextField} from "@material-ui/core";
import {reportCategories} from "../../../data/categories";
import DatePickClass from "../../DatePickClass";
import TimePick from "../../TimePick";
import TwoOptionSelect from "../../TwoOptionSelect";
import Typography from "@material-ui/core/Typography/Typography";

const ReportPage1 = ({ inputHandler, reportType, chemicals, fireRetardant, createDate, timeDispatched, timeArrived, dateHandler }) => {
    return (
        <div className="page-1">
            <Typography variant="subheading" component="p">
                Incident Details:
            </Typography>
            <div className="report-cat">
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

                        <DatePickClass labelDisplay={"Incident Date"} handleChange={dateHandler}
                                       argumentName={"createDate"} value={createDate}/>
                    </div>
                </div>

            </div>

            <div className="time">
                <div className="time1-cont">
                    <TimePick value={timeDispatched} label={"Time Dispatched"} helperText={"Format: XX:XX"}
                              changeHandler={dateHandler} argument={"timeDispatched"}/>
                </div>
                <div className="time2-cont">
                    <TimePick value={timeArrived} label={"Time Arrived"} helperText={"24hr time"}
                              changeHandler={dateHandler} argument={"timeArrived"}/>
                </div>
            </div>
            <div className="radio">
                <TwoOptionSelect title={"Exposure to Chemicals?"} value={chemicals}
                                 inputHandler={inputHandler} className={"page-1-radio"}
                                 oneVal={"true"} oneName={"Yes"} twoVal={"false"} twoName={"No"}
                                 argument={"chemicals"}
                />
                <TwoOptionSelect title={"Fire Retardant Present?"} value={fireRetardant}
                                 argument={"fireRetardant"} className={"page-1-radio"}
                                 inputHandler={inputHandler} oneName={"Yes"} oneVal={"true"} twoName={"No"}
                                 twoVal={"false"}
                />
            </div>

        </div>
    );
}

ReportPage1.propTypes = {
    inputHandler: PropTypes.func,
    reportType: PropTypes.number,
    chemicals: PropTypes.string,
    fireRetardant: PropTypes.string,
    dateHandler: PropTypes.func,
};

export default ReportPage1;