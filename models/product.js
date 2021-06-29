const mongoose = require("mongoose");

// use this schema to fit the needs of the product to be sold
// for example size field can be added in schema for clothes
const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			maxlength: 64,
			unique: true,
			trim: true,
			required: true,
		},
		description: {
			type: String,
			trim: true,
		},
		price: {
			type: Number,
			trim: true,
			required: true,
		},
		stock: {
			type: Number,
			trim: true,
			required: true,
		},
		category: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Category",
			},
		],
		photo: [{
			type: String,
		}],
		reviews: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Review",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
