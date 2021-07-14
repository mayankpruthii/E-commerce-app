import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Header, Home, Footer } from "./components";

const PrivateRoute = (props) => {
	console.log(props);
	return <Route {...props} />;
};

function App() {
	return (
		<div className="App">
			<Header />
			<Router>
				<Switch>
					<Route path="/" component={Home} />
					<Route path="/products" component={Home} />
					<Route path="/product/:productId" component={Home} />
					<PrivateRoute path="/user" component={Home} />
					<Route path="/user/:userId" component={Home} />
					<Route path="/user/:userId/reviews" component={Home} />
				</Switch>
			</Router>
			<Footer />
		</div>
	);
}

export default App;
