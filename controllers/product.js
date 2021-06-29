const Product = require("../models/product");
const { cleanApiData } = require("../utils/helper");

// adding a product
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
        return res.status(500).json({
            message: "Couldn't add product",
            ok: false,
        });
    }
};

// only accessible to admin
// add images
module.exports.addImage = async(req, res) => {
    const file = req.file;
    const productId = req.id;
    console.log("FILE", file);
    if(!file) {
        return res.status(500).json({
            message: "Couldn't upload photo!",
            ok: false
        })
    }
    return res.status(200).json({
        message: "File saved!",
        ok: true
    })
    // res.send(file);
}

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
// accessible to admin only
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