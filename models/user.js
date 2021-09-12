require("dotenv").config();
const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		role: {
			type: Number,
			default: 0,
		},
		salt: {
			type: String,
			required: true,
		},
		encrypted_password: {
			type: String,
			required: true,
		},
		itemsInCart: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		purchases: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Products",
			},
		],
		isVerified: {
			type: Boolean,
			default: false,
		},
		reviews: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Review",
			},
		],
		address: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

userSchema
	.virtual("password")
	.set(function (password) {
		this._password = password;
		this.salt = uuidv4();
		this.encrypted_password = this.securePassword(this._password);
	})
	.get(function () {
		return this._password;
	});

userSchema.methods = {
	securePassword: function (_password) {
		if (!_password) {
			return "";
		}
		try {
			const hash = crypto
				.createHmac("sha256", this.salt)
				.update(_password)
				.digest("hex");
			return hash;
		} catch (error) {
			return "";
		}
	},
	validatePassword: function (_password) {
		return this.securePassword(_password) === this.encrypted_password;
	},
};

const User = mongoose.model("User", userSchema);
module.exports = User;
