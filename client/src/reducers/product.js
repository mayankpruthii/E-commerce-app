import {
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

export default function ProductReducer(state = initialState, action) {
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
				products: [...state.products, action.payload.products],
			};
		case PRODUCT_GET_SINGLE:
			return {
				...state,
				isLoadingInProgress: false,
				product: action.payload.product,
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
		default:
			return {
				...state,
			};
	}
}
