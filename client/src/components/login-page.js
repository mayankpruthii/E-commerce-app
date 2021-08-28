import React, { createRef, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Image,
	Form,
	FloatingLabel,
	Button,
	Alert,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { clearErrors, userLogin } from "../actions/auth";

import googleLogo from "../assets/google.png";
import logo from "../assets/logo-dark.svg";

function Login(props) {
	const email = createRef();
	const password = createRef();

	useEffect(() => {
		document.addEventListener("keydown", EventListener);
		return () => {
			document.removeEventListener("keydown", EventListener);
		};
	});

	if (props.auth.isLoggedIn) {
		return <Redirect to="/" />;
	}

	function LoginFormSubmitHandler() {
		const data = {
			email: email.current.value,
			password: password.current.value,
		};
		props.dispatch(userLogin(data));
	}

	function EventListener(e) {
		if(props.auth.error !== "") {
			props.dispatch(clearErrors());
		}
		const keyVal = "Enter";
		if (e.key === keyVal) {
			e.preventDefault();
			LoginFormSubmitHandler();
		}
	}

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
									<h3 className="text-center mt-4">Login</h3>
								</Col>
							</Row>
						</Card.Title>
						<Card.Body>
							<Row>
								<Col>
									{props.auth.error && (
										<Alert variant="danger">
											{props.auth.error}
										</Alert>
									)}
									<FloatingLabel
										controlId="floatingInput"
										label="Email Address"
										className="mb-3"
									>
										<Form.Control
											placeholder="Email Address"
											ref={email}
											type="email"
										/>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingPassword"
										label="Password"
									>
										<Form.Control
											placeholder="Password"
											ref={password}
											type="password"
										/>
									</FloatingLabel>
									<Button
										onClick={LoginFormSubmitHandler}
										style={{ width: "100%" }}
										className="mx-auto mt-3"
									>
										Login
									</Button>
									<br />
									<br />
									<p className="text-center">
										Don't have an account yet?{" "}
										<Link to="/signup">Signup</Link> instead
									</p>
								</Col>
							</Row>
							<p className="mx-auto text-center">OR</p>
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

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Login);
