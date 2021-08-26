require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
	cors({
		origin: true,
		optionsSuccessStatus: 200,
		credentials: true
	})
);
app.use(function (req, res, next) {
	res.header("Content-Type", "application/json;charset=UTF-8");
	res.header("Access-Control-Allow-Credentials", true);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Origin", process.env.ORIGIN_NAME);
	next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/images", express.static("images"));

app.use("/api", require("./routes"));

app.listen(process.env.PORT, () => {
	console.log(`App running on port ${process.env.PORT}`);
});
