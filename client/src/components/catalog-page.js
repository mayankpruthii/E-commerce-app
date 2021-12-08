import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
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
import { useParams, Redirect } from "react-router-dom";
import Pagination from "react-router-pagination";
import { BiFilterAlt } from "react-icons/bi";

import ProductsGrid from "./helpers/products-grid";
import { Loader } from "./helpers";

function Catalog(props) {
	const [categoriesInputArr, setCategoriesInputArr] = useState([]);
	const [filter, setFilter] = useState("");
	const [priceRange, setPriceRange] = useState();
	const [showMenu, setShowMenu] = useState(false);
	const [loading, setLoading] = useState(true);
	const { pageNumber } = useParams();
	const productsState = useSelector((state) => state.products);
	const _products = productsState.products;
	const categories = productsState.categories;
	let isLoading = productsState.isLoadingInProgress;
	const dispatch = useDispatch();

	const _firstProductIndex = (pageNumber - 1) * 12;
	const _lastProductIndex = pageNumber * 12;
	const products = _products.slice(_firstProductIndex, _lastProductIndex);
	const totalPages = Pagination.calculateTotalPages(_products.length, 12);

	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		
		dispatch(getProducts());
		
		if (categories.length === 0) {
			dispatch(getAllCategoriesApi());
		}
	}, []);

	if (props.screenWidth > 768 && showMenu === false) {
		setShowMenu(true);
	}

	if (loading) {
		return <Loader />;
	}

	if (totalPages < pageNumber) {
		return <Redirect to="/catalog/1" />;
	}

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

	const mobileMenuHandler = () => {
		setShowMenu(!showMenu);
	};

	return (
		<div>
			<Container fluid>
				<Row>
					{showMenu && (
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
														className="d-block"
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
					)}
					<ProductsGrid
						isLoading={isLoading}
						products={products}
						totalPages={totalPages}
						pageNumber={pageNumber}
					/>
					{props.screenWidth <= 768 && (
						<div
							style={styles.mobileBottomBar}
							className="bg-primary"
							onClick={mobileMenuHandler}
						>
							<BiFilterAlt className="text-white-50" />
							&nbsp;
							<span className="text-white-50">Filters</span>
						</div>
					)}
				</Row>
			</Container>
		</div>
	);
}

const styles = {
	mobileBottomBar: {
		height: "fit-content",
		padding: "1rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		bottom: 0,
		position: "fixed",
	},
};

export default Catalog;
