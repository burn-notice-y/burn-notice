import React, {Component, Fragment} from 'react';
import Report from "./Report";
import Typography from "@material-ui/core/Typography/Typography";



class ManyReports extends Component {

    render() {
        // this is mapping thru the report object and going thru each report. the ...report is called a spread operator
        let display = null;
        if (this.props.show) {
            display = (
                <div className="report-cont">
                    <div className="report-header">
                        <Typography component="h3" variant="h3" gutterBottom>
                            Reports
                        </Typography>
                    </div>
                    <div className="report-content">

                        {this.props.data.map(report => <Report key={report.id} test={"test"} {...report}/>)}
                    </div>
                </div>
            )
        }
        return (
            <Fragment>
                {display}
            </Fragment>
        )

    }
}

export default ManyReports;