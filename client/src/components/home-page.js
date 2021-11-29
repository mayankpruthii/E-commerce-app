import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Fade } from "react-bootstrap";
import { ItemList, Loader } from "./helpers";
import cpuImage from "../assets/cpu-image.png";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getAllCategoriesApi } from "../actions/product";

function Home(props) {
	const [fadeAnimation, fadeAnimationHandler] = useState(false);
	const [isLoading, isLoadingHandler] = useState(true);
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);

	useEffect(() => {
		if (products.products.length === 0) {
			dispatch(getProducts(0));
		}
		if (products.categories.length === 0) {
			dispatch(getAllCategoriesApi());
		}
	}, []);

	setTimeout(() => {
		isLoadingHandler(false);
		fadeAnimationHandler(true);
	}, 750);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Fade in={fadeAnimation} appear={true}>
			<div>
				<Container>
					<Row className="align-items-center mt-5">
						<Col>
							<h2>
								Get the best computer parts at the best prices
							</h2>
							<Button variant="primary" href="/catalog">
								Get your PC parts today
							</Button>
						</Col>
						<Col className="d-none d-lg-block d-xl-block">
							<img src={cpuImage} alt="cpu" />
						</Col>
					</Row>
				</Container>
				<ItemList products={products} />
				<Container className="mt-5 mb-5">
					<Row>
						<Col>
							<h2>Search Items using Categories</h2>
						</Col>
					</Row>
					<Row className="mt-5 mb-5">
						{products.categories.map((cat, _id) => {
							return (
								<Col key={cat + _id}>
									<p>{cat.category}</p>
								</Col>
							);
						})}
					</Row>
				</Container>
			</div>
		</Fade>
	);
}

export default Home;
