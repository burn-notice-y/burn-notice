import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import '../../css/About.css';
import karla from '../../assets/images/karla.jpeg';
import shawn from '../../assets/images/shawn.jpeg';
import aziz from '../../assets/images/aziz.jpeg';
import chris from '../../assets/images/chris.jpeg';

const About = () => {
    return (
        <div className="about-cont">
            <div className="about-header">
                <Typography component="h1" variant="h3">
                    Burn Notice
                </Typography>
            </div>
            <Divider className={"about-divider"}/>
            <div className="about-body">
                <div className="team-cont">
                    <div className="ind-team-member">
                        <img src={karla} alt=""/>
                    </div>
                    <div className="ind-team-member">
                        <img src={chris} alt=""/>
                    </div>
                </div>
                <div className="team-cont">
                    <div className="ind-team-member">
                        <img src={shawn} alt=""/>
                    </div>
                    <div className="ind-team-member">
                        <img src={aziz} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

About.propTypes = {
    
};

export default About;
