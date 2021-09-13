import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import { AdminSidebar } from ".";

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
			className="bg-grey m-0 h-100"
		>
			<HiMenu
				style={{
					width: "1.5em",
					height: "1.5em",
					cursor: "pointer",
				}}
				onClick={toggleSideMenu}
			/>
			<div
				style={{
					border: "1px solid black",
					height: "400",
					width: "100%",
				}}
			>
				Text
			</div>
		</Col>
	);

	return (
		<Container fluid className="m-0 p-0 h-100 d-block">
			<Row className="m-0 p-0 h-100">
				{showSideMenu && (
					<Col
						lg={2}
						md={3}
						xs={12}
						className="bg-primary m-0 pt-3 h-100 overflow-auto"
					>
						<AdminSidebar />
					</Col>
				)}
				{isMobileUser ? (
					showSideMenu ? (
						<IoMdClose
							style={{
								position: "absolute",
								top: "26px",
								right: "24px",
								color: "white",
								width: "3em",
								height: "3em",
								cursor: "pointer",
							}}
							onClick={toggleSideMenu}
						/>
					) : (
						RightSideContent
					)
				) : (
					RightSideContent
				)}
			</Row>
		</Container>
	);
}

export default AdminHome;
