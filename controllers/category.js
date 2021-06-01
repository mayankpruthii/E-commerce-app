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
            { new: true },
        );
        if (product) {
            await Category.updateMany(
                { _id: { $in: categories } },
                { $addToSet: { products: product } },
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
module.exports.getProductWithCategory = async (req, res) => {
    try {
        const _category = await Category.find({
            _id: req.params.categoryId,
        }).select("products");
        const productsIdList = _category[0].products;
        const products = await Product.find({
            _id: { $in: productsIdList },
        }).select("title price");
        if (_category && _category[0].products) {
            return res.status(200).json({
                products,
                ok: true,
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: "Couldn't get any products for the specified category",
            ok: false,
        });
    }
};
