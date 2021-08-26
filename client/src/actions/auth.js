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
	USER_LOGOUT,
} from ".";
import { getCookie, removeCookies } from "../utils";

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

export function userLogoutSuccess() {
	return {
		type: USER_LOGOUT
	}
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
			const response = await axios.post(url, data, {
				withCredentials: true,
			});
			if (response.data.ok) {
				dispatch(userLoginSuccess(response.data.user));
			} else {
				dispatch(userLoginFail("There was a critical error"));
			}
		} catch (error) {
			dispatch(userLoginFail(error.response.data.message));
		}
		return;
	};
}

export function userSignup(data) {
	return async (dispatch) => {
		dispatch(userSignupInProgress());
		const { routes } = require("../utils/url");
		const url = routes.user.auth.signup;
		try {
			const response = await axios.post(url, data, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.data.ok) {
				dispatch(userSignupSuccess(response.data.user));
			} else {
				dispatch(userSignupFail("There was a critical error"));
			}
		} catch (error) {
			console.log(error);
			if (error.response) {
				dispatch(userSignupFail(error.response.data.message));
				return;
			}
			dispatch(userSignupFail("There was a critical error"));
		}
	};
}

export function getLoggedInUser() {
	return async (dispatch) => {
		dispatch(userLoginInProgress());
		const { routes } = require("../utils/url");
		const url = routes.user.getCurrentUser;
		try {
			const response = await axios.get(url, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.data.ok) {
				dispatch(userLoginSuccess(response.data.user));
				return;
			} else {
				removeCookies();
				dispatch(userLoginFail("You have been logged out!"));
				return;
			}
		} catch (error) {
			if (error.response) {
				dispatch(userSignupFail(error.response.data.message));
				return;
			}
			dispatch(userSignupFail("There was a critical error"));
		}
	};
}

export function userLogout() {
	return async (dispatch) => {
		if(!getCookie("is_logged_in")) {
			return;
		}
		const {routes} = require("../utils/url");
		const url = routes.user.auth.logout;
		try {
			const response = await axios.get(url, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json"
				}
			})
			console.log(response.data);
			if(response.data.ok) {
				dispatch(userLogoutSuccess());
				return;
			}
		} catch (error) {
			if(error.response) {
				return;
			}
		}
	};
}
