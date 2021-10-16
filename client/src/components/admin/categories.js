import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	Container,
	Row,
	Col,
	Table,
	Button,
	Alert,
	Form,
	FloatingLabel,
} from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";

import {
	addCategoryApi,
	categoriesError,
	clearCategoriesError,
	deleteCategoryApi,
	getAllCategoriesApi,
	updateCategoryApi,
} from "../../actions/product";
import { VerticalCenteredModal } from "../helpers";

function Categories(props) {
	const [categoryModal, setcategoryModal] = useState(false);
	const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
	const [categoryid, setCategoryid] = useState(-1);
	const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
	const [category, setcategory] = useState("");
	const [categoryError, setcategoryError] = useState("");

	useEffect(() => {
		if (props.products.categories.length === 0) {
			props.dispatch(getAllCategoriesApi());
		}
	}, []);

	const { categories } = props.products;

	const setcategoryHandler = (val) => {
		setcategoryError("");
		setcategory(val);
		return;
	};

	// add new category handler and modal body
	const addNewCategory = () => {
		if (category.length < 3 || category.length > 20) {
			return setcategoryError(
				"Category should be atleast 3 characters and less than 20 characters"
			);
		}
		props.dispatch(addCategoryApi(category));
		setTimeout(() => {
			setcategoryModal(false);
			if (!props.products.categoriesError) {
				toast.success("New category was added successfully");
			}
		}, 500);
	};

	const categoryModalBody = (
		<div>
			<FloatingLabel controlId="newCategory" label="Category Name">
				<Form.Control
					type="text"
					placeholder="Category Name"
					onChange={(e) => setcategoryHandler(e.target.value)}
					isInvalid={!!categoryError}
				/>
				<Form.Control.Feedback type="invalid">
					{categoryError}
				</Form.Control.Feedback>
			</FloatingLabel>
			<Button className="mt-3" onClick={addNewCategory}>
				Add
			</Button>
		</div>
	);

	// update category handler and modal body
	const updateCategoryHandler = () => {
		if (category.length < 3 || category.length > 20) {
			return setcategoryError(
				"Category should be atleast 3 characters and less than 20 characters"
			);
		}
		if (categoryid === -1 || categoryid >= categories.length) {
			return props.dispatch(categoriesError("Internal Server Error"));
		}
		props.dispatch(updateCategoryApi(categoryid, category));
		setTimeout(() => {
			setUpdateCategoryModal(false);
			toast.success("Category updation successful");
		}, 500);
	};

	const updateCategoryModalBody = (
		<div>
			<FloatingLabel controlId="newCategory" label="Category Name">
				<Form.Control
					type="text"
					placeholder="Category Name"
					onChange={(e) => setcategoryHandler(e.target.value)}
					isInvalid={!!categoryError}
				/>
				<Form.Control.Feedback type="invalid">
					{categoryError}
				</Form.Control.Feedback>
			</FloatingLabel>
			<Button className="mt-3" onClick={() => updateCategoryHandler()}>
				Update
			</Button>
		</div>
	);

	// delete category handler and modal body
	const deleteCategoryHandler = () => {
		if (categoryid === -1 || categoryid >= categories.length) {
			return props.dispatch(categoriesError("Internal Server Error"));
		}
		props.dispatch(deleteCategoryApi(categoryid));
		setTimeout(() => {
			setDeleteCategoryModal(false);
			if (!props.products.categoriesError) {
				toast.success("Category deletion successful");
			}
		}, 500);
	};

	const deleteCategoryModalBody = (
		<div>
			<Button
				className="btn-default border-0 bg-danger"
				onClick={deleteCategoryHandler}
			>
				Delete
			</Button>
			&nbsp; &nbsp; &nbsp;
			<span
				className="pointer"
				onClick={() => setDeleteCategoryModal(false)}
			>
				Cancel
			</span>
		</div>
	);

	return (
		<div>
			<Container>
				<Row md={12}>
					<Col>
						{!props.products.categoriesError && (
							<Toaster
								position="top-center"
								reverseOrder={false}
							/>
						)}
						<VerticalCenteredModal
							show={categoryModal}
							heading="Enter a new Category Name"
							body={categoryModalBody}
							onHide={() => setcategoryModal(false)}
						/>
						<VerticalCenteredModal
							show={updateCategoryModal}
							heading="Enter following details to update category"
							body={updateCategoryModalBody}
							onHide={() => setUpdateCategoryModal(false)}
						/>
						<VerticalCenteredModal
							show={deleteCategoryModal}
							heading="Are you sure you want to delete this category?"
							body={deleteCategoryModalBody}
							onHide={() => setDeleteCategoryModal(false)}
						/>
						<h2 className="align-middle d-inline-block">
							Categories&nbsp;
						</h2>
						<Button
							className="btn-add"
							onClick={() => setcategoryModal(true)}
						>
							Add Category
						</Button>
					</Col>
					<hr className="my-3" />
					{props.products.categoriesError && (
						<Alert variant="danger">
							{props.products.categoriesError}
						</Alert>
					)}
					{categories && categories.length !== 0 && (
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Category</th>
									<th>No. of Products</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{categories.map((category, _id) => {
									return (
										<tr key={_id}>
											<td>{category.category}</td>
											<td>{category.products.length}</td>
											<td>
												<BiEdit
													onClick={() => {
														setCategoryid(
															category._id
														);
														setUpdateCategoryModal(
															true
														);
														props.dispatch(
															clearCategoriesError()
														);
													}}
													style={{
														height: "1.25em",
														width: "auto",
													}}
												/>
												&nbsp;
												<RiDeleteBinLine
													onClick={() => {
														setCategoryid(
															category._id
														);
														setDeleteCategoryModal(
															true
														);
														props.dispatch(
															clearCategoriesError()
														);
													}}
													style={{
														height: "1.25em",
														width: "auto",
													}}
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					)}
				</Row>
			</Container>
		</div>
	);
}

function mapStateToProps({ products }) {
	return {
		products,
	};
}

export default connect(mapStateToProps)(Categories);
