import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HiMenu } from "react-icons/hi";

import { AdminSidebar, AdminRoutes } from ".";

function AdminHome(props) {
	const [isMobileUser, isMobileUserHandler] = useState(false);
	const [showSideMenu, showSideMenuHandler] = useState(true);

	useEffect(() => {
		if (window.innerWidth < 768) {
			isMobileUserHandler(true);
		}
	}, []);

	const toggleSideMenu = () => {
		showSideMenuHandler(!showSideMenu);
	};

	const RightSideContent = (
		<Col
			lg={showSideMenu ? 10 : 12}
			md={showSideMenu ? 9 : 12}
			xs={12}
			style={{ maxWidth: "100%" }}
			className="m-0 h-100"
		>
			<HiMenu
				style={{
					width: "1.5em",
					height: "1.5em",
					cursor: "pointer",
				}}
				onClick={toggleSideMenu}
			/>
			<AdminRoutes />
		</Col>
	);

	return (
		<Container fluid className="m-0 p-0 h-100 d-block bg-grey">
			<Row className="m-0 p-0 h-100">
				{isMobileUser ? (
					<p>
						Please operate the dashboard using a PC or a wider
						screen
					</p>
				) : (
					<Row>
						{showSideMenu && (
							<Col
								lg={2}
								md={3}
								className="bg-primary m-0 pt-3 h-100 overflow-auto"
							>
								<AdminSidebar />
							</Col>
						)}
						{RightSideContent}
					</Row>
				)}
			</Row>
		</Container>
	);
}

export default AdminHome;
