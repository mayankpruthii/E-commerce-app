import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { Header, Footer } from "./components";
import { getCookie } from "./utils";
import { getLoggedInUser } from "./actions/auth";
import AppRoutes from "./components/helpers/approutes";
import "./App.css";

function App(props) {
	if (
		!props.auth.isLoggedIn &&
		!props.auth.isLoginInProgress &&
		getCookie("is_logged_in")
	) {
		props.dispatch(getLoggedInUser());
	}

	return (
		<div className="App">
			<Router>
				{/* Document header */}
				<Header />

				{/* Document Routes */}
				<AppRoutes />

				{/* Document Footer */}
				<Footer />
			</Router>
		</div>
	);
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(App);
