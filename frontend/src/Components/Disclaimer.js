import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";

const Disclaimer = () => (
    <div className={"disclaimer-cont"}>
        <div className="disclaimer-header">
            <Typography variant={"h4"} component={"h3"}>
                Disclaimer
            </Typography>
        </div>
        <div className="content">
            <div className="content-cont">
                <Typography variant={"body1"}>
                    We are in no way affiliated with the San Antonio Fire Department. This is a school project in collaboration with CivTech, in hopes that the fire department likes what they see, and may try to implement this in the future.
                </Typography>
            </div>
        </div>
    </div>
);

export default Disclaimer;
