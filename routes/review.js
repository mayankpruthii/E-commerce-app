const express = require("express");
const { isLoggedIn, isUserAuthorized } = require("../controllers/auth");
const {
	addReview,
	deleteReview,
	updateReview,
} = require("../controllers/review");
const router = express.Router();

// to post reviews by a user
router.post("/", isLoggedIn, addReview);
// to update review by a user
router.put("/:reviewId", isLoggedIn, updateReview);
// to delete review by a user
router.delete("/:reviewId", isLoggedIn, deleteReview);

module.exports = router;
