import React from 'react';
import FirefighterInd from "./FirefighterInd";
import '../../../css/FireSearchCont.css';
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

const FirefighterSearchCont = props => {
    let clear = null;
    if (props.searchResult.length !== 0){
        clear = (
            <div className="clear">
                <IconButton aria-label="Search" onClick={props.clearSearch}>
                    Clear
                    <ClearIcon/>
                </IconButton>
            </div>
        )
    }
    return (
        <div className="fireman-search-cont">
            <div className="results">
                {props.searchResult.map(firefighter => <FirefighterInd addFunction={props.addFunction} team={props.team}
                                                                       key={firefighter.id} {...firefighter}/>)}
            </div>
            {clear}
        </div>
    );
}

FirefighterSearchCont.propTypes = {
    searchResult: PropTypes.array,
    addFunction: PropTypes.func,
    team: PropTypes.string
};

export default FirefighterSearchCont;