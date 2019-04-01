import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import '../../css/About.css';
import karla from '../../assets/images/karla.jpeg';
import shawn from '../../assets/images/shawn.jpeg';
import aziz from '../../assets/images/aziz.jpeg';
import chris from '../../assets/images/chris.jpeg';
import teamMembers from '../../data/teamMembers';
import AboutCard from "../AboutCard";

const About = () => {
    return (
        <div className="about-cont">
            <div className="about-header">
                <Typography component="h1" variant="h3" className={"about-header"}>
                    Burn Notice
                </Typography>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Divider className={"about-divider"} style={{width: "80%"}}/>
            </div>
            <div className="about-body">
                <div className="team-body">
                    {teamMembers([aziz, shawn, chris, karla]).map(member => (
                        <AboutCard email={member.email} github={member.gitHub} image={member.img} content={member.name} altText={member.name} />
                    ))}
                </div>
            </div>
        </div>
    );
};

About.propTypes = {
    
};

export default About;
