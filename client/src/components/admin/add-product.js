import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Alert } from "react-bootstrap";
import { connect } from "react-redux";

import { getAllCategoriesApi } from "../../actions/product";

function AddProduct(props) {
	const [form, setForm] = useState({});
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (props.products.categories.length !== 0) {
			return;
		}
		props.dispatch(getAllCategoriesApi());
	}, [props]);

	const setField = (field, value) => {
		if (field === "title" && value.length > 64) {
			return setErrors({
				...form,
				[field]: "Title can't be larger than 64 characters",
			});
		} else if (field === "discount" && isNaN(value)) {
			return setErrors({
				...form,
				[field]: "Discount has to be a number only",
			});
		} else if (field === "discount" && (value > 99 || value < 0)) {
			return setErrors({
				...form,
				[field]: "Discount can only be in between 0 and 99",
			});
		} else if (field === "maxRetailPrice" && isNaN(value)) {
			return setErrors({
				...form,
				[field]: "Max Retail Price has to be a number only",
			});
		} else if (
			field === "maxRetailPrice" &&
			(value > 100000 || value < 0)
		) {
			return setErrors({
				...form,
				[field]: "Max Retail Price can only be between 0 and 1,00,000",
			});
		} else if (field === "stock" && isNaN(value)) {
			return setErrors({
				...form,
				[field]: "Stock has to be a number only",
			});
		} else if (field === "stock" && (value > 200 || value < 1)) {
			return setErrors({
				...form,
				[field]: "Stock can only be between 1 and 200",
			});
		}
		setErrors({
			...form,
			[field]: "",
		});
		setForm({
			...form,
			[field]: value,
		});
	};

	return (
		<Container>
			{/* Header */}
			<Row md={12}>
				<Col>
					<h2 className="align-middle d-inline-block">
						Add Product&nbsp;
					</h2>
					<Button
						className="btn btn-secondary btn-add"
						href="/admin/products/add"
					>
						Add Another Product
					</Button>
				</Col>
				<hr className="my-3" />
			</Row>

			{/* Input Form */}
			<Row>
				<p>Please fill in the following product details</p>
				<Form>
					<Form.Group as={Row} className="mb-3" controlId="title">
						<Form.Label column sm={2}>
							Title
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
							Description
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
							Discount
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
									setField("photo", e.target.value)
								}
								isInvalid={!!errors.photo}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.photo}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<fieldset>
						<Form.Group as={Row} className="mb-3">
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
							<Col sm={10}>
								{props.products.categories.map((category) => {
									return (
										<Form.Check
											type="radio"
											label={category}
											name={category}
											id={category}
										/>
									);
								})}
							</Col>
						</Form.Group>
					</fieldset>

					<Form.Group as={Row} className="mb-3">
						<Col sm={{ span: 10, offset: 2 }}>
							<Button type="submit">Add</Button>
							<p
								href="#"
								className="float-end text-danger"
								style={{ cursor: "pointer" }}
							>
								Reset all values
							</p>
						</Col>
					</Form.Group>
				</Form>
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
