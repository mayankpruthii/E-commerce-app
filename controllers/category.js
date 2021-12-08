const Category = require("../models/category");
const Product = require("../models/product");
const { cleanApiData } = require("../utils/helper");

// accessible to all
// get all categories in the app
module.exports.getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		if (categories) {
			return res.status(200).json({
				categories,
				ok: true,
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			ok: false,
		});
	}
};

// only accessible to admin panel
// create one category
module.exports.createCategory = async (req, res) => {
	try {
		const category = await Category.create(req.body);
		if (category) {
			return res.status(200).json({
				category,
				message: "Created successfully",
				ok: true,
			});
		}
	} catch (error) {
		if (error.code === 11000) {
			return res.status(500).json({
				message: "Category already exists",
				ok: false,
			});
		}
		return res.status(500).json({
			message: "Internal Server Error",
			ok: false,
		});
	}
};

// accessible only to admin
// assign multiple categories to a single product
module.exports.assignCategoriesToProduct = async (req, res) => {
	try {
		// req.body.categories going to be an array
		const { categories } = req.body;
		const product = await Product.findByIdAndUpdate(
			req.params.productId,
			{ category: [...categories] },
			{ new: true }
		);
		if (product) {
			await Category.updateMany(
				{ _id: { $in: categories } },
				{ $addToSet: { products: product } }
			);
			return res.json({
				message: "Category assigned successfully",
				ok: true,
			});
		}
	} catch (error) {
		return res.status(400).json({
			message: "Couldn't add products",
			error,
			ok: false,
		});
	}
};

// accessible to all
// get all products for single category
module.exports.getProductsWithCategories = async (req, res) => {
	try {
		const { categories } = req.body;
		// console.log("CATEGORIES", categories)
		const categoriesArr = await Category.find()
			.where("_id")
			.in(categories)
			.exec();
		if (categoriesArr.length === 0) {
			return res.status(404).json({
				message: "No products found",
				ok: false,
			});
		}
		let productsIds = [];
		for (let i = 0; i < categoriesArr.length; i++) {
			console.log(i, categoriesArr[i].products);
			productsIds = productsIds.concat(categoriesArr[i].products);
		}
		console.log(productsIds);
		const products = await Product.find({
			_id: { "$in": productsIds },
		}).select("photo title maxRetailPrice description");
		if (products) {
			return res.status(200).json({
				products,
				ok: true,
			});
		}
	} catch (error) {
		return res.status(400).json({
			error,
			message: "Couldn't get any products for the specified categories",
			ok: false,
		});
	}
};

// admin only route
// delete a category and pop from all the products category array
module.exports.deleteSingleCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.params.categoryId);
		if (category) {
			for (let i = 0; i < category.products.length; i++) {
				await Product.findByIdAndUpdate(category.products[i], {
					$pull: {
						category: req.params.categoryId,
					},
				});
			}
			await category.remove();
			return res.status(200).json({
				ok: true,
				message: "Category deleted successfully",
			});
		}
		return res.status(500).json({
			ok: false,
			message: "There was an error in finding the mentioned category",
		});
	} catch (error) {
		return res.status(400).json({
			ok: false,
			message: "Internal Server Error",
		});
	}
};

// admin only route
// edit a category name
module.exports.editSingleCategory = async (req, res) => {
	try {
		await Category.findByIdAndUpdate(req.params.categoryId, {
			category: req.body.category,
		});
		return res.status(200).json({
			ok: true,
			message: "Category name updated",
		});
	} catch (error) {
		if (error.code === 11000) {
			return res.status(500).json({
				message: "Category already exists",
				ok: false,
			});
		}
		return res.status(500).json({
			ok: false,
			message: "Internal Server Error",
		});
	}
};
