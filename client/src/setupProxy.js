const { API_BASE } = require("./utils/url");
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		["/api/**", "/auth/google"],
		createProxyMiddleware({
			target: API_BASE,
			changeOrigin: false,
		})
	);
};
