import React from "react";
import { connect } from "react-redux";

import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import { Home, User, Error404, Cart, Login, Signup, AdminHome } from "../";

const PrivateRoute = (props) => {
	const { isLoggedIn, component: Component, path } = props;
	if (props.isAdminRoute) {
		return props.role === 1 ? <Component {...props} /> : <Error404 />;
	}
	return (
		<Route
			path={path}
			render={(props) =>
				isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

function AppRoutes(props) {
	// All routes for the application

	const location = useLocation();

	// min height for the web app
	let minHeight = "90vh";
	let maxHeight = "auto";
	let height = "auto";

	if (location.pathname.includes("/admin")) {
		minHeight = "calc(100vh - 26.4px)";
		maxHeight = minHeight;
		height = minHeight;
	}

	const { isLoggedIn } = props.auth;
	const { role } = props.auth.user;

	return (
		<div style={{ minHeight, maxHeight, height }}>
			<Switch>
				{/* public routes */}
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/products" component={Home} />
				<Route exact path="/product/:productId" component={Home} />

				{/* routes for users logged in */}
				<PrivateRoute
					exact
					isLoggedIn={isLoggedIn}
					path="/cart"
					component={Cart}
				/>
				<PrivateRoute
					exact
					isLoggedIn={isLoggedIn}
					path="/user"
					component={User}
				/>
				<PrivateRoute
					exact
					isLoggedIn={isLoggedIn}
					path="/user/:userId"
					component={Home}
				/>

				{/* admin routes */}
				<PrivateRoute
					isLoggedIn={isLoggedIn}
					role={role}
					isAdminRoute
					path="/admin"
					component={AdminHome}
				/>
				<Route render={() => <Error404 />} />
			</Switch>
		</div>
	);
}

function matchStateToProps({ auth }) {
	return { auth };
}

export default connect(matchStateToProps)(AppRoutes);
