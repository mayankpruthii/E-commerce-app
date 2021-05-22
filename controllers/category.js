const Category = require("../models/category");
const Product = require("../models/product");
const { cleanApiData } = require("../utils/helper");

// accessible to all
// get all categories
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

// accessible only to admin panel
module.exports.assignCategoriesToProduct = async (req, res) => {
    try {
        console.log("here");
        // req.body.categories going to be an array
        const { categories } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.productId,
            { category: [...categories] },
            { new: true },
        );
        if (product) {
            console.log("PRODUCT", product);
            console.log("CATEGORIES", categories);
            await Category.updateMany(
                { _id: { $in: categories } },
                { $addToSet: {products: product} },
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
