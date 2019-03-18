import React, { Component } from 'react';
import firefighters from "../../data/firefighters";
import Typography from "@material-ui/core/Typography/Typography";

class FirefighterSearch extends Component {
    render(){
        return (
            <div className="ind-firefighters">
                <Typography component="p" variant="subtitle2">
                    Fireman
                </Typography>
            </div>
        )
    }
}

export default FirefighterSearch;