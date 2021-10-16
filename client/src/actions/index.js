// auth actions
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGIN_IN_PROGRESS = "USER_LOGIN_IN_PROGRESS";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_SIGNUP_IN_PROGRESS = "USER_SIGNUP_IN_PROGRESS";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAIL = "USER_SIGNUP_FAIL";
export const USER_CLEAR_ERROR = "USER_CLEAR_ERROR";
export const USER_LOGOUT = "USER_LOGOUT";

// product actions
export const PRODUCTS_GET_IN_PROGRESS = "PRODUCTS_GET_IN_PROGRESS";
export const PRODUCTS_GET = "PRODUCTS_GET";
export const PRODUCT_GET_SINGLE = "PRODUCT_GET_SINGLE";
export const PRODUCT_ERROR = "PRODUCT_ERROR";
export const PRODUCT_CLEAR_ERROR = "PRODUCT_CLEAR_ERROR";
// category actions
export const PRODUCT_CAT_ERROR = "PRODUCT_CAT_ERROR"
export const PRODUCT_CAT_CLEAR_ERROR = "PRODUCT_CAT_CLEAR_ERROR"
export const PRODUCT_CAT_GET = "PRODUCT_CAT_GET";
// admin only product actions
export const PRODUCT_DELETE = "PRODUCT_DELETE";
export const PRODUCT_ADD = "PRODUCT_ADD";
// admin only category actions
export const PRODUCT_CAT_ADD_SUCCESS = "PRODUCT_CAT_ADD_SUCCESS"

// user related actions - will update the user in the auth object in the reducer
export const USER_ADDRESS_UPDATE_OR_ADD = "USER_ADDRESS_UPDATE_OR_ADD";
export const USER_UPDATE_ERROR = "USER_UPDATE_ERROR";

