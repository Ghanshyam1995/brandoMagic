import { Types } from '../constants/actionTypes';
import { API_URL } from "../constants/API";
export const UserActions = {

    addProfile: (user) => dispatch => {
        fetch(API_URL.SIGNUP_API.URL, {
            method: 'POST', body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200) throw new Error(res);
            return res.json();
        }).then((user) => {
            return dispatch({ type: Types.LOGIN, payload: user });
        }).catch((error) => {
            console.log(error);
        })
    },

    updateProfileImage: (image) => ({ type: Types.UPDATE_PROFILE_PICTURE, payload: { image } }),

    updateProfile: (user) => ({ type: Types.UPDATE_USER, payload: { user } }),

    formSubmittionStatus: (status) => ({ type: Types.FORM_SUBMITION_STATUS, payload: { status } }),

    logout: () => dispatch => dispatch({ type: Types.LOGOUT }),

    login: (user) => dispatch => {
        fetch(API_URL.LOGIN_API.URL, {
            method: 'POST', body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 204) throw new Error(res);
            return res.json();
        }).then((user) => {
            return dispatch({ type: Types.LOGIN, payload: user });
        }).catch((error) => {
            console.log(error);
        })
    },

    toggleLoginScreen: () => dispatch => dispatch({ type: Types.TOGGLE_LOGIN_SCREEN }),
    getToken: () => dispatch => dispatch({ type: Types.GET_TOKEN })

}