import React, { Component, Fragment } from 'react';
import {Button} from "@material-ui/core";
import { Link } from 'react-router-dom';


class OneOption extends Component {

    linkOrSubmit = pageStatus => {
        switch (pageStatus) {
            case "1":
                return <Link to={"/reports/create/2"}><Button color="primary" variant="contained">Next</Button></Link>;
            default:
                return <Button>Submit</Button>;
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

export default OneOption