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

import googleLogo from "../assets/google.png";
import logo from "../assets/logo-dark.svg";

function Login(props) {
	return (
		<Container>
			<Row className="justify-content-center mt-5 mb-5 p-5" lg={2} sm={1}>
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
									<h4 className="text-center mt-4">Login</h4>
								</Col>
							</Row>
						</Card.Title>
						<Card.Body>
							<Row>
								<Col>
									<FloatingLabel
										controlId="floatingInput"
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
									>
										<Form.Control
											type="password"
											placeholder="Password"
										/>
									</FloatingLabel>
									<Button
										style={{ width: "100%" }}
										className="mx-auto mt-3"
									>
										Login
									</Button>
								</Col>
							</Row>
							<br />
							<p className="mx-auto text-center">OR</p>
							<br />
							<Row className="">
								<Col>
									<Card>
										<Card.Body className="d-flex justify-content-center align-items-center">
											<Image
												width={32}
												src={googleLogo}
											/>
											&nbsp;
											<p className="my-auto">Login with Google</p>
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

export default Login;
