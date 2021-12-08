import React, { useState, useEffect } from "react";
import {
	Image,
	Card,
	Col,
	Container,
	Row,
	Button,
	Fade,
} from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineCategory } from "react-icons/md";
import { useDispatch } from "react-redux";
import unknownPcPart from "../assets/unknown-pcpart.png";

import { Loader } from "./helpers";
import { updateUser } from "../actions/user";
import { getCartItemsFromIds } from "../actions/product";

function Cart(props) {
	const [isLoading, isLoadingHandler] = useState(true);
	const [fadeAnimation, fadeAnimationHandler] = useState(false);
	const dispatch = useDispatch();

	const cartItemIds = useSelector((props) =>
		props.auth.user.itemsInCart.map((prod) => prod._id)
	);
	const cartproducts =
		useSelector((props) => {
			return props.products.cartProducts;
		}) || [];
	const auth = useSelector((props) => props.auth);

	useEffect(() => {
		dispatch(getCartItemsFromIds(cartItemIds));
	}, []);

	let _price = 0;
	for (let i = 0; i < cartproducts.length; i++) {
		_price += cartproducts[i].maxRetailPrice;
	}

	setTimeout(() => {
		isLoadingHandler(false);
		fadeAnimationHandler(true);
	}, 1000);

	if (isLoading) {
		return <Loader />;
	}

	if (!auth.isLoginInProgress && !auth.isLoggedIn) {
		return <Redirect to="/login" />;
	}

	const removeFromCart = (index) => {
		let newCartItemIds = cartItemIds;
		newCartItemIds.splice(index, 1);
		console.log(newCartItemIds);
		dispatch(
			updateUser(
				{
					itemsInCart: newCartItemIds,
				},
				"cart"
			)
		);
	};

	return (
		<Fade in={fadeAnimation} appear={true}>
			<Container className="text-center-on-small-devices">
				<Row>
					<Col>
						<h3 className="mt-5 mb-3">Cart</h3>
						{cartproducts.length !== 0 ? (
							cartproducts.map((prod, _index) => {
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
													<Card.Title>
														{prod.title}
													</Card.Title>
													<Card.Text>
														{prod.description}
													</Card.Text>
													<Card.Text>
														<span className="text-secondary">
															Rs.{" "}
															{
																prod.maxRetailPrice
															}
														</span>
													</Card.Text>
													<Card.Text>
														{prod.category
															.length !== 0 && (
															<>
																<MdOutlineCategory />
																&nbsp;
																{prod.category.map(
																	(
																		cat,
																		_id
																	) => (
																		<span
																			key={`${cat}-${_id}`}
																			className="d-inline"
																		>
																			{
																				cat.category
																			}
																			&nbsp;
																		</span>
																	)
																)}
															</>
														)}
													</Card.Text>
												</Col>
												<Col md={2}>
													<Button>Buy now</Button>
													<p
														className="mt-3 text-danger pointer"
														onClick={() =>
															removeFromCart(
																_index
															)
														}
													>
														Remove from Cart
													</p>
												</Col>
											</Row>
										</Card.Body>
									</Card>
								);
							})
						) : (
							<div>
								<h5 className="py-4">
									Your cart looks empty!
									<Link
										className="py-3 d-block"
										to="/catalog/1"
									>
										Take me to catalog
									</Link>
								</h5>
							</div>
						)}
						{cartproducts.length !== 0 && (
							<div className="my-5">
								<h3 className="mb-3">Order Summary</h3>
								{cartproducts.map((prod, _index) => {
									return (
										<Row>
											<Col style={{ textAlign: "right" }}>
												{prod.title} :
											</Col>
											<Col className="text-left">
												{prod.maxRetailPrice}
											</Col>
										</Row>
									);
								})}
								<hr />
								<Row>
									<Col style={{ textAlign: "right" }}>
										Total:
									</Col>
									<Col>{_price}</Col>
								</Row>
								<Row className="my-5 align-content-center justify-content-md-center">
									{/* <Col> */}
										<Button className="text-center w-auto" variant="primary">
											Proceed to Order
										</Button>
									{/* </Col> */}
								</Row>
							</div>
						)}
					</Col>
				</Row>
			</Container>
		</Fade>
	);
}

export default Cart;
