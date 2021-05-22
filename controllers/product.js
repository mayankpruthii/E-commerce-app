const Product = require("../models/product");
const { cleanApiData } = require("../utils/helper");

// adding a product
// can only be done by an admin
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
        return res.status(500).json({
            message: "Couldn't add product",
            ok: false,
        });
    }
};

// get one product and all the reviews associated with it
// along with user info
module.exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate({
            path: "reviews",
            model: "Review",
            select: "_id rating review",
            populate: {
                path: "user",
                model: "User",
                select: "name email _id"
            },
        });
        if (product) {
            const newProduct = cleanApiData(product);
            return res.status(200).json({
                product: newProduct,
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

// update any product
// can only be done by an admin
module.exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true },
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

// get all products
module.exports.getAllProducts = async (req, res) => {
    try {
        const { page } = req.query;
        const products = await Product.find()
            .skip(page * 20)
            .limit(20);
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