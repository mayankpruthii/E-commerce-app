const Category = require("../models/category");

module.exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if(categories) {
            return res.status(200).json({
                categories,
                ok: true
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            ok: false
        })
    }
};

module.exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        if(category) {
            return res.status(200).json({
                category,
                message: "Created successfully",
                ok: true
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            ok: false
        })
    }
};