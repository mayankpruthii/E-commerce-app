import React, { useEffect } from "react";
import { Container, Row, Col, Card, Image, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MdOutlineCategory } from "react-icons/md";
import {
	getAllCategoriesApi,
	getProductsWithCategories,
} from "../actions/product";
import unknownPcPart from "../assets/unknown-pcpart.png";

function CategoryPage(props) {
	const { categoryId } = useParams();
	const dispatch = useDispatch();

	const products = useSelector((props) => props.products.products);
	const category = useSelector((props) => {
		let categories = props.products.categories;
		return categories.find((cat) => categoryId === cat._id).category;
	});

	useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (category === "") {
			dispatch(getAllCategoriesApi());
		}
		dispatch(
			getProductsWithCategories({
				categories: [categoryId],
			})
		);
	}, []);

	return (
		<Container>
			<div className="my-5">
				<p>Showing results for </p>
				<h2>{category}</h2>
			</div>
			{products.length !== 0 ? (
				products.map((prod, _index) => {
					return (
						<Card key={`${prod._title}-${_index}`}>
							<Card.Body md={2}>
								<Row className="p-1 g-5 align-items-center">
									<Col xs={12} sm={7} md={3}>
										<Image
											src={
												prod.photo
													? prod.photo
													: unknownPcPart
											}
											height="200"
											width="auto"
											rounded
										/>
									</Col>
									<Col xs={12} sm={5} md={7}>
										<Card.Title>{prod.title}</Card.Title>
										<Card.Text>
											{prod.description}
										</Card.Text>
										<Card.Text>
											<span className="text-secondary">
												Rs. {prod.maxRetailPrice}
											</span>
										</Card.Text>
									</Col>
									<Col md={2}>
										<Button>Add to Cart</Button>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					);
				})
			) : (
				<Alert variant="danger">No Products found!</Alert>
			)}
		</Container>
	);
}

export default CategoryPage;
