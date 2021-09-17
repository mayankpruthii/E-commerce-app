import React, { useRef, useState } from "react";
import {
	Col,
	Container,
	Row,
	Card,
	Image,
	Fade,
	FloatingLabel,
	Form,
	Button,
	Alert,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { Loader, VerticalCenteredModal } from "./helpers";
import cpuImage from "../assets/cpu-image.png";
import { clearErrors, userLogout } from "../actions/auth";
import { updateUser, userUpdateError } from "../actions/user";

function User(props) {
	const [isLoading, isLoadingHandler] = useState(true);
	const [fadeAnimation, fadeAnimationHandler] = useState(false);
	const [showAddressInput, showAddressInputHandler] = useState(false);

	const addressInput = useRef();

	// run animation while the content loads
	setTimeout(() => {
		isLoadingHandler(false);
		fadeAnimationHandler(true);
	}, 750);

	// initial checks if this page should render
	if (isLoading) {
		return <Loader />;
	}

	if (!props.auth.isLoggedIn) {
		return <Redirect to="/login" />;
	}

	// for logging out user
	const userLogoutHandler = (e) => {
		e.preventDefault();
		if (props.auth.isLoggedIn) {
			props.dispatch(userLogout());
		}
	};

	// Link to open address update modal
	const showAddressUpdateLinkHandler = (e) => {
		e.preventDefault();
		props.dispatch(clearErrors());
		showAddressInputHandler(true);
		return;
	};

	// cta button for updating address
	const updateAddressHandler = () => {
		props.dispatch(clearErrors());

		if (addressInput.current.value.length < 10) {
			props.dispatch(userUpdateError("Please enter a valid address"));
			return;
		}

		props.dispatch(
			updateUser({ address: addressInput.current.value }, "address")
		);
		setTimeout(() => {
			if (!props.auth.error) {
				showAddressInputHandler(false);
				toast.success("Address update successful!");
			}
		}, 1000);
	};

	// modal for entering address
	const addressModalbody = (
		<div>
			{props.auth.error && (
				<Alert variant="danger">{props.auth.error}</Alert>
			)}
			<FloatingLabel controlId="floatingTextarea" label="Address">
				<Form.Control
					ref={addressInput}
					as="textarea"
					placeholder="Address"
					style={{ height: "100px" }}
				/>
			</FloatingLabel>
			<Button className="mt-3" onClick={updateAddressHandler}>
				Submit
			</Button>
		</div>
	);

	// return the page
	return (
		<Fade in={fadeAnimation} appear={true}>
			<Container className="mt-5">
				<Row>
					<Col>
						<Toaster position="top-center" reverseOrder={false} />
						<h1>Hi there, {props.auth.user.name}!</h1>
						<p>Email id: {props.auth.user.email}</p>
						<p>
							Not you?{" "}
							<Link to="#" onClick={(e) => userLogoutHandler(e)}>
								Logout
							</Link>
						</p>
						<Card className="mt-3" style={{ width: "100%" }}>
							<Card.Header as="h5">Saved Address</Card.Header>
							{props.auth.user.address ? (
								<Card.Body>
									<Card.Text>
										{props.auth.user.address}
									</Card.Text>
									<Card.Link
										href="#"
										onClick={(e) =>
											showAddressUpdateLinkHandler(e)
										}
									>
										Update Address
									</Card.Link>
								</Card.Body>
							) : (
								<Card.Body>
									<Card.Text>
										<i>
											You currently have no address saved!
										</i>
									</Card.Text>
									<Card.Link
										href="#"
										onClick={(e) =>
											showAddressUpdateLinkHandler(e)
										}
									>
										Add Address
									</Card.Link>
								</Card.Body>
							)}
						</Card>

						<VerticalCenteredModal
							show={showAddressInput}
							heading={
								props.auth.user.address
									? "Update Address"
									: "Add Address"
							}
							body={addressModalbody}
							onHide={() => showAddressInputHandler(false)}
						/>

						<Card className="mt-3" style={{ width: "100%" }}>
							<Card.Header as="h5">
								Previous Purchases
							</Card.Header>
							<Card.Body md={2}>
								<Row className="p-3 g-5 align-items-center">
									<Col xs={12} md={2}>
										<Image src={cpuImage} rounded />
									</Col>
									<Col xs={12} md={8}>
										<Card.Title>CPU</Card.Title>
										<Card.Text>
											Ryzen 5 5600X 4GHz Turbo 5.1GHz
										</Card.Text>
										<Card.Text>Rs. 28,000</Card.Text>
										<pre className="text-secondary">
											Delivered To:
										</pre>
										<Card.Text>
											221-B, Baker's street, London,
											England-609234
										</Card.Text>
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

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(User);
