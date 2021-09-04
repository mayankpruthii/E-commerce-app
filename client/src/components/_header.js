import React, { useState } from "react";
import { Container, Navbar, Nav, Row, Col, Form, Fade } from "react-bootstrap";
import { connect } from "react-redux";

import logo from "../assets/logo-light.svg";

function Header(props) {
	const [showNavLinks, showNavLinksHandler] = useState(true);

	setTimeout(() => {
		showNavLinksHandler(true);
	}, 400);

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
				<Navbar.Brand href="/">
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
										<Nav.Link href="/cart">Cart</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link href="/user">Account</Nav.Link>
									</Nav.Item>
								</Nav>
							)}
							{!props.auth.isLoggedIn && (
								<Nav>
									<Nav.Item>
										<Nav.Link href="/login">Login</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link href="/signup">
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
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
