import React from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import unknownPcPart from "../../assets/unknown-pcpart.png";
import { updateUser } from "../../actions/user";

function ItemList(props) {
	const dispatch = useDispatch();
	const cartProducts = useSelector((props) => {
		if (props.auth.user) {
			return props.auth.user.itemsInCart.map((item) => item._id);
		}
		return [];
	});

	const products = useSelector((state) => state.products.products);

	let productsToDisplay = products.splice(0, 8);

	var carouselSettings = {
		className: "center",
		dots: true,
		slidesToShow: 4,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const addToCart = (e, prodId) => {
		e.preventDefault();
		let cartItems = [...cartProducts, prodId];
		dispatch(
			updateUser(
				{
					itemsInCart: cartItems,
				},
				"cart"
			)
		);
	};

	return (
		<div className="bg-grey pb-1">
			<Container className="mt-5 mb-5">
				<Row>
					<Col className="mt-5 mb-3">
						<h2>Check out our latest products</h2>
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Slider
						{...carouselSettings}
						onClick={(e) => e.preventDefault()}
					>
						{productsToDisplay.map((prod, _id) => {
							return (
								<Col
									key={_id}
									className="p-3 justify-content-center"
								>
									<img
										src={
											prod.photo
												? prod.photo
												: unknownPcPart
										}
										className="mb-2 mx-auto"
										alt={prod.title}
										height="200px"
										width="auto"
									/>
									<h4>{prod.title}</h4>
									<pre>Rs. {prod.maxRetailPrice}</pre>
									{cartProducts.includes(prod._id) ? (
										<Link to="/cart">
											<Button variant="primary">
												Go to Cart
											</Button>
										</Link>
									) : (
										<Button
											variant="primary"
											onClick={(e) =>
												addToCart(e, prod._id)
											}
										>
											Add to Cart
										</Button>
									)}
								</Col>
							);
						})}
					</Slider>
				</Row>
			</Container>
		</div>
	);
}

export default ItemList;
