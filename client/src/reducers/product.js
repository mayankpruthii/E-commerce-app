import {
	PRODUCT_DELETE,
	PRODUCTS_GET,
	PRODUCTS_GET_IN_PROGRESS,
	PRODUCT_CLEAR_ERROR,
	PRODUCT_ERROR,
	PRODUCT_GET_SINGLE,
} from "../actions";

const initialState = {
	products: [],
	singleProduct: {},
	error: "",
	isLoadingInProgress: false,
};

export default function products(state = initialState, action) {
	switch (action.type) {
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
		case PRODUCT_ERROR:
			return {
				...state,
				isLoadingInProgress: false,
				error: action.error,
			};
        case PRODUCT_CLEAR_ERROR:
            return {
                ...state,
                error: ""
            }
		case PRODUCT_DELETE:
			let productArr = state.products.splice(action.payload, 1);
			return {
				...state,
				products: productArr
			}
		default:
			return {
				...state,
			};
	}
}
