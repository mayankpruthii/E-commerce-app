import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import cpuImage from "../assets/cpu-image.png";

function Home(props) {
	return (
		<>
			<Container>
				<Row className="align-items-center mt-5">
					<Col>
						<h2>Get the best computer parts at the best prices</h2>
						<Button variant="primary">
							Get your PC parts today
						</Button>
					</Col>
					<Col className="d-none d-lg-block d-xl-block">
						<img className="" src={cpuImage} />
					</Col>
				</Row>
			</Container>
			<div className="bg-grey pb-1">
				<Container className="mt-5 mb-5">
					<Row>
						<Col className="mt-5 mb-3">
							<h2>Recommended Items</h2>
						</Col>
					</Row>
					<Row sm={4} xs={2}>
						<Col className="mt-2">
							<img src={cpuImage} />
							<h4>CPU</h4>
							<pre>Rs.700</pre>
							<Button variant="primary">Add to Cart </Button>
						</Col>
						<Col className="mt-2">
							<img src={cpuImage} />
							<h4>CPU</h4>
							<pre>Rs.700</pre>
							<Button variant="primary">Add to Cart </Button>
						</Col>
						<Col className="mt-2">
							<img src={cpuImage} />
							<h4>CPU</h4>
							<pre>Rs.700</pre>
							<Button variant="primary">Add to Cart </Button>
						</Col>
						<Col className="mt-2">
							<img src={cpuImage} />
							<h4>CPU</h4>
							<pre>Rs.700</pre>
							<Button variant="primary">Add to Cart </Button>
						</Col>
					</Row>
				</Container>
			</div>
			<Container className="mt-5 mb-5">
				<Row>
					<Col>
						<h2>Search Items using Categories</h2>
					</Col>
				</Row>
				<Row className="mt-5 mb-5">
					<Col>
						<p>Graphic Cards</p>
					</Col>
					<Col>
						<p>Graphic Cards</p>
					</Col>
					<Col>
						<p>Graphic Cards</p>
					</Col>
					<Col>
						<p>Graphic Cards</p>
					</Col>
					<Col>
						<p>Graphic Cards</p>
					</Col>
					<Col>
						<p>Graphic Cards</p>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Home;
