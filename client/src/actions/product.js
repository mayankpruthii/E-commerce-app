import {
	PRODUCTS_GET,
	PRODUCTS_GET_IN_PROGRESS,
	PRODUCT_GET_SINGLE,
	PRODUCT_ERROR,
	PRODUCT_CLEAR_ERROR,
	PRODUCT_DELETE,
	PRODUCT_CAT_ERROR,
	PRODUCT_CAT_GET,
	PRODUCT_CAT_ADD_SUCCESS,
	PRODUCT_CAT_CLEAR_ERROR,
} from ".";

// get product actions
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

// errors
export function productError(error) {
	return {
		type: PRODUCT_ERROR,
		payload: error,
	};
}

export function clearError() {
	return {
		type: PRODUCT_CLEAR_ERROR,
	};
}

// categories actions
export function getCategoriesSuccess(categories) {
	return {
		type: PRODUCT_CAT_GET,
		payload: categories,
	};
}

export function categoriesError(error) {
	return {
		type: PRODUCT_CAT_ERROR,
		payload: error,
	};
}

export function clearCategoriesError() {
	return {
		type: PRODUCT_CAT_CLEAR_ERROR,
	};
}

// admin only product actions
export function deleteProduct(prodIndex) {
	return {
		type: PRODUCT_DELETE,
		payload: prodIndex,
	};
}

// admin only category actions
export function addCategorySuccess(category) {
	return {
		type: PRODUCT_CAT_ADD_SUCCESS,
		payload: category,
	};
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

// categories api calls
export function getAllCategoriesApi() {
	return async (dispatch) => {
		const axios = require("axios");
		const { routes } = require("../utils/url");
		const url = routes.category.getAll;
		try {
			dispatch(clearCategoriesError());
			const response = await axios.get(url);
			console.log("RESPONSE", response.data);
			if (response.data.ok) {
				// if (response.data.categories.length === 0) {
				// 	return dispatch(categoriesError("No categories found!"));
				// }
				return dispatch(getCategoriesSuccess(response.data.categories));
			}
		} catch (error) {
			console.log(error)
			if (error.response) {
				dispatch(categoriesError(error.response.data.message));
				return;
			}
			dispatch(categoriesError("Couldn't get categories"));
		}
	};
}

// admin only product api calls
export function deleteProductApi(prodId, prodIndex) {
	return async (dispatch) => {
		const axios = require("axios");
		const { routes } = require("../utils/url");
		const url = routes.admin.delete;
		try {
			const response = axios.delete(url(prodId), {
				withCredentials: true,
			});
			if (response.data.ok) {
				return dispatch(deleteProduct(prodIndex));
			} else {
				return dispatch(productError("Couldn't delete product"));
			}
		} catch (error) {
			if (error.response) {
				dispatch(productError(error.response.data.message));
				return;
			}
			dispatch(productError("Couldn't delete products"));
		}
	};
}

// admin only category api calls
export function addCategoryApi(category) {
	return async (dispatch) => {
		const axios = require("axios");
		const { routes } = require("../utils/url");
		const url = routes.admin.category.add;
		try {
			const response = await axios.post(
				url,
				{ category },
				{ withCredentials: true }
			);
			if (response.data.ok) {
				return dispatch(addCategorySuccess(category));
			}
			return dispatch(categoriesError("Unable to add category!"));
		} catch (error) {
			if (error.response) {
				dispatch(categoriesError(error.response.data.message));
				return;
			}
			dispatch(categoriesError("Unable to add category!"));
		}
	};
}
