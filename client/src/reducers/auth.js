import {
	USER_LOGGED_IN,
	USER_LOGIN_IN_PROGRESS,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_SIGNUP_SUCCESS,
	USER_SIGNUP_FAIL,
	USER_CLEAR_ERROR,
	USER_SIGNUP_IN_PROGRESS,
} from "../actions";

const initialState = {
	isLoggedIn: false,
	user: {},
	isLoginInProgress: false,
	isSignupInProgress: false,
	error: "",
};

export default function auth(state = initialState, action) {
	switch (action.type) {
		// check if already logged in
		case USER_LOGGED_IN:
			return {
				...state,
				isLoggedIn: true,
				user: action.payload.user,
				isLoginInProgress: false,
				isSignupInProgress: false,
				error: "",
			};
		// all login reducers
		case USER_LOGIN_IN_PROGRESS:
			return {
				...state,
				isLoginInProgress: true,
				error: "",
			};
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				user: action.payload.user,
				isLoginInProgress: false,
			};
		case USER_LOGIN_FAIL:
			return {
				...state,
				user: {},
				isLoggedIn: false,
        isLoginInProgress: false,
				error: action.error,
			};
		// all signup reducers
		case USER_SIGNUP_IN_PROGRESS:
			return {
				...state,
				isSignupInProgress: true,
				error: "",
			};
		case USER_SIGNUP_SUCCESS:
			return {
				...state,
        isLoggedIn: true,
				user: action.payload.user,
				isSignupInProgress: false,
			};
		case USER_SIGNUP_FAIL:
			return {
				...state,
				user: {},
        isLoggedIn: false,
				error: action.error,
				isSignupInProgress: false,
			};
		// clear all the errors
		case USER_CLEAR_ERROR:
			return {
				...state,
				error: "",
			};
		default:
			return state;
	}
}
