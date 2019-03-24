import {SHOW_MODAL, CLOSE_MODAL} from "../actions/types";

export default (state = {shown: false}, action) => {
    switch (action.type){
        case SHOW_MODAL:
            return {
                shown: true,
                header: action.payload[0],
                body: action.payload[1],
                directions: action.payload[2]
            };
        case CLOSE_MODAL:
            return {shown: false};
        default:
            return state
    }
}