import { Types } from '../constants/actionTypes';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return Object.assign({}, state, {
                isLoggedIn: true,
                token: action.payload.token,
                profileImage: action.payload.profileImage,
                mobile: action.payload.mobile,
                email: action.payload.email,
                username: action.payload.username,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName
            });

        case Types.ADD_USER:
            return {
                ...state,
                user: action.payload.user,
                formSubmitted: false // after update user formsubmition reset
            }
        case Types.UPDATE_USER:
            return {
                ...state,
                user: action.payload.user,
                formSubmitted: false // after update user formsubmition reset
            }
        case Types.UPDATE_PROFILE_PICTURE:
            return {
                ...state,
                user: {
                    ...state.user,
                    profileImage: action.payload.image
                }
            }
        case Types.FORM_SUBMITION_STATUS:
            return {
                ...state,
                formSubmitted: action.payload.status
            }
        case Types.LOGOUT: {
            return Object.assign({}, state, {
                showLoginPage: false,
                isLoggedIn: false,
                token: null,
                profileImage: null,
                mobile: null,
                email: null,
                username: null,
                firstName: null,
                lastName: null
            });
        }
        case Types.TOGGLE_LOGIN_SCREEN:
            return {
                ...state, showLoginPage: !state.showLoginPage
            }
        case Types.GET_TOKEN:
            return state.token;

        default:
            return state;
    }
}

export default userReducer;