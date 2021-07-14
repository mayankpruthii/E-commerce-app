import React from "react";
import { Container, Navbar, Nav, Row, Col, Form } from "react-bootstrap";
import logo from "../assets/logo-light.svg";

function Header(props) {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="primary"
			variant="dark"
			sticky="top"
			className="mb-4 p-2"
		>
			<Container>
				<Navbar.Brand href="#home">
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
					<Nav>
						<Nav.Item>
							<Nav.Link>Cart</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link>Account</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
