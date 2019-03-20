import React, {Component} from 'react';
import Report from "./Report";
import reports from '../../data/reports';
import Typography from "@material-ui/core/Typography/Typography";



class ManyReports extends Component {

    render() {
        console.log(reports)

        return(
            <div className="report-cont">
                <div className="report-header">
                    <Typography component="h3" variant="h3" gutterBottom>
                        Reports
                    </Typography>
                </div>
                <div className="report-content">
                    {reports.map(report =>{
                        console.log("happening");
                        return (
                     <Report key={report.id} test={"test"} {...report}/>
                        )
                    })}
                </div>
            </div>

        )
    }
}

export default ManyReports;