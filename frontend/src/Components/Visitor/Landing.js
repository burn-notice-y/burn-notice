import React, { Component } from 'react';
import '../../css/Landing.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import CardDesign from "../CardDesign";
import Divider from "@material-ui/core/Divider/Divider";
import vacancyImage from '../../assets/images/vacancy.jpeg';
import transferImage from '../../assets/images/transfers.jpg';
import reportImage from '../../assets/images/reports-1065.png';
import HeartRate from "../HeartRate";

class Landing extends Component {

    componentDidMount() {
        this.props.fetchUser()
    }

    render() {
    let reportInfo = (
        <ul>
            <li>Easily file reports from anywhere</li>
            <li>Associate responders with the presence of deadly chemicals</li>
        </ul>
    );
    let vacancyInfo = (
        <ul>
            <li>Apply from anywhere, anytime</li>
            <li>Get real time rosters of the station's current crew</li>
        </ul>
    );
    let transferInfo = (
        <ul>
            <li>Email notifications when your application status changes</li>
            <li>Automatically updating assignment history upon transfer</li>
        </ul>
    );
        return (
            <div className={"landing-cont"}>
                <div className="landing-header-cont">
                        <Typography component="h2" variant="h2" gutterBottom style={{zIndex: 100}}>
                            Burn Notice
                        </Typography>
                    <div className="heart-rate-cont">
                        <HeartRate/>
                    </div>
                 </div>
                <Divider className={"landing-divider"}/>
                <div className="mobile-info">
                    <Typography variant="body1" component="p">
                        An efficient, yet user friendly portal for the San Antonio Fire Department to track internal vacancies and file reports
                    </Typography>
                </div>
                <div className={"landing-card-content-cont"}>
                    <div className={"landing-card-cont"}>
                        <CardDesign image={reportImage} altText={"Report"} content={reportInfo} title={"Reports"}/>
                        <CardDesign image={vacancyImage} altText={"Vacancy"} content={vacancyInfo} title={"Vacancies"}/>
                        <CardDesign image={transferImage} altText={"Transfers"} content={transferInfo} title={"Transfers"}/>
                    </div>
                </div>
                <Divider className={"landing-divider"}/>
                <div className="landing-actions">
                    <div className="get-started" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Link to={"/visitor/register"}>
                            <Button color={"primary"} variant={"contained"} fullWidth>Get Started</Button>
                        </Link>
                    </div>
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
