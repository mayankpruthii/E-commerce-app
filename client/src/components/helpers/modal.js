import React from "react";
import { Modal } from "react-bootstrap";

function VerticalCenteredModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{props.heading}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.body}</Modal.Body>
		</Modal>
	);
}

export default VerticalCenteredModal;
