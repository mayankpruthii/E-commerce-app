import React from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import cpuImage from "../../assets/cpu-image.png";

function ItemList(props) {
	return (
		<div className="bg-grey pb-1">
			<Container className="mt-5 mb-5">
				<Row>
					<Col className="mt-5 mb-3">
						<h2>Recommended Items</h2>
					</Col>
				</Row>
				<Row sm={4} xs={2}>
					<Col className="mt-2">
						<img src={cpuImage} alt="cpu" />
						<h4>CPU</h4>
						<pre>Rs.700</pre>
						<Button variant="primary">Add to Cart </Button>
					</Col>
					<Col className="mt-2">
						<img src={cpuImage} alt="cpu"/>
						<h4>CPU</h4>
						<pre>Rs.700</pre>
						<Button variant="primary">Add to Cart </Button>
					</Col>
					<Col className="mt-2">
						<img src={cpuImage} alt="cpu"/>
						<h4>CPU</h4>
						<pre>Rs.700</pre>
						<Button variant="primary">Add to Cart </Button>
					</Col>
					<Col className="mt-2">
						<img src={cpuImage} alt="cpu"/>
						<h4>CPU</h4>
						<pre>Rs.700</pre>
						<Button variant="primary">Add to Cart </Button>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default ItemList;
