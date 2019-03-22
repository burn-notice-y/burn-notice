import React, { Component } from 'react';
import '../css/Landing.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

class Landing extends Component {

    componentDidMount(){
        this.props.fetchUser()
    }

    render(){
        let greeting = null;
        if (this.props.user){
            greeting = (
                <div className="greeting">
                    <Typography component="h3" variant="h5">
                        Welcome, {this.props.user.firstName}
                    </Typography>
                </div>
            )
        } else if (this.props.user === null ){
            greeting = null;

        } else {
            greeting = (
                <div className="action-info-cont">
                    <Link to={"/user/register"}><Button variant="contained" color="primary" className={"landing-button"}>
                        Create an Account
                    </Button>
                    </Link>
                </div>
            )
        }
        return (
            <div className="full-cont">
                <div className="landing-cont">
                    <div className="landing-header-cont">
                        <Typography component="h2" variant="h2" gutterBottom>
                            Burn Notice
                        </Typography>
                    </div>
                    <div className="landing-info-cont">
                        <Typography component="p" gutterBottom>
                            An efficient, yet user friendly portal for the members of the San Antonio Fire Department to track all of their HR needs
                        </Typography>
                    </div>
                    {greeting}

                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};
export default connect(mapStateToProps, actions)(Landing);