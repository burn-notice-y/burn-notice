
import {
    FETCH_USER,
    MENU_SHOWN,
    CLOSE_MENU,
    TOGGLE_LOADING,
    SHOW_POPUP,
    CLOSE_POPUP,
    SHOW_MODAL,
    CLOSE_MODAL
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
export const showPopup = message => dispatch => {
    dispatch({type: SHOW_POPUP, payload: message})
};
export const closePopup = () => dispatch => {
    dispatch({type: CLOSE_POPUP})
};
export const showModal = messages => dispatch => {
    dispatch({type: SHOW_MODAL, payload: messages})
};
export const closeModal = () => dispatch => {
    dispatch({type: CLOSE_MODAL})
};

 
