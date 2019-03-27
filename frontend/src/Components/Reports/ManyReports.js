import React, {Component, Fragment} from 'react';
import Report from "./Report";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";



const ManyReports = ({ show, data}) => {
        // this is mapping thru the report object and going thru each report. the ...report is called a spread operator
        let display = null;
        if (show) {
            display = (
                <div className="report-cont">
                    <div className="report-content">
                        {data.map(report => <Report key={report.id} {...report}/>)}
                    </div>
                </div>
            )
        }
        return (
            <Fragment>
                {display}
            </Fragment>
        )
};

ManyReports.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    show: PropTypes.bool,
};

export default ManyReports;