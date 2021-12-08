import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Fade } from "react-bootstrap";
import { Link } from "react-router-dom";
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
		document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
		if (products.products.length === 0) {
			dispatch(getProducts());
		}
		if (products.categories.length === 0) {
			dispatch(getAllCategoriesApi());
		}
	}, [dispatch, products.products, products.categories]);

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
							<Button variant="primary" href="/catalog/1">
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
					<Row className="justify-content-center align-items-center mt-5 mb-5">
						{products.categories.map((cat, _id) => {
							return (
								<Col sm={6} lg={2} md={3} key={cat + _id}>
									<Link
										to={`/category/${cat._id}`}
										className="text-decoration-none"
									>
										<p
											style={styles.category}
											className="text-center text-primary"
										>
											{cat.category}
										</p>
									</Link>
								</Col>
							);
						})}
					</Row>
				</Container>
			</div>
		</Fade>
	);
}

const styles = {
	category: {
		border: "1px solid #f4f4f4",
		borderRadius: "4px",
		padding: "4px",
		boxShadow: "0px 0px 4px #f4f4f4",
	},
};

export default Home;
