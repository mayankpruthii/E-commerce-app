import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { GoInfo } from "react-icons/go";
import { BiUser, BiHeadphone } from "react-icons/bi";

function AdminSidebar(props) {
	const styles = {
		icons: {
			height: "1.5em",
			width: "1.5em",
			marginRight: "0.75em",
		},
	};

	const sidebarLinks = [
		{
			name: "About",
			icon: <GoInfo style={styles.icons} />,
			link: "/admin",
		},
		{
			name: "Products",
			icon: <BiHeadphone style={styles.icons} />,
			link: "/admin/products",
		},
		{
			name: "Users",
			icon: <BiUser style={styles.icons} />,
			link: "/admin/users",
		},
		{
			name: "Orders",
			icon: <BsBag style={styles.icons} />,
			link: "/admin/orders",
		},
	];

	return (
		<Container>
			<Row sm={1} xs={1}>
				{sidebarLinks.map((el, _id) => {
					return (
						<Col className="mt-3">
							<Link
								to={el.link}
								className="text-white text-decoration-none"
							>
								<div className="text-white d-inline-block">
									{el.icon}
								</div>
								<h5 className="m-auto d-inline">{el.name}</h5>
							</Link>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}

export default AdminSidebar;
