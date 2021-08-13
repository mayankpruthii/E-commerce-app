import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Header, Home, Footer, User, Error404, Cart, Login, Signup } from "./components";

const PrivateRoute = (props) => {
	console.log(props);
	return <Route {...props} />;
};

function App() {
	return (
		<div className="App">
			{/* Document header */}
			<Header />

			{/* All routes for the application */}
			<div style={{ minHeight: "90vh" }}>
				<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/products" component={Home} />
						<Route
							exact
							path="/product/:productId"
							component={Home}
						/>
						<Route exact path="/cart" component={Cart} />
						<Route exact path="/user" component={User} />
						<Route exact path="/user/:userId" component={Home} />
						<Route
							exact
							path="/user/:userId/reviews"
							component={Home}
						/>
						<Route render={() => <Error404 />} />
					</Switch>
				</Router>
			</div>

			{/* Document Footer */}
			<Footer />
		</div>
	);
}

export default App;
