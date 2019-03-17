import React from 'react';
import FirefighterInd from "./FirefighterInd";
import '../../../css/FireSearchCont.css';
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

const FirefighterSearchCont = props => (
    <div className="fireman-search-cont">
        <div className="results">
            {props.searchResult.map(firefighter => <FirefighterInd addFunction={props.addFunction}
                                                                   key={firefighter.id} {...firefighter}/>)}
        </div>
        <div className="clear">
            <IconButton aria-label="Search" onClick={props.clearSearch}>
                Clear
                <ClearIcon/>
            </IconButton>
        </div>
    </div>
);

FirefighterSearchCont.propTypes = {
    searchResult: PropTypes.array,
    addFunction: PropTypes.func
};

export default FirefighterSearchCont;