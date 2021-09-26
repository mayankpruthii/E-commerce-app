import {
	PRODUCTS_GET,
	PRODUCTS_GET_IN_PROGRESS,
	PRODUCT_GET_SINGLE,
	PRODUCT_ERROR,
	PRODUCT_CLEAR_ERROR,
	PRODUCT_DELETE,
} from ".";

// action -> reducer calls
export function gettingProductInProgress() {
	return {
		type: PRODUCTS_GET_IN_PROGRESS,
	};
}

export function getMultipleProducts(products) {
	return {
		type: PRODUCTS_GET,
		payload: products,
	};
}

export function getSingleProduct(product) {
	return {
		type: PRODUCT_GET_SINGLE,
		payload: product,
	};
}

export function productError(error) {
	return {
		type: PRODUCT_ERROR,
	};
}

export function clearError() {
	return {
		type: PRODUCT_CLEAR_ERROR,
	};
}

export function deleteProduct(prodIndex) {
	return {
		type: PRODUCT_DELETE,
		payload: prodIndex
	}
}

// products api calls
export function getProducts(pageNo) {
	return async (dispatch) => {
		dispatch(gettingProductInProgress());
		const axios = require("axios");
		const { routes } = require("../utils/url");
		const url = routes.product.get;
		try {
			const response = await axios.get(url(pageNo));
			if (response.data.ok) {
				if (response.data.products.length === 0) {
					dispatch(productError("No products found"));
					return;
				}
				dispatch(clearError());
				dispatch(getMultipleProducts(response.data.products));
				return;
			}
		} catch (error) {
			if (error.response) {
				dispatch(productError(error.response.data.message));
				return;
			}
			dispatch(productError("Error loading products"));
		}
	};
}

export function getProduct(prodId) {
	return async (dispatch) => {
		dispatch(gettingProductInProgress());
		const axios = require("axios");
		const { routes } = require("../utils/url");
		const url = routes.product.getSingle;
		try {
			const response = await axios.get(url(prodId));
			if (response.data.ok) {
				dispatch(clearError());
				dispatch(getSingleProduct(response.data.products));
				return;
			}
		} catch (error) {
			if (error.response) {
				dispatch(productError(error.response.data.message));
				return;
			}
			dispatch(productError("Error loading product"));
		}
	};
}

export function deleteProductApi(prodId, prodIndex) {
	return async (dispatch) => {
		const axios = require("axios");
		const {routes} = require("../utils/url");
		const url = routes.admin.delete;
		try {
			const response = axios.delete(url(prodId));
			if(response.data.ok) {
				return dispatch(deleteProduct(prodIndex));
			} else {
				return dispatch(productError("Couldn't delete product"));
			}
		} catch(error) {
			if (error.response) {
				dispatch(productError(error.response.data.message));
				return;
			}
			dispatch(productError("Couldn't delete products"));
		}
	}
}
