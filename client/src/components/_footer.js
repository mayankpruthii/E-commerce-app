import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer(props) {
	return <Container fluid className="bg-primary p-auto">
        <Row>
            <Col>
                <p className="pt-3 text-secondary text-center">©PcParts | All Rights Reserved</p>
            </Col>
        </Row>
    </Container>
}

export default Footer;
