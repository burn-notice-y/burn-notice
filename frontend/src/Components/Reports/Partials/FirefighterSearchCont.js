import React from 'react';
import FirefighterInd from "./FirefighterInd";
import '../../../css/FireSearchCont.css';
import PropTypes from 'prop-types';

const FirefighterSearchCont = props => (
    <div className="fireman-search-cont">
        <div className="results">
            {props.searchResult.map(firefighter => <FirefighterInd addFunction={props.addFunction} team={props.team}
                                                                   key={firefighter.id} {...firefighter}/>)}
        </div>
    </div>
);

FirefighterSearchCont.propTypes = {
    searchResult: PropTypes.array,
    addFunction: PropTypes.func,
    team: PropTypes.string
};

export default FirefighterSearchCont;