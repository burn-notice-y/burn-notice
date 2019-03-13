import React, { Component } from 'react';
import '../css/Landing.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Landing extends Component {
    render(){
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
                    <div className="action-info-cont">
                        <Button variant="contained" color="primary" className={"landing-button"}>
                            Create an Account
                        </Button>
                    </div>
                </div>
            </div>

        )
    }
}
export default Landing;