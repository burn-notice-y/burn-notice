import React, {Component, Fragment} from 'react';
import '../css/Landing.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import CardDesign from "./CardDesign";
import Divider from "@material-ui/core/Divider/Divider";
import vacancyImage from '../assets/images/vacancy.jpeg';
import transferImage from '../assets/images/transfers.jpg';
import reportImage from '../assets/images/reports-1065.png';

class Landing extends Component {

    componentDidMount() {
        this.props.fetchUser()
    }

    render() {
        let greeting = null;
        if (this.props.user) {
            greeting = (
                <div className="greeting">
                    <Typography component="h3" variant="h5">
                        Welcome, {this.props.user.firstName}
                    </Typography>
                </div>
            )
        } else if (this.props.user === null) {
            greeting = null;

        } else {
            greeting = (
                <div className="action-info-cont">
                    <Link to={"/visitor/register"}><Button variant="contained" color="primary"
                                                           className={"landing-button"}>
                        Create an Account
                    </Button>
                    </Link>
                </div>
            )
        }
        return (
            <div className={"landing-cont"}>
                <div className="landing-header-cont">
                        <Typography component="h2" variant="h2" gutterBottom>
                            Burn Notice
                        </Typography>
                 </div>
                <Divider className={"landing-divider"}/>
                <div className={"landing-card-content-cont"}>
                    <div className={"landing-card-cont"}>
                        <CardDesign image={reportImage} altText={"Report"} content={"DO Something"} title={"Reports"}/>
                        <CardDesign image={vacancyImage} altText={"Vacancy"} content={"DO Something"} title={"Vacancies"}/>
                        <CardDesign image={transferImage} altText={"Transfer Request"} content={"DO Something"} title={"Transfer Request"}/>
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
