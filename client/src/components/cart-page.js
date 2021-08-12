import React, { useState } from "react";
import { Image, Card, Col, Container, Row, Button, Fade } from "react-bootstrap";

import { Loader } from "./helpers";
import cpuImage from "../assets/cpu-image.png";

function Cart(props) {
	const [isLoading, isLoadingHandler] = useState(true);
	const [fadeAnimation, fadeAnimationHandler] = useState(false);

	setTimeout(() => {
		isLoadingHandler(false);
		fadeAnimationHandler(true);
	}, 1000);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Fade in={fadeAnimation} appear={true}>
			<Container>
				<Row>
					<Col>
						<h3 className="mt-5">Cart</h3>
						<Card>
							<Card.Body md={2}>
								<Row className="p-3 g-5 align-items-center">
									<Col xs={12} md={2}>
										<Image src={cpuImage} rounded />
									</Col>
									<Col xs={12} md={7}>
										<Card.Title>CPU</Card.Title>
										<Card.Text>
											Ryzen 5 5600X 4GHz Turbo 5.1GHz
										</Card.Text>
										<Card.Text>Rs. 28,000</Card.Text>
										<pre className="text-secondary">
											Delivers To:
										</pre>
										<Card.Text>
											221-B, Baker's street, London,
											England-609234
										</Card.Text>
									</Col>
									<Col md={3}>
										<Button>Buy now</Button>
										<p className="mt-3">Remove from Cart</p>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fade>
	);
}

export default Cart;
