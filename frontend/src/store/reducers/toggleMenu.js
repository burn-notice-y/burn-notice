import {CLOSE_MENU, MENU_SHOWN} from "../actions/types";

export default (state = false, action) => {
    switch (action.type){
        case MENU_SHOWN:
            return !state;
        case CLOSE_MENU:
            return false;
        default:
            return state
    }
}