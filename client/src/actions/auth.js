import axios from "axios";
import {
	USER_LOGGED_IN,
	USER_LOGIN_IN_PROGRESS,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_SIGNUP_IN_PROGRESS,
	USER_SIGNUP_SUCCESS,
	USER_SIGNUP_FAIL,
	USER_CLEAR_ERROR,
} from ".";

// check if user is logged in
export function isUserLoggedIn() {
	return {
		type: USER_LOGGED_IN,
	};
}

// action creators for logging in user
export function userLoginInProgress() {
	return {
		type: USER_LOGIN_IN_PROGRESS,
	};
}

export function userLoginSuccess(user) {
	return {
		type: USER_LOGIN_SUCCESS,
		payload: {
			user,
		},
	};
}

export function userLoginFail(error) {
	return {
		type: USER_LOGIN_FAIL,
		error,
	};
}

// action creators for user signup
export function userSignupInProgress() {
	return {
		type: USER_SIGNUP_IN_PROGRESS,
	};
}

export function userSignupSuccess(user) {
	return {
		type: USER_SIGNUP_SUCCESS,
		payload: {
			user,
		},
	};
}

export function userSignupFail(error) {
	return {
		type: USER_SIGNUP_FAIL,
		error,
	};
}

// making the api calls
export function userLogin(data) {
	return async (dispatch) => {
		dispatch(userLoginInProgress());
		const { routes } = require("../utils/url");
		const url = routes.user.auth.login;
		try {
			const response = await axios.post(url, data);
			console.log("RESPONSE", response);
			if (response.data.ok) {
				dispatch(userLoginSuccess(response.data.user));
			}
		} catch (error) {
			dispatch(userLoginFail(error.response.data.message));
		}
		return;
	};
}
