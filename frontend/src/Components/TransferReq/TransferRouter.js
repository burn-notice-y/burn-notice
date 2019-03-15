import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BigTransfer from "./BigTransfer";


const TransferRouter = () => (
    <Switch>
        <Route path={"/transfer/review"} render={() => <BigTransfer/>} />
    </Switch>
);

export default TransferRouter;