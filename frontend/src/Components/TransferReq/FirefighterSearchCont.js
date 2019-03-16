import React from 'react';
import FirefighterInd from "./FirefighterInd";
import '../../css/FireSearchCont.css';
import PropTypes from 'prop-types';

const FirefighterSearchCont = props => (
    <div className="fireman-search-cont">
        {props.searchResult.map(firefighter => <FirefighterInd addFunction={props.addFunction}
                                                               key={firefighter.id} {...firefighter}/>)}
    </div>
);

FirefighterSearchCont.propTypes = {
    searchResult: PropTypes.array,
    addFunction: PropTypes.func
};

export default FirefighterSearchCont;