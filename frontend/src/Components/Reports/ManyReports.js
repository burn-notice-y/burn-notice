import React, { Fragment } from 'react';
import Report from "./Report";
import PropTypes from "prop-types";
import EmptyDisplay from "../EmptyDisplay";

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
                <EmptyDisplay items={data} name={"reports"} variant="h4"/>
            </Fragment>
        )
};

ManyReports.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    show: PropTypes.bool,
};

export default ManyReports;