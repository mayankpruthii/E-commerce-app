import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { ProductAdminPage, AddProduct, Categories } from ".";
import AboutWebsite from "./about";
import { Loader } from "../helpers";

// all admin routes
function AdminRoutes(props) {
	const [loading, setloading] = useState(true);
	
	useEffect(() => {
		setTimeout(() => {
			setloading(false);
		}, 500);
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<Switch>
			<Route exact path="/admin/about" component={AboutWebsite} />
			<Route exact path="/admin/products" component={ProductAdminPage} />
			<Route exact path="/admin/products/id/:prodId" component={ProductAdminPage} />
			<Route exact path="/admin/products/add" component={AddProduct} />
			<Route exact path="/admin/categories" component={Categories} />
			<Route exact path="/admin/users" component={AboutWebsite} />
			<Route render={() => <Redirect to="/admin/products" />} />
		</Switch>
	);
}

export default AdminRoutes;
