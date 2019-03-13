
import {
    FETCH_USER,
    MENU_SHOWN,
    CLOSE_MENU,
    TOGGLE_LOADING
} from "./types";

// function to sign in
export const fetchUser = () => dispatch => {
        dispatch({type: FETCH_USER, payload: {id: 1, chief: true, lastName: "Butt"}})
};
export const toggleMenu = () => dispatch => {
    dispatch({type: MENU_SHOWN})
};
export const closeMenu = () => dispatch => {
    dispatch({type: CLOSE_MENU})
};
export const toggleLoading = () => dispatch => {
    dispatch({type: TOGGLE_LOADING})
};
 
