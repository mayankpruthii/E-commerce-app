const API_ROOT = "http://localhost:5000/api";

export const routes = {
	// what user can do
	user: {
		auth: {
			signup: `${API_ROOT}/auth/signup`,
			login: `${API_ROOT}/auth/login`,
			logout: `${API_ROOT}/auth/logout`
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
			photoUpload: `${API_ROOT}/product/product-photo/upload`
		},
		category: {
			add: `${API_ROOT}/category/create`,
			assignToProducts: (prodId) => `${API_ROOT}/assign/${prodId}`
		},
		user: {
			getAllUsers: `${API_ROOT}/user`,
		},
	},
	// general website functionality apis
	product: {
		get: (pageNum) => `${API_ROOT}/product?page=${pageNum}`,
		getSingle: (prodId) => `${API_ROOT}/product/${prodId}`,
	},
	category: {
		getAll: `${API_ROOT}/category`,
		getProducts: (catId) => `${API_ROOT}/get/${catId}`
	}
};