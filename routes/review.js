const express = require("express");
const { isLoggedIn } = require("../controllers/auth");
const { addReview } = require("../controllers/review");
const router = express.Router();

// to post reviews by a user
router.post("/", isLoggedIn, addReview);

module.exports = router;
