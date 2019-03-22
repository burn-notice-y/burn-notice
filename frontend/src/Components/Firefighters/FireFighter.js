import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import '../../css/Vacancy.css';

class FireFighter extends Component {

    render() {
        return (
            <Fragment>
                <Typography variant="subheading" component="h6">
                    {this.props.firstName} {this.props.lastName}
                </Typography>
            </Fragment>


        )
    }
}


export default FireFighter;
