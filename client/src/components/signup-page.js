import "../.env";
import React, { useRef, useEffect } from "react";
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
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router";

import { checkIfTwoStringsMatch } from "../utils";
import googleLogo from "../assets/google.png";
import logo from "../assets/logo-dark.svg";
import { userSignup, userSignupFail, clearErrors } from "../actions/auth";

function Signup(props) {
	const name = useRef();
	const email = useRef();
	const password = useRef();
	const confirmPassword = useRef();
	const agreeToTnC = useRef();
	const history = useHistory();

	useEffect(() => {
		document.addEventListener("keydown", EventListener);
		return () => {
			document.removeEventListener("keydown", EventListener);
		};
	});

	function signupFormHandler() {
		const data = {
			name: name.current.value,
			email: email.current.value,
			password: password.current.value,
			confirmPassword: confirmPassword.current.value,
			agreeToTnC: agreeToTnC.current.checked,
		};
		let doesPasswordMatch = checkIfTwoStringsMatch(
			data.password,
			data.confirmPassword
		);
		if (!doesPasswordMatch) {
			props.dispatch(userSignupFail("Passwords do not match"));
			return;
		} else if (!data.agreeToTnC) {
			props.dispatch(
				userSignupFail(
					"Please agree to Terms and Conditions to continue"
				)
			);
			return;
		}
		data.confirmPassword = undefined;
		props.dispatch(userSignup(JSON.stringify(data)));
	}

	function EventListener(e) {
		const keyVal = "Enter";
		if (e.key === keyVal) {
			e.preventDefault();
			signupFormHandler();
		}
		if (props.auth.error !== "") {
			props.dispatch(clearErrors());
		}
	}

	if (props.auth.isLoggedIn) {
		return <Redirect to="/" />;
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
									<h3 className="text-center mt-4">
										Signup for Free!
									</h3>
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
										controlId="floatingNameInput"
										label="Name"
										className="mb-3"
									>
										<Form.Control
											type="text"
											placeholder="Name"
											ref={name}
										/>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingEmailInput"
										label="Email Address"
										className="mb-3"
									>
										<Form.Control
											type="email"
											placeholder="Email Address"
											ref={email}
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
											ref={password}
										/>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingConfirmPassword"
										label="Confirm Password"
									>
										<Form.Control
											type="password"
											placeholder="Confirm Password"
											ref={confirmPassword}
										/>
									</FloatingLabel>
									<Form.Check
										className="my-3"
										type="checkbox"
										label="I agree to the Terms and Conditions"
										ref={agreeToTnC}
									/>
									<Button
										onClick={(e) => signupFormHandler(e)}
										style={{ width: "100%" }}
										className="mx-auto"
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
							<Row>
								<Col>
									<a
										style={{ textDecoration: "none", color: "#202020" }}
										href={"/api/auth/google"}
									>
										<Card style={{ cursor: "pointer" }}>
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
									</a>
								</Col>
							</Row>
							<pre className="mt-4 text-end">
								<a href="/signup">View Terms and Conditions</a>
							</pre>
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

export default connect(mapStateToProps)(Signup);
