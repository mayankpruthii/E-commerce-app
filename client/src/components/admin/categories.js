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

import {
	addCategoryApi,
	getAllCategoriesApi,
	getProducts,
} from "../../actions/product";
import { VerticalCenteredModal } from "../helpers";

function Categories(props) {
	const [categoryModal, setcategoryModal] = useState(false);
	const [category, setcategory] = useState("");
	const [categoryError, setcategoryError] = useState("");

	useEffect(() => {
		if (props.products.categories.length === 0) {
			props.dispatch(getAllCategoriesApi());
		}
	}, []);

	const { categories } = props.products;

	const addNewCategory = () => {
		if (category.length < 3 || category.length > 20) {
			return setcategoryError(
				"Category should be atleast 3 characters and less than 20 characters"
			);
		}
		props.dispatch(addCategoryApi(category));
		setcategoryModal(false);
	};

	const setcategoryHandler = (val) => {
		setcategoryError("");
		setcategory(val);
		return;
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

	return (
		<div>
			<Container>
				<Row md={12}>
					<Col>
						<VerticalCenteredModal
							show={categoryModal}
							heading="Enter a new Category Name!"
							body={categoryModalBody}
							onHide={() => setcategoryModal(false)}
						/>
						<h2 className="align-middle d-inline-block">
							Categories&nbsp;
						</h2>
						<Button
							className="btn-secondary btn-add"
							onClick={() => setcategoryModal(true)}
						>
							Add Category
						</Button>
					</Col>
					<hr className="my-3" />
					{categories && categories.length !== 0 ? (
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Category</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{categories.map((category, _id) => {
									return (
										<tr key={_id}>
											<td>{category.category}</td>
											<td>
												<BiEdit
													style={{
														height: "1.25em",
														width: "auto",
													}}
												/>
												&nbsp;
												<RiDeleteBinLine
													// onClick={props.dispatch()}
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
					) : (
						<Alert variant="danger">
							{props.products.categoriesError}
							Error
						</Alert>
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
