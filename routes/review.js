const express = require("express");
const { isAuthenticated, isLoggedIn } = require("../controllers/auth");
const { addReview } = require("../controllers/review");
const router = express.Router();

router.post("/", isLoggedIn, isAuthenticated, addReview);

module.exports = router;
