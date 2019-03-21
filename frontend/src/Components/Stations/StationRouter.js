import React from 'react';
import { Switch, Route } from 'react-router-dom';
import StationDisplay from './StationDisplay';
import BigStation from './BigStation';
import '../../css/Station.css';

const StationRouter = () => {
    return (
        <Switch>
            <Route path="/stations/all" render={() => <StationDisplay/>}/>
            <Route path="/stations/view/:id" render={() => <BigStation/>}/>
        </Switch>
    );
};

export default StationRouter;