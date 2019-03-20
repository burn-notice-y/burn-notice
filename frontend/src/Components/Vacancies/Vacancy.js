import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import '../../css/Vacancy.css';
import PropTypes from 'prop-types';


class Vacancy extends Component {

    determineAdmin = () => {
        if (this.props.admin) {
            return (
                <div className="delete-cont">
                    <IconButton aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        }
    };

    render() {

        let temporary = "";
        this.props.temporary ? temporary = "Yes" : temporary = "No";
        let role = "";
        this.props.engine ? role = "Engine" : role = "Truck";


        return (
            <Card className={"vacancy-cont"}>
                <CardContent>
                    <div className="vacancy-header-cont">
                        <div className="vacancy-header">
                            <Typography variant="h5" component="h2">
                                Station {this.props.fireStation.code}
                            </Typography>
                        </div>
                        {this.determineAdmin()}
                    </div>
                    <Typography color="textSecondary" gutterBottom>
                        Role: {role}
                    </Typography>
                    <Typography color="textSecondary">
                        Temporary: {temporary}
                    </Typography>
                </CardContent>
                <CardActions className={"vacancy-actions-cont"}>
                    <Link to={`/transfer/create/${this.props.id}`}><Button size="small">See more</Button></Link>
                </CardActions>
            </Card>
        )
    }
}

Vacancy.propTypes = {
    admin: PropTypes.bool
};
export default Vacancy;