export const API_BASE = "http://localhost:5000";
export const API_ROOT = `${API_BASE}/api`;

export const routes = {
	// what user can do
	user: {
		auth: {
			signup: `${API_ROOT}/auth/signup`,
			login: `${API_ROOT}/auth/login`,
			googleLogin: `${API_ROOT}/auth/google`,
			logout: `${API_ROOT}/auth/logout`,
		},
		review: {
			add: `${API_ROOT}/review`,
			update: (reviewId) => `${API_ROOT}/review/${reviewId}`,
			delete: (reviewId) => `${API_ROOT}/review/${reviewId}`,
		},
		getCurrentUser: `${API_ROOT}/user`,
		updateCurrentUser: `${API_ROOT}/user`,
		getOtherUser: (userId) => `${API_ROOT}/user/${userId}`,
	},
	// tasks only admin can perform
	admin: {
		product: {
			add: `${API_ROOT}/product/add`,
			update: (prodId) => +`${API_ROOT}/product/${prodId}`,
			photoUpload: `${API_ROOT}/product/product-photo/upload`,
			delete: (prodId) => `${API_ROOT}/product/${prodId}`,
		},
		category: {
			add: `${API_ROOT}/category/create`,
			assignToProducts: (prodId) => `${API_ROOT}/category/assign/${prodId}`,
			update: (categoryId) => `${API_ROOT}/category/${categoryId}`,
			delete: (categoryId) => `${API_ROOT}/category/${categoryId}`,
		},
		user: {
			getAllUsers: `${API_ROOT}/user`,
		},
	},
	// general website functionality apis
	product: {
		get: `${API_ROOT}/product`,
		getSingle: (prodId) => `${API_ROOT}/product/${prodId}`,
	},
	category: {
		getAll: `${API_ROOT}/category`,
		getProducts: `${API_ROOT}/category/products/get`,
	},
};
