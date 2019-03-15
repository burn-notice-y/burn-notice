import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import BigTransfer from "./BigTransfer";
import CreateTransferReq from "./CreateTransferReq";


const TransferRouter = () => (
    <Switch>
        {/*<Route path={"/transfer/review"} render={() => <BigTransfer/>} />*/}
        <Route path={"/transfer/create"} render={() => <CreateTransferReq/>}/>
    </Switch>
);

export default TransferRouter;