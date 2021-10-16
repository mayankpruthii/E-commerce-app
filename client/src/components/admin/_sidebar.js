import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { GoInfo } from "react-icons/go";
import { BiUser, BiHeadphone } from "react-icons/bi";
import { BiCategoryAlt } from "react-icons/bi";

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
			name: "Products",
			icon: <BiHeadphone style={styles.icons} />,
			link: "/admin/products",
		},
		{
			name: "Categories",
			icon: <BiCategoryAlt style={styles.icons} />,
			link: "/admin/categories",
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
		{
			name: "About",
			icon: <GoInfo style={styles.icons} />,
			link: "/admin/about",
		},
	];

	function isActiveLink(link) {
		return window.location.pathname.includes(link);
	}

	return (
		<Container className="m-0">
			<Row sm={1} xs={1}>
				{sidebarLinks.map((el, _id) => {
					return (
						<Col className="mt-3">
							<Link
								to={el.link}
								className={
									"text-white text-decoration-none " +
									(isActiveLink(el.link)
										? ""
										: "text-opacity-50")
								}
							>
								<div className="d-inline-block">{el.icon}</div>
								<h5 className="align-middle m-auto d-inline">
									{el.name}
								</h5>
							</Link>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}

export default AdminSidebar;
