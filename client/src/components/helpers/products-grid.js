import React, { useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "react-router-pagination";
import { Loader } from ".";

import unknownProductImage from "../../assets/unknown-pcpart.png";

function ProductsGrid(props) {
	const { isLoading, products, totalPages, pageNumber } = props;

	useEffect(() => {
		console.log(products);
	}, []);

	return (
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
											<h5>{prod.title}</h5>
										</b>
										<pre
											style={{
												fontSize: "1.25rem",
											}}
											className="text-secondary"
										>
											Rs.{""}
											{prod.maxRetailPrice}
										</pre>
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
			{totalPages !== 1 && (
				<div style={{ display: "flex" }}>
					<span
						style={{
							width: "fit-content",
							marginRight: "5px",
						}}
					>
						Page number:{" "}
					</span>
					<div style={{ display: "inline" }}>
						<Pagination
							totalPages={totalPages}
							pageNumber={pageNumber}
							onClick={() => {
								document.body.scrollTop = 0;
								document.documentElement.scrollTop = 0;
							}}
							match={{
								path: "/catalog/:pageNumber",
							}}
						/>
					</div>
				</div>
			)}
		</Col>
	);
}

export default ProductsGrid;
