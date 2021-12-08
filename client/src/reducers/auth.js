import {
	USER_LOGGED_IN,
	USER_LOGIN_IN_PROGRESS,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_SIGNUP_SUCCESS,
	USER_SIGNUP_FAIL,
	USER_CLEAR_ERROR,
	USER_SIGNUP_IN_PROGRESS,
	USER_LOGOUT,
	USER_ADDRESS_UPDATE_OR_ADD,
	USER_UPDATE_ERROR,
	USER_UPDATE_CART
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
		case USER_UPDATE_CART:
			return {
				...state,
				user: {
					...state.user,
					itemsInCart: action.payload
				}
			}
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
		case USER_LOGOUT:
			return {
				...state,
				user: {},
				isLoggedIn: false,
				error: "",
			};
		// clear all the errors
		case USER_CLEAR_ERROR:
			return {
				...state,
				isLoginInProgress: false,
				isSignupInProgress: false,
				error: "",
			};
		case USER_ADDRESS_UPDATE_OR_ADD:
			return {
				...state,
				user: {
					...state.user,
					address: action.payload.address,
				},
			};
		case USER_UPDATE_ERROR:
			return {
				...state,
				error: action.error,
			};
		default:
			return state;
	}
}
