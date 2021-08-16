import React from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Image,
	Form,
	FloatingLabel,
	Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import googleLogo from "../assets/google.png";
import logo from "../assets/logo-dark.svg";

function Signup(props) {
	return (
		<Container>
			<Row className="justify-content-center mt-5 mb-5" lg={2} md={1}>
				<Col>
					<Card className="p-3">
						<Card.Title>
							<Row className="justify-content-center">
								<Col>
									<Image
										width={150}
										className="d-block mx-auto"
										src={logo}
										alt="PcParts"
									/>
									<h3 className="text-center mt-4">
										Signup for Free!
									</h3>
								</Col>
							</Row>
						</Card.Title>
						<Card.Body>
							<Row>
								<Col>
									<FloatingLabel
										controlId="floatingNameInput"
										label="Name"
										className="mb-3"
									>
										<Form.Control
											type="text"
											placeholder="Your full name"
										/>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingEmailInput"
										label="Email address"
										className="mb-3"
									>
										<Form.Control
											type="email"
											placeholder="name@example.com"
										/>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingPassword"
										label="Password"
										className="mb-3"
									>
										<Form.Control
											type="password"
											placeholder="Password"
										/>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingConfirmPassword"
										label="Confirm Password"
									>
										<Form.Control
											type="password"
											placeholder="Confirm Password"
										/>
									</FloatingLabel>
									<Button
										style={{ width: "100%" }}
										className="mx-auto mt-3"
									>
										Signup
									</Button>
									<p className="my-3 text-center">
										Already have an account?{" "}
										<Link to="/login">Login</Link> instead
									</p>
								</Col>
							</Row>
							<p className="my-2 mx-auto text-center">OR</p>
							<Row className="">
								<Col>
									<Card>
										<Card.Body className="d-flex justify-content-center align-items-center">
											<Image
												width={32}
												src={googleLogo}
											/>
											&nbsp;
											<p className="my-auto">
												Login with Google
											</p>
										</Card.Body>
									</Card>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Signup;
