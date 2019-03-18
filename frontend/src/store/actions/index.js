
import {
    FETCH_USER,
    MENU_SHOWN,
    CLOSE_MENU,
    TOGGLE_LOADING
} from "./types";

import axios from 'axios';

// function to sign in
export const fetchUser = () => dispatch => {
    axios.get("/api/logged-user").then(response => {
        dispatch({type: FETCH_USER, payload: response.data})
    })
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
 
