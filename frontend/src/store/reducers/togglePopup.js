import {SHOW_POPUP, CLOSE_POPUP } from "../actions/types";

export default (state = false, action) => {
    switch (action.type){
        case SHOW_POPUP:
            return {
                show: !state,
                message: action.payload
            };
        case CLOSE_POPUP:
            return false;
        default:
            return state
    }
}