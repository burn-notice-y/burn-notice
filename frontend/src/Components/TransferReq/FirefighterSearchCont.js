import React, { Component } from 'react';
import FirefighterInd from "./FirefighterInd";
import '../../css/FireSearchCont.css';

class FirefighterSearchCont extends Component{
    render(){
        return (
            <div className="fireman-search-cont">
                {this.props.searchResult.map(firefighter => <FirefighterInd addFunction={this.props.addFunction} key={firefighter.id} {...firefighter}/>)}
            </div>
        )
    }
}

export default FirefighterSearchCont;