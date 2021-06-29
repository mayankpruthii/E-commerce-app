const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		product: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		transaction_id: {
			type: String,
			required: true,
		},
		total_amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			default: "Order placed",
		},
		updated: Date,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
