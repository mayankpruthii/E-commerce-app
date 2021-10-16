import React, { useEffect } from "react";
import { Col, Container, Row, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

import { getProducts } from "../../actions/product";

function ProductAdminPage(props) {
	useEffect(() => {
		props.dispatch(getProducts(0));
	}, []);

	const { products } = props.products;

	return (
		<Container>
			<Row md={12}>
				<Col>
					<h2 className="align-middle d-inline-block">
						Products&nbsp;
					</h2>
					<Button
						className="btn-secondary btn-add"
						href="/admin/products/add"
					>
						Add Product
					</Button>
				</Col>
				<hr className="my-3" />
				{products.length === 0 ? (
					<Alert variant="danger">No products found!</Alert>
				) : (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Name</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Reviews no.</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{products.map((prod, _id) => {
								return (
									<tr>
										<td>
											<Link
												className="text-decoration-none text-primary"
												to={`/admin/products/${prod._id}`}
											>
												{prod.title}
											</Link>
										</td>
										<td>{prod.price}</td>
										<td>{prod.stock}</td>
										<td>{prod.reviews.length}</td>
										<td>
											<Link
												to={`/admin/products/id/${prod._id}`}
											>
												<BiEdit
													style={{
														height: "1.25em",
														width: "auto",
													}}
												/>
											</Link>
											&nbsp;
											<RiDeleteBinLine
												onClick={props.dispatch()}
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
	);
}

function mapStateToProps({ products }) {
	return {
		products,
	};
}

export default connect(mapStateToProps)(ProductAdminPage);
