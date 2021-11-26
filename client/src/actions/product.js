import {
	PRODUCTS_GET,
	PRODUCTS_GET_IN_PROGRESS,
	PRODUCT_GET_SINGLE,
	PRODUCT_ERROR,
	PRODUCT_CLEAR_ERROR,
	PRODUCT_DELETE,
	PRODUCT_ADD,
	PRODUCT_SUCCESS_CLEAR,
	PRODUCT_CAT_ERROR,
	PRODUCT_CAT_GET,
	PRODUCT_CAT_ADD_SUCCESS,
	PRODUCT_CAT_CLEAR_ERROR,
	PRODUCT_CAT_UPDATE_SUCCESS,
	PRODUCT_CAT_DELETE_SUCCESS,
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

export function productSuccessClear() {
	return {
		type: PRODUCT_SUCCESS_CLEAR,
	};
}

export function addProduct(product) {
	return {
		type: PRODUCT_ADD,
		payload: product,
	};
}

// admin only category actions
export function addCategorySuccess(category) {
	return {
		type: PRODUCT_CAT_ADD_SUCCESS,
		payload: category,
	};
}

export function updateCategorySuccess(categoryId, category) {
	return {
		type: PRODUCT_CAT_UPDATE_SUCCESS,
		payload: {
			categoryId,
			category,
		},
	};
}

export function deleteCategorySuccess(categoryId) {
	return {
		type: PRODUCT_CAT_DELETE_SUCCESS,
		payload: categoryId,
	};
}

// products api calls
export function getProducts(pageNo) {
	return async (dispatch) => {
		dispatch(clearError());
		dispatch(productSuccessClear())
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
		dispatch(clearError());
		dispatch(productSuccessClear())
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
		dispatch(clearError());
		dispatch(productSuccessClear())
		const axios = require("axios");
		const { routes } = require("../utils/url");
		const url = routes.category.getAll;
		try {
			dispatch(clearCategoriesError());
			const response = await axios.get(url);
			console.log("RESPONSE", response.data);
			if (response.data.ok) {
				if (response.data.categories.length === 0) {
					return dispatch(categoriesError("No categories found!"));
				}
				return dispatch(getCategoriesSuccess(response.data.categories));
			}
		} catch (error) {
			console.log(error);
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

export function addProductApi(product) {
	return async (dispatch) => {
		const axios = require("axios");
		const { routes } = require("../utils/url");
		// urls for 3 routes
		const addProductUrl = routes.admin.product.add;
		const assignCategoriesUrl = routes.admin.category.assignToProducts;
		const photoUploadUrl = routes.admin.product.photoUpload;
		// response for 3 routes
		let addProdResponse = "";
		let assignCategoriesResponse = "";
		let photoUploadRes = "";
		try {
			const body = {
				title: product["title"],
				description: product["description"],
				maxRetailPrice: product["maxRetailPrice"],
				discount: product["discount"],
				stock: product["stock"],
			};
			dispatch(clearError());
			addProdResponse = await axios.post(addProductUrl, body, {
				withCredentials: true,
			});
			if (!addProdResponse.data.ok) {
				return dispatch(productError("Product couldn't be created!"));
			}
			if (product.categories.length !== 0) {
				const assignCategoriesBody = {
					categories: product.categories,
				};
				assignCategoriesResponse = await axios.post(
					assignCategoriesUrl(addProdResponse.data.product._id),
					assignCategoriesBody,
					{
						withCredentials: true,
					}
				);
				if (!assignCategoriesResponse.data.ok) {
					return dispatch(
						productError(
							"Product was created but categories couldn't be assigned. Please reload and edit the product from the list manually!"
						)
					);
				}
			}
			if (product.photo) {
				let formData = new FormData();
				formData.append("productPhoto", product.photo);
				formData.append("productId", addProdResponse.data.product._id);
				photoUploadRes = await axios.post(photoUploadUrl, formData, {
					withCredentials: true,
					headers: {
						"content-type": "multipart/form-data",
					},
				});
				if (photoUploadRes.data.ok) {
					return dispatch(addProduct(photoUploadRes.data.product));
				}
				dispatch(productError(photoUploadRes.data.message));
			}
		} catch (error) {
			console.log(error);
			if (error.response) {
				dispatch(productError(error.response.data.message));
				return;
			}
			dispatch(productError("There was a problem in adding product!"));
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
				return dispatch(addCategorySuccess(response.data.category));
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

export function updateCategoryApi(categoryId, category) {
	return async (dispatch) => {
		const axios = require("axios");
		const { routes } = require("../utils/url");
		const url = routes.admin.category.update;
		try {
			// const body = JSON.stringify({ category });
			const response = await axios.put(
				url(categoryId),
				{ category },
				{
					withCredentials: true,
				}
			);
			if (response.data.ok) {
				return dispatch(updateCategorySuccess(categoryId, category));
			}
			return dispatch(categoriesError("Unable to update category!"));
		} catch (error) {
			if (error.response) {
				dispatch(categoriesError(error.response.data.message));
				return;
			}
			dispatch(categoriesError("Unable to update category!"));
		}
	};
}

export function deleteCategoryApi(categoryId) {
	return async (dispatch) => {
		const axios = require("axios");
		const { routes } = require("../utils/url");
		const url = routes.admin.category.delete;
		try {
			// const body = JSON.stringify({ category });
			const response = await axios.delete(url(categoryId), {
				withCredentials: true,
			});
			if (response.data.ok) {
				return dispatch(deleteCategorySuccess(categoryId));
			}
			return dispatch(categoriesError("Unable to delete category!"));
		} catch (error) {
			if (error.response) {
				dispatch(categoriesError(error.response.data.message));
				return;
			}
			dispatch(categoriesError("Unable to delete category!"));
		}
	};
}
