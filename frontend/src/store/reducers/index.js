import { combineReducers } from 'redux';
import fetchUser from './fetchUser';
import toggleMenu from './toggleMenu';
import toggleLoading from './toggleLoading';
import togglePopup from './togglePopup';
import toggleModal from './toggleModal';

//defines global store state
export default combineReducers({
    user: fetchUser,
    menuShown: toggleMenu,
    isLoading: toggleLoading,
    popup: togglePopup,
    modal: toggleModal
})
