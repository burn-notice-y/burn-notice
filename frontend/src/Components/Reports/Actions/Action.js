import React, { Component, Fragment } from 'react';
import {Button} from "@material-ui/core";
import { Link } from 'react-router-dom';


class Action extends Component {

    linkOrSubmit = pageStatus => {
        switch (pageStatus) {
            case "1":
                return <Link to={"/reports/create/2"}><Button color="primary" variant="contained">Next</Button></Link>;
            case "3":
                return (
                    <div className={"multi-action-cont"}>
                        <Link to={`/reports/create/${Number(pageStatus) - 1}`}><Button variant="contained" color="default">Previous</Button></Link>
                        <Button variant="contained" color="primary">Submit</Button>
                    </div>
                );
            default:
                return  (
                    <div className={"multi-action-cont"}>
                        <Link to={`/reports/create/${Number(pageStatus) - 1}`}><Button variant="contained" color="default">Previous</Button></Link>
                        <Link to={`/reports/create/${Number(pageStatus) + 1}`}><Button variant="contained" color="primary">Next</Button></Link>
                    </div>
                );

        }
    };

    render() {
        return (
            <Fragment>
                {this.linkOrSubmit(this.props.page)}
            </Fragment>
        );
    }
}

export default Action