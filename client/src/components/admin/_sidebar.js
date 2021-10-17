import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { GoInfo } from "react-icons/go";
import { BiUser, BiHeadphone } from "react-icons/bi";
import { BiCategoryAlt } from "react-icons/bi";
import { RiArrowDropRightLine } from "react-icons/ri";

function AdminSidebar(props) {
	const [showMenuIndex, setShowMenuIndex] = useState(-1);

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
			hasChildren: true,
			children: [
				{
					name: "View Products",
					link: "/admin/products",
				},
				{
					name: "Add Product",
					link: "/admin/products/add",
				},
			],
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

	function isActiveChildLink(link) {
		return window.location.pathname === link;
	}

	const showOptions = (id) => {
		setShowMenuIndex(id);
	};

	return (
		<Container className="m-0 position-fixed" style={{ width: "inherit" }}>
			<Row sm={1} xs={1}>
				{sidebarLinks.map((el, _id) => {
					return (
						<Col
							className="mt-3"
							key={_id}
							onMouseOver={() => showOptions(_id)}
							onMouseLeave={() => setShowMenuIndex(-1)}
						>
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
								&nbsp;&nbsp;
								{el.hasChildren && (
									<RiArrowDropRightLine
										className={_id === showMenuIndex ? "transform-arrow": ""}
										style={{
											width: "1.5em",
											height: "1.5em",
										}}
									/>
								)}
							</Link>
							{el.hasChildren &&
								_id === showMenuIndex &&
								el.children.map((child, _childId) => {
									return (
										<Col
											className="mt-2 size-20"
											style={{ marginLeft: "40px" }}
											key={_childId}
										>
											<Link
												to={child.link}
												className={
													"text-white text-decoration-none " +
													(isActiveChildLink(
														child.link
													)
														? ""
														: "text-opacity-50")
												}
											>
												<h6 className="align-middle m-auto d-inline">
													{child.name}
												</h6>
											</Link>
										</Col>
									);
								})}
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}

export default AdminSidebar;
