import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Pagination from "react-router-pagination";
import { Loader } from ".";
import { updateUser } from "../../actions/user";
import unknownProductImage from "../../assets/unknown-pcpart.png";

function ProductsGrid(props) {
	const { isLoading, products, totalPages, pageNumber } = props;
	const cartItems = useSelector((props) => {
		console.log(props.auth.user.itemsInCart);
		return props.auth.user.itemsInCart.map((prod) => prod._id);
	});
	const dispatch = useDispatch();
	const history = useHistory();

	console.log("CART ITEMS", cartItems);

	const addItemsToCart = (e, id) => {
		e.preventDefault();
		const cart = [...cartItems, id];
		console.log("NEW CART ITEMS", cart);
		dispatch(
			updateUser(
				{
					itemsInCart: cart,
				},
				"cart"
			)
		);
	};

	return (
		<Col className="m-3">
			{isLoading ? (
				<Loader />
			) : (
				<Row>
					{products.map((prod, _id) => {
						return (
							<Col
								md={6}
								lg={3}
								className="p-3 pcparts-card justify-content-center"
								key={prod.title + _id}
							>
								<Link
									to={`/product/${prod._id}`}
									className="text-decoration-none text-primary"
								>
									<img
										src={
											prod.photo
												? prod.photo
												: unknownProductImage
										}
										height="200px"
										width="auto"
										alt={prod.title}
										className="d-block mx-auto mb-2"
									/>
									<div className="text-center text-decoration-none">
										<b>
											<h5>{prod.title}</h5>
										</b>
										<pre
											style={{
												fontSize: "1.25rem",
											}}
											className="text-secondary"
										>
											Rs.{""}
											{prod.maxRetailPrice}
										</pre>
										{!cartItems.includes(prod._id) ? (
											<Button
												variant="primary"
												onClick={(e) =>
													addItemsToCart(e, prod._id)
												}
											>
												Add To Cart
											</Button>
										) : (
											<Button
												onClick={(e) => {
													e.preventDefault();
													history.push("/cart");
												}}
												variant="primary"
											>
												Go To Cart
											</Button>
										)}
									</div>
								</Link>
							</Col>
						);
					})}
				</Row>
			)}
			{totalPages !== 1 && (
				<div style={{ display: "flex" }}>
					<span
						style={{
							width: "fit-content",
							marginRight: "5px",
						}}
					>
						Page number:{" "}
					</span>
					<div style={{ display: "inline" }}>
						<Pagination
							totalPages={totalPages}
							pageNumber={pageNumber}
							onClick={() => {
								document.body.scrollTop = 0;
								document.documentElement.scrollTop = 0;
							}}
							match={{
								path: "/catalog/:pageNumber",
							}}
						/>
					</div>
				</div>
			)}
		</Col>
	);
}

export default ProductsGrid;
