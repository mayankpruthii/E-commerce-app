import {
	PRODUCTS_GET,
	PRODUCTS_GET_IN_PROGRESS,
	PRODUCT_GET_SINGLE,
	PRODUCT_ERROR,
	PRODUCT_CLEAR_ERROR,
} from ".";

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

// products api calls
export function getProducts(pageNo) {
	return async (dispatch) => {
		dispatch(gettingProductInProgress());
		const { routes } = import("../utils/url");
		const axios = import("axios");
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
		const { routes } = import("../utils/url");
		const axios = import("axios");
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
