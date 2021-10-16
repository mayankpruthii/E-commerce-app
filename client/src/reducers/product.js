import {
	PRODUCT_DELETE,
	PRODUCTS_GET,
	PRODUCTS_GET_IN_PROGRESS,
	PRODUCT_CLEAR_ERROR,
	PRODUCT_ERROR,
	PRODUCT_GET_SINGLE,
	PRODUCT_ADD,
	PRODUCT_CAT_GET,
	PRODUCT_CAT_ERROR,
	PRODUCT_CAT_ADD_SUCCESS,
	PRODUCT_CAT_CLEAR_ERROR,
	PRODUCT_CAT_DELETE_SUCCESS,
	PRODUCT_CAT_UPDATE_SUCCESS,
} from "../actions";

const initialState = {
	products: [],
	categories: [],
	singleProduct: {},
	error: "",
	categoriesError: "",
	isLoadingInProgress: false,
};

export default function products(state = initialState, action) {
	switch (action.type) {
		// product reducers
		case PRODUCTS_GET_IN_PROGRESS:
			return {
				...state,
				isLoadingInProgress: true,
			};
		case PRODUCTS_GET:
			return {
				...state,
				isLoadingInProgress: false,
				products: action.payload,
			};
		case PRODUCT_GET_SINGLE:
			return {
				...state,
				isLoadingInProgress: false,
				product: action.payload,
			};

		// product errors reducers
		case PRODUCT_ERROR:
			return {
				...state,
				isLoadingInProgress: false,
				error: action.error,
			};
		case PRODUCT_CLEAR_ERROR:
			return {
				...state,
				error: "",
			};

		// categories reducers
		case PRODUCT_CAT_GET:
			return {
				...state,
				categories: action.payload,
				categoriesError: "",
			};
		case PRODUCT_CAT_ERROR:
			return {
				...state,
				categoriesError: action.payload,
			};
		case PRODUCT_CAT_CLEAR_ERROR:
			return {
				...state,
				categoriesError: "",
			};

		// admin only product reducers
		case PRODUCT_DELETE:
			let productArr = state.products.splice(action.payload, 1);
			return {
				...state,
				products: productArr,
			};
		case PRODUCT_ADD:
			return {
				...state,
				products: [action.payload, ...state.products],
			};

		// admin only category reducers
		case PRODUCT_CAT_ADD_SUCCESS:
			return {
				...state,
				categories: [...state.categories, action.payload],
			};
		case PRODUCT_CAT_UPDATE_SUCCESS:
			const index = state.categories.findIndex(
				(cat) => cat._id === action.payload.categoryId
			);
			let updatedCategoriesArr = [...state.categories];
			updatedCategoriesArr[index]["category"] = action.payload.category;
			return {
				...state,
				categories: updatedCategoriesArr,
			};
		case PRODUCT_CAT_DELETE_SUCCESS:
			const deleteIndex = state.categories.findIndex(
				(cat) => cat._id === action.payload
			);
			let deleteCategoryArr = [...state.categories];
			deleteCategoryArr.splice(deleteIndex, 1);
			return {
				...state,
				categories: deleteCategoryArr,
			};

		default:
			return {
				...state,
			};
	}
}
