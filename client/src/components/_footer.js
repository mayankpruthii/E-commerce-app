import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer(props) {
	return (
		<Container fluid className="bg-primary p-auto mt-5">
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
