import React from "react";
import { Image } from "react-bootstrap";
import loaderSVG from "../../assets/loader.svg";

function Loader(props) {
	return (
		<div style={style.loaderDiv}>
			<Image width={100} height="auto" src={loaderSVG} alt="loading" />
		</div>
	);
}

const style = {
  loaderDiv: {
    minHeight: "100vh",
    minWidth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}

export default Loader;
