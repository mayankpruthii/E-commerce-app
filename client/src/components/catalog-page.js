import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
	getAllCategoriesApi,
	getProducts,
	getProductsWithCategories,
	gettingProductInProgress,
	maxPriceFilter,
	sortProductsName,
	sortProductsPrice,
} from "../actions/product";
import { Loader } from "./helpers";
import { Link } from "react-router-dom";
import unknownProductImage from "../assets/unknown-pcpart.png";

function Catalog(props) {
	const [categoriesInputArr, setCategoriesInputArr] = useState([]);
	const [filter, setFilter] = useState("");
	const [priceRange, setPriceRange] = useState();
	const productsState = useSelector((state) => state.products);
	const products = productsState.products;
	const categories = productsState.categories;
	let isLoading = productsState.isLoadingInProgress;
	const dispatch = useDispatch();

	useEffect(() => {
		if (products.length === 0) {
			console.log("USEEFFECT");
			dispatch(getProducts());
		}
		if (categories.length === 0) {
			dispatch(getAllCategoriesApi());
		}
	}, []);

	let timer;
	const getCategoryProducts = (id, checked) => {
		if (timer) {
			clearTimeout(timer);
		}
		let categories = categoriesInputArr;
		if (checked === false) {
			let catIndex = categories.indexOf(id);
			categories.splice(catIndex, 1);
		} else if (categoriesInputArr.includes(id)) {
		} else {
			categories.push(id);
		}
		console.log(categories);
		setCategoriesInputArr(categories);
		let body = { categories: categoriesInputArr };
		console.log(body);
		dispatch(gettingProductInProgress());
		timer = setTimeout(() => {
			if (categoriesInputArr.length === 0) {
				dispatch(getProducts());
			}
			dispatch(getProductsWithCategories(body));
		}, 2000);
	};

	let timer2;
	const submitFilterForm = (id) => {
		if (timer2) {
			clearTimeout(timer2);
		}
		dispatch(gettingProductInProgress());
		timer2 = setTimeout(() => {
			switch (id) {
				case "asc-price":
					dispatch(sortProductsPrice(1));
					break;
				case "desc-price":
					dispatch(sortProductsPrice(-1));
					break;
				case "asc-name":
					dispatch(sortProductsName(1));
					break;
				case "desc-name":
					dispatch(sortProductsName(-1));
					break;
				default:
					return;
			}
			setFilter(id);
		}, 1000);
	};

	let timer3;
	const submitMaxPriceFilter = (_price) => {
		if (timer3) {
			console.log("cleared");
			clearTimeout(timer3);
		}
		timer3 = setTimeout(() => {
			for (let i = 0; i < categoriesInputArr.length; i++) {
				getCategoryProducts(categoriesInputArr[i], true);
			}
			if (
				(categoriesInputArr.length === 0 && products.length === 0) ||
				(categoriesInputArr.length === 0 && _price > priceRange)
			) {
				dispatch(getProducts());
			}
			setPriceRange(_price);
			submitFilterForm(filter);
			dispatch(maxPriceFilter(_price));
		}, 2000);
	};

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
														checked={categoriesInputArr.includes(
															cat._id
														)}
														label={cat.category}
														name="group1"
														type="checkbox"
														className=" d-block"
														id={cat._id}
														onChange={(e) =>
															getCategoryProducts(
																e.target.id,
																e.target.checked
															)
														}
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
											value={priceRange}
											min={0}
											max={200000}
											onChange={(e) =>
												submitMaxPriceFilter(
													e.target.value
												)
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
												checked={filter === "asc-name"}
												label="Name (A-Z)"
												name="group1"
												type="radio"
												className="d-block"
												id="asc-name"
												filter={1}
												onChange={(e) =>
													submitFilterForm(
														e.target.id
													)
												}
											/>
											<Form.Check
												inline
												checked={filter === "desc-name"}
												label="Name (Z-A)"
												name="group1"
												type="radio"
												className="d-block"
												id="desc-name"
												filter={2}
												onChange={(e) =>
													submitFilterForm(
														e.target.id
													)
												}
											/>
											<Form.Check
												inline
												checked={filter === "asc-price"}
												label="Ascending Price"
												name="group1"
												type="radio"
												className="d-block"
												id="asc-price"
												filter={3}
												onChange={(e) =>
													submitFilterForm(
														e.target.id
													)
												}
											/>
											<Form.Check
												inline
												checked={
													filter === "desc-price"
												}
												label="Descending Price"
												name="group1"
												type="radio"
												className="d-block"
												id="desc-price"
												filter={4}
												onChange={(e) =>
													submitFilterForm(
														e.target.id
													)
												}
											/>
										</div>
									</Form>
								</div>
							</div>
						</Col>
						<Col className="m-3">
							{isLoading ? (
								<Loader />
							) : (
								<Row>
									{products.map((prod, _id) => {
										return (
											<Col
												md={6}
												lg={3}
												className="p-3 pcparts-card justify-content-center"
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
															<h5>
																{prod.title}
															</h5>
														</b>
														<p>
															Rs.{" "}
															{
																prod.maxRetailPrice
															}
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
							)}
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
