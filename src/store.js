import { createStore } from 'redux';

const initialState = {
    sidebarShow: false,
    toast: 0,
    auth: {
        isLoggedIn: false,
    },
};

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'SHOW_SIDEBAR':
            return { ...state, ...rest };
        case 'ADD_TOAST':
            return { ...state, ...rest };
        case 'REMOVE_TOAST':
            return { ...state, ...rest };
        default:
            return state;
    }
};

const store = createStore(changeState);
export default store;
