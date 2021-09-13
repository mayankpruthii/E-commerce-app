import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Home, User, Error404, Cart, Login, Signup, AdminHome } from "../";

// const PrivateRoute = (props) => {
// 	console.log(props);
// 	return <Route {...props} />;
// };

function AppRoutes(props) {
	// All routes for the application

	const location = useLocation();

	let minHeight = "90vh";
	let maxHeight = "auto";
	let height = "auto";

	if (location.pathname.includes("/admin")) {
		minHeight = "calc(100vh - 26.4px)";
		maxHeight = minHeight;
		height = minHeight;
	}

	return (
		<div style={{ minHeight, maxHeight, height }}>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/products" component={Home} />
				<Route exact path="/product/:productId" component={Home} />
				<Route exact path="/cart" component={Cart} />
				<Route exact path="/user" component={User} />
				<Route exact path="/user/:userId" component={Home} />
				<Route exact path="/admin" component={AdminHome} />
				<Route exact path="/admin/dashboard" component={Home} />
				<Route exact path="/user/:userId/reviews" component={Home} />
				<Route render={() => <Error404 />} />
			</Switch>
		</div>
	);
}

export default AppRoutes;
