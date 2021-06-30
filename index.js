require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use("/images", express.static("images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", require("./routes"));

app.listen(process.env.PORT, () => {
	console.log(`App running on port ${process.env.PORT}`);
});
