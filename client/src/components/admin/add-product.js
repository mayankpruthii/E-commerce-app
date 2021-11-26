import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Alert } from "react-bootstrap";
import { connect } from "react-redux";


import {
	addProductApi,
	clearError,
	getAllCategoriesApi,
	productSuccessClear,
} from "../../actions/product";

function AddProduct(props) {
	const [form, setForm] = useState({
		title: "",
		description: "",
		maxRetailPrice: "",
		discount: "",
		stock: "",
		categories: [],
	});
	const [errors, setErrors] = useState({
		title: "",
		description: "",
		maxRetailPrice: "",
		discount: "",
		stock: "",
	});

	useEffect(() => {
		if (props.products.categories.length !== 0) {
			return;
		}
		props.dispatch(getAllCategoriesApi());
		props.dispatch(productSuccessClear());
		props.dispatch(clearError());
	}, []);

	// form controller
	const setField = (field, value) => {
		if (field === "title" && value.length > 64) {
			return setErrors({
				...errors,
				[field]: "Title can't be longer than 64 characters",
			});
		} else if (field === "discount" && isNaN(value)) {
			return setErrors({
				...form,
				[field]: "Discount has to be a number only",
			});
		} else if (field === "discount" && (value > 99 || value < 0)) {
			return setErrors({
				...errors,
				[field]: "Discount can only be in between 0 and 99",
			});
		} else if (field === "maxRetailPrice" && isNaN(value)) {
			return setErrors({
				...errors,
				[field]: "Max Retail Price has to be a number only",
			});
		} else if (
			field === "maxRetailPrice" &&
			(value > 100000 || value < 0)
		) {
			return setErrors({
				...errors,
				[field]: "Max Retail Price can only be between 0 and 1,00,000",
			});
		} else if (field === "stock" && isNaN(value)) {
			return setErrors({
				...errors,
				[field]: "Stock has to be a number only",
			});
		} else if (field === "stock" && (value > 200 || value < 1)) {
			return setErrors({
				...errors,
				[field]: "Stock can only be between 1 and 200",
			});
		}
		if (field === "category") {
			let newArr = form.categories;
			let index = newArr.indexOf(value);
			if (index !== -1) {
				newArr.splice(index, 1);
			} else {
				newArr.push(value);
			}
			setForm({
				...form,
				categories: newArr,
			});
			return;
		}
		setErrors({
			...errors,
			[field]: "",
		});
		setForm({
			...form,
			[field]: value,
		});
	};

	// reset all values
	const clearAllValues = () => {
		window.location.reload();
	};

	// handle submit button
	const submitFormHandler = () => {
		props.dispatch(productSuccessClear());
		let newErrors = {};
		if (form.title.trim() === "") {
			newErrors["title"] = "Title cannot be empty";
		}
		if (form.description === "") {
			newErrors["description"] = "Description cannot be empty";
		}
		if (form.maxRetailPrice.trim() === "") {
			newErrors["maxRetailPrice"] = "Max Retail Price cannot be empty";
		}
		if (form.discount.trim() === "") {
			newErrors["discount"] = "Discount cannot be empty";
		}
		if (form.stock.trim() === "") {
			newErrors["stock"] = "Stock cannot be empty";
		}
		if (Object.keys(newErrors).length !== 0) {
			return setErrors(newErrors);
		}
		for (let itr in Object.values(errors)) {
			if (Object.values(errors)[itr] !== "") {
				return;
			}
			continue;
		}
		console.log("trig");
		return props.dispatch(addProductApi(form));
	};

	return (
		<Container>
			{/* Header */}
			<Row md={12}>
				<Col>
					<h2 className="align-middle d-inline-block">
						Add Product&nbsp;
					</h2>
					<Button className="btn-add" href="/admin/products/add">
						Add Another Product
					</Button>
				</Col>
				<hr className="my-3" />
			</Row>

			{/* Input Form */}
			<Row>
				{props.products.productSuccess && (
					<Alert variant="secondary">
						Product added successfully
					</Alert>
				)}
				{props.products.error && (
					<Alert variant="danger">{props.products.error}</Alert>
				)}
				<p>Please fill in the following product details</p>
				<Form id="add-product-form">
					<Form.Group as={Row} className="mb-3" controlId="title">
						<Form.Label column sm={2}>
							Title<span className="text-danger"> *</span>
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								type="text"
								onChange={(e) =>
									setField("title", e.target.value)
								}
								isInvalid={!!errors.title}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.title}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<Form.Group
						as={Row}
						className="mb-3"
						controlId="description"
					>
						<Form.Label column sm={2}>
							Description<span className="text-danger"> *</span>
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								as="textarea"
								rows={3}
								// type="text"
								onChange={(e) =>
									setField("description", e.target.value)
								}
								isInvalid={!!errors.description}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.description}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<Form.Group
						as={Row}
						className="mb-3"
						controlId="maxRetailPrice"
					>
						<Form.Label column sm={2}>
							Max Retail Price
							<span className="text-danger"> *</span>
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								type="text"
								onChange={(e) =>
									setField("maxRetailPrice", e.target.value)
								}
								isInvalid={!!errors.maxRetailPrice}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.maxRetailPrice}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="discount">
						<Form.Label column sm={2}>
							Discount<span className="text-danger"> *</span>
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								type="text"
								onChange={(e) =>
									setField("discount", e.target.value)
								}
								isInvalid={!!errors.discount}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.discount}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<Form.Group
						as={Row}
						className="mb-3"
						controlId="unitsInStock"
					>
						<Form.Label column sm={2}>
							Units In Stock
							<span className="text-danger"> *</span>
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								type="text"
								onChange={(e) =>
									setField("stock", e.target.value)
								}
								isInvalid={!!errors.stock}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.stock}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="formFile" className="mb-3">
						<Form.Label column sm={2}>
							Image
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								type="file"
								onChange={(e) =>
									setField("photo", e.target.files[0])
								}
								isInvalid={!!errors.photo}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.photo}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<fieldset>
						<Form.Group
							as={Row}
							controlId="categories"
							className="mb-3"
						>
							<Form.Label as="legend" column sm={2}>
								Categories
							</Form.Label>
							{props.products.categoriesError && (
								<Col sm={10}>
									<Alert variant="danger">
										{props.products.categoriesError}
									</Alert>
								</Col>
							)}
							<Col
								sm={10}
								style={{ height: "auto", maxHeight: "200px" }}
								className="overflow-auto"
							>
								{props.products.categories.map(
									(category, _id) => {
										return (
											<Form.Check
												key={_id}
												label={category.category}
												name={category._id}
												id={category.category}
												onChange={(e) =>
													setField(
														"category",
														e.target.name
													)
												}
											/>
										);
									}
								)}
							</Col>
						</Form.Group>
					</fieldset>

					<Form.Group as={Row} className="mb-3">
						<Col sm={{ span: 10, offset: 2 }}>
							<Button onClick={submitFormHandler}>Add</Button>
							<p
								href="#"
								className="float-end text-danger pointer"
								onClick={clearAllValues}
							>
								Reset all values
							</p>
						</Col>
					</Form.Group>
				</Form>
				<pre className="float-end">
					Fields marked with<span className="text-danger"> *</span>{" "}
					are mandatory!
				</pre>
			</Row>
		</Container>
	);
}

function mapStateToProps({ products }) {
	return {
		products,
	};
}

export default connect(mapStateToProps)(AddProduct);
