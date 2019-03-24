import {SHOW_POPUP, CLOSE_POPUP } from "../actions/types";

export default (state = {show: false}, action) => {
    switch (action.type){
        case SHOW_POPUP:
            return {
                show: !state.show,
                message: action.payload
            };
        case CLOSE_POPUP:
            return {show: false};
        default:
            return state
    }
}