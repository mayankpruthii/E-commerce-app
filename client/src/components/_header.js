import React, { useState } from "react";
import { Container, Navbar, Nav, Row, Col, Form, Fade } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/logo-light.svg";

function Header(props) {
	const [showNavLinks, showNavLinksHandler] = useState(true);
	const location = useLocation();

	setTimeout(() => {
		showNavLinksHandler(true);
	}, 400);

	// header to be shown to the users
	const WebsiteHeader = () => {
		return (
			<Navbar
				collapseOnSelect
				expand="lg"
				bg="primary"
				variant="dark"
				sticky="top"
				className="p-2"
			>
				<Container>
					<Navbar.Brand as={Link} to="/">
						<img width="120" src={logo} alt="Logo" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="m-auto">
							<Row>
								<Col>
									<Form.Control
										size="sm"
										type="text"
										placeholder="Search"
									/>
								</Col>
							</Row>
						</Nav>
						<Fade in={showNavLinks} appear={true}>
							<div>
								{props.auth.isLoggedIn && (
									<Nav>
										<Nav.Item>
											<Nav.Link as={Link} to="/cart">
												Cart
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link as={Link} to="/user">
												Account
											</Nav.Link>
										</Nav.Item>
									</Nav>
								)}
								{!props.auth.isLoggedIn && (
									<Nav>
										<Nav.Item>
											<Nav.Link as={Link} to="/login">
												Login
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link as={Link} to="/signup">
												Signup
											</Nav.Link>
										</Nav.Item>
									</Nav>
								)}
							</div>
						</Fade>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	};

	// header to be returned based on users or admin
	return (
		<div id="header">
			{props.auth.user.role === 1 && (
				<div>
					{location.pathname.includes("/admin") ? (
						<Link
							className="text-muted text-decoration-none"
							to="/"
						>
							<Container className="text-center">
								<Row>
									<Col>Go To Website</Col>
								</Row>
							</Container>
						</Link>
					) : (
						<Link
							className="text-muted text-decoration-none"
							to="/admin"
						>
							<Container className="text-center">
								<Row>
									<Col>Go To Admin Panel</Col>
								</Row>
							</Container>
						</Link>
					)}
				</div>
			)}
			{props.auth.user.role === 1 &&
				location.pathname.includes("/admin") ? null : <WebsiteHeader /> }
		</div>
	);
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
