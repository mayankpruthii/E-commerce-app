const { Error } = require("mongoose");
const Product = require("../models/product");
const { cleanApiData } = require("../utils/helper");

// get one product and
// all the reviews associated with it and the review user name
module.exports.getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.productId).populate({
			path: "reviews",
			model: "Review",
			select: "_id rating review",
			populate: {
				path: "user",
				model: "User",
				select: "name email _id",
			},
		});
		if (product) {
			const cleanProduct = cleanApiData(product);
			cleanProduct.sellingPrice = product.sellingPrice;
			return res.status(200).json({
				product: cleanProduct,
				ok: true,
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: "Couldn't get product",
			ok: false,
		});
	}
};

module.exports.getAllProducts = async (req, res) => {
	try {
		console.log("HERE");
		let { page, price, sort } = req.query;
		// sorting criteria
		if (!price) {
			price = 200000;
		}
		let sortObj = {};
		switch (sort) {
			case "asc-price":
				sortObj = { maxRetailPrice: 1 };
				break;
			case "desc-price":
				sortObj = { maxRetailPrice: -1 };
				break;
			case "asc-name":
				sortObj = { title: 1 };
				break;
			case "desc-name":
				sortObj = { title: -1 };
				break;
			default:
				sortObj = { updatedAt: 1 };
				break;
		}
		console.log(price, sortObj, page);
		// find products
		const products = await Product.find({
			maxRetailPrice: { $lte: price },
		})
			.skip(20 * page)
			.limit(20)
			.sort(sortObj)
			.exec();
		console.log("PRODS", products);
		if (products) {
			return res.status(200).json({
				products,
				ok: true,
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: "Couldn't get products",
			ok: false,
		});
	}
};

// accessible to admin only
module.exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.productId);
		if (product) {
			product.remove();
			return res.status(200).json({
				message: "Product deletion successful",
				ok: true,
			});
		} else {
			return res.status(400).json({
				message: "Product doesn't exist",
				ok: false,
			});
		}
	} catch (err) {
		return res.status(500).json({
			message: "Internal server error",
			ok: false,
		});
	}
};

// accessible to admin only
module.exports.addProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body);
		if (product) {
			const newProduct = cleanApiData(product);
			return res.status(200).json({
				product: newProduct,
				ok: true,
			});
		}
	} catch (error) {
		if (error.code === 11000) {
			return res.status(500).json({
				message: "Product name already exists",
				ok: false,
			});
		}
		return res.status(500).json({
			message: "Couldn't add product",
			ok: false,
		});
	}
};

// only accessible to admin
module.exports.addProductImage = async (req, res) => {
	try {
		const { filename } = req.file;
		const { productId } = req.body;
		if (!req.file) {
			throw new Error("Multer error! File not found!");
		}
		let product = await Product.findById(productId);
		product.photo = "http://" + req.get("host") + "/images/" + filename;
		await product.save();
		return res.status(200).json({
			message: "File saved!",
			product,
			ok: true,
		});
	} catch (err) {
		return res.status(500).json({
			err,
			message: "Couldn't upload photo(s)!",
			ok: false,
		});
	}
};

// accessible to admin only
module.exports.updateProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(
			req.params.productId,
			req.body,
			{ new: true }
		);
		if (product) {
			const newProduct = cleanApiData(product);
			return res.status(200).json({
				product: newProduct,
				ok: true,
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: "Couldn't update product",
			ok: false,
		});
	}
};
