import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router";

function Footer(props) {
	const location = useLocation();

	if (location.pathname.includes("/admin")) {
		return <div></div>;
	}

	return (
		<Container fluid className="bg-primary p-auto">
			<Row>
				<Col>
					<p className="pt-3 text-muted text-center">
						©PcParts | All Rights Reserved
					</p>
				</Col>
			</Row>
		</Container>
	);
}

export default Footer;
