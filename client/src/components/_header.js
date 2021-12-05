import React, { useState } from "react";
import { Container, Navbar, Nav, Row, Col, Form, Fade } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogInCircle, BiBookContent } from "react-icons/bi";
import { CgUserList } from "react-icons/cg";

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
											<Nav.Link as={Link} to="/catalog/1">
												<BiBookContent />
												&nbsp;Catalog
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link as={Link} to="/cart">
												<BsCart2 />
												&nbsp;Cart
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link as={Link} to="/user">
												<AiOutlineUser />
												&nbsp;Account
											</Nav.Link>
										</Nav.Item>
									</Nav>
								)}
								{!props.auth.isLoggedIn && (
									<Nav>
										<Nav.Item>
											<Nav.Link as={Link} to="/login">
												<BiLogInCircle />
												&nbsp;Login
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link as={Link} to="/signup">
												<CgUserList />
												&nbsp;Signup
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
		<div id="header" className="sticky-top bg-secondary">
			{props.auth.user.role === 1 && (
				<div>
					{location.pathname.includes("/admin") ? (
						<Link
							className="text-muted text-decoration-none"
							to="/"
						>
							<Container className="text-center text-white-50">
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
							<Container className="text-center text-white-50">
								<Row>
									<Col>Go To Admin Panel</Col>
								</Row>
							</Container>
						</Link>
					)}
				</div>
			)}
			{props.auth.user.role === 1 &&
			location.pathname.includes("/admin") ? null : (
				<WebsiteHeader />
			)}
		</div>
	);
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
