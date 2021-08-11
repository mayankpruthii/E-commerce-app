import React from "react";
import { Button } from "react-bootstrap";
import wavyBackground from "../assets/wavy-background.png";

function Error404(props) {
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
				<Button className="mt-3" style={styles.btn}>Take me back to safety!</Button>
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
    // transform: "translate(0, -50%)"
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
