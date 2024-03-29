const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
	rating: {
		type: Number,
		required: true,
		trim: true,
	},
	review: {
		type: String,
		required: true,
		trim: true,
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
