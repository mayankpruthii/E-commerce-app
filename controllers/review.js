const Product = require("../models/product");
const Review = require("../models/review");
const User = require("../models/user");

// get reviews for a product
// module.exports.getProductReviews = async

// add a review
// accessible to logged in user
module.exports.addReview = async (req, res) => {
	try {
		const { body } = req;
		body.user = req.user._id;
		const review = await Review.create(body);
		if (review) {
			const product = await Product.findById(body.product);
			if (product) {
				product.reviews.push(review._id);
				await product.save();
			}
			const user = await User.findById(body.user);
			if (user) {
				user.reviews.push(review._id);
				await user.save();
			}
			return res.status(200).json({
				review,
				ok: true,
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: "Review couldn't be added",
			error,
			ok: false,
		});
	}
};

// update a review by the logged in user
module.exports.updateReview = async (req, res) => {
	try {
		const id = req.params.reviewId;
		let review = await Review.findById(id);
		if (review.user._id == req.user._id) {
			Object.assign(review, req.body);
			await review.save();
			return res.status(200).json({
				message: "Review updated successfully!",
				ok: true,
			});
		}
		return res.status(403).json({
			message: "Couldn't update review!",
			ok: false,
		});
	} catch (error) {
		return res.status(500).json({
			error,
			message: "Couldn't update review!",
			ok: false,
		});
	}
};

// delete review by the logged in user
module.exports.deleteReview = async (req, res) => {
	try {
		const id = req.params.reviewId;
		const review = await Review.findById(id);
		if (review.user._id == req.user._id) {
			review.remove();
			return res.status(200).json({
				message: "Review deleted successfully!",
				ok: true,
			});
		}
		return res.status(403).json({
			message: "Couldn't delete review!",
			ok: false,
		});
	} catch (error) {
		return res.status(500).json({
			error,
			message: "Couldn't delete review!",
			ok: false,
		});
	}
};
