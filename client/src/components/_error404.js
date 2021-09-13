import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { Loader } from "./helpers";
import wavyBackground from "../assets/wavy-background.png";
import { Link } from "react-router-dom";

function Error404(props) {
	const [isLoading, isLoadingHandler] = useState(true);

	setTimeout(() => {
		isLoadingHandler(false);
	}, 1000);

	if (isLoading) {
		return <Loader />;
	}

	console.log("error");
	return (
		<div>
			<img
				style={styles.backgroundStyling}
				src={wavyBackground}
				alt="background"
			/>
			<div style={styles.content}>
				<h1 style={styles.errorHeading}>
					Oops! The page you are searching for doesn't exist!
				</h1>
				<Link to="/" className="text-decoration-none">
					<Button className="mt-3" style={styles.btn}>
						Take me back to safety!
					</Button>
				</Link>
			</div>
		</div>
	);
}

const styles = {
	backgroundStyling: {
		position: "relative",
		height: "70vh",
		width: "100%",
		backgroundRepeat: "no-repeat",
	},
	content: {
		width: "80%",
		position: "absolute",
		top: "15%",
		left: "10%",
	},
	errorHeading: {
		color: "white",
	},
	btn: {
		backgroundColor: "white",
		color: "#202020",
	},
};

export default Error404;
