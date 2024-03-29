const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
	{
		category: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
