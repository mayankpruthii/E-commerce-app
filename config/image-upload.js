const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const User = require("../models/user");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "images");
	},
	filename: function (req, file, cb) {
		cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
	},
});

const fileFilter = (req, file, cb) => {
	const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
	if (allowedFileTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

module.exports.upload = multer({storage, fileFilter});