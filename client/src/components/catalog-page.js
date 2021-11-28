import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoriesApi, getProducts } from "../actions/product";
import { Loader } from "./helpers";
import { Link } from "react-router-dom";
import unknownProductImage from "../assets/unknown-pcpart.png";

function Catalog(props) {
	const productsState = useSelector((state) => state.products);
	const products = productsState.products;
	const categories = productsState.categories;
	const isLoading = productsState.isLoadingInProgress;
	const dispatch = useDispatch();

	useEffect(() => {
		if (products.length === 0) {
			dispatch(getProducts(0));
		}
		if (categories.length === 0) {
			dispatch(getAllCategoriesApi());
		}
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	const CatalogMobileView = () => {
		return (
			<div>
				<Container fluid>Hi</Container>
			</div>
		);
	};

	const CatalogDesktopView = () => {
		return (
			<div>
				<Container fluid>
					<Row>
						<Col lg={2} md={4} className="p-0">
							<div
								className="position-fixed bg-grey"
								style={{
									width: "inherit",
									borderBottomRightRadius: 100,
								}}
							>
								<div className="px-3">
									<h5 className="p-2 mt-3">
										Filter by Categories
									</h5>
									<Form
										style={{
											maxHeight: 200,
											overflowY: "auto",
										}}
									>
										{categories.map((cat, _id) => {
											return (
												<div
													key={_id}
													className="px-2 m-0"
												>
													<Form.Check
														inline
														label={cat.category}
														name="group1"
														type="checkbox"
														className=" d-block"
														id={cat.category}
													/>
												</div>
											);
										})}
									</Form>
								</div>
								<div className="px-3">
									<h5 className="p-2 mt-5 mt-3">
										Filter by Maximum Price
									</h5>
									<Form>
										<Form.Range
											className="px-2"
											onChange={(e) =>
												console.log(e.target.value)
											}
										/>
										<div style={{ display: "flex" }}>
											<p
												style={{ flexGrow: 1 }}
												className="px-2"
											>
												0
											</p>
											<p className="px-2">200000</p>
										</div>
									</Form>
								</div>
								<div className="px-3">
									<h5 className="p-2 mt-5 mt-3">
										Sort by Filters
									</h5>
									<Form>
										<div className="px-2 mb-5">
											<Form.Check
												inline
												label="Name (A-Z)"
												name="group1"
												type="radio"
												className="d-block"
												id="name"
											/>
											<Form.Check
												inline
												label="Name (Z-A)"
												name="group1"
												type="radio"
												className="d-block"
												id="price"
											/>
											<Form.Check
												inline
												label="Ascending Price"
												name="group1"
												type="radio"
												className="d-block"
												id="price"
											/>
											<Form.Check
												inline
												label="Descending Price"
												name="group1"
												type="radio"
												className="d-block"
												id="price"
											/>
										</div>
									</Form>
								</div>
							</div>
						</Col>
						<Col className="m-3">
							<Row>
								{products.map((prod, _id) => {
									return (
										<Col
											md={6}
											lg={3}
											className="p-3 justify-content-center"
											key={prod.title + _id}
										>
											<Link
												to={`/product/${prod._id}`}
												className="text-decoration-none text-primary"
											>
												<img
													src={
														prod.photo
															? prod.photo
															: unknownProductImage
													}
													height="200px"
													width="auto"
													alt={prod.title}
													className="d-block mx-auto mb-2"
												/>
												<div className="text-center text-decoration-none">
													<b>
														<h5>{prod.title}</h5>
													</b>
													<p>
														Rs.{" "}
														{prod.maxRetailPrice}
													</p>
													<Button variant="primary">
														Add To Cart
													</Button>
												</div>
											</Link>
										</Col>
									);
								})}
							</Row>
						</Col>
					</Row>
				</Container>
			</div>
		);
	};

	if (props.screenWidth >= 768) {
		return <CatalogDesktopView />;
	} else {
		return (
			<div>
				<CatalogMobileView />
			</div>
		);
	}
}

export default Catalog;
