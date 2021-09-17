import {
	USER_ADDRESS_UPDATE_OR_ADD,
	USER_UPDATE_ERROR,
} from ".";

// this file contains actions for user object in auth reducer

// action -> reducer calls
export function addUpdateUserAddress(address) {
	return {
		type: USER_ADDRESS_UPDATE_OR_ADD,
		payload: { address },
	};
}

export function userUpdateError(error) {
	return {
		type: USER_UPDATE_ERROR,
		error,
	};
}


// api calls
export function updateUser(data, fieldUpdated) {
	return async (dispatch) => {
		const axios = require("axios");
		const { routes } = require("../utils/url");
		const url = routes.user.updateCurrentUser;
		console.log(data);
		try {
			const response = await axios.put(url, data, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.data.ok) {
				switch (fieldUpdated) {
					case "address":
						dispatch(
							addUpdateUserAddress(response.data.user.address)
						);
						break;
					default:
						dispatch(userUpdateError("Updated"));
				}
			}
		} catch (error) {
			if (error.response) {
				dispatch(userUpdateError(error.response.data.message));
				return;
			}
			dispatch(userUpdateError("Update failed!"));
		}
	};
}
