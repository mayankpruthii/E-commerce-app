import React from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import unknownPcPart from "../../assets/unknown-pcpart.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

function ItemList(props) {
	const cartProducts = useSelector((props) => {
		if (props.auth.user) {
			return props.auth.user.itemsInCart;
		}
		return {};
	});

	const { products } = props.products;

	let productsToDisplay = products.splice(0, 8);

	console.log(productsToDisplay);

	var carouselSettings = {
		className: "center",
		dots: true,
		infinite: true,
		speed: 500,
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

	return (
		<div className="bg-grey pb-1">
			<Container className="mt-5 mb-5">
				<Row>
					<Col className="mt-5 mb-3">
						<h2>Check out our latest products</h2>
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Slider {...carouselSettings}>
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
									{cartProducts && cartProducts.filter(
										(cp) => cp._id === prod._id
									) ? (
										<Button variant="primary">
											Go to Cart
										</Button>
									) : (
										<Button variant="primary">
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
