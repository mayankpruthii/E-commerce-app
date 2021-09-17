import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AboutWebsite from "./about";

function AdminRoutes(props) {
	return (
		// all admin routes
		<div>
			<Route exact path="/admin/about" component={AboutWebsite} />
			<Route exact path="/admin/products" component={AboutWebsite} />
			<Route exact path="/admin/users" component={AboutWebsite} />
			<Route
				render={() => <Redirect to="/admin/about" />}
			/>
		</div>
	);
}

export default AdminRoutes;
