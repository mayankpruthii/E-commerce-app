const Product = require("../models/product");
const Review = require("../models/review");
const User = require("../models/user");

module.exports.addReview = async (req, res) => {
    try {
        const { body } = req;
        body.user = req.user._id;
        const review = await Review.create(body);
        if (review) {
            const product = await Product.findById(body.product);
            if (product) {
                product.reviews.push(review._id);
                product.save();
            }
            const user = await User.findById(body.user);
            if (user) {
                user.reviews.push(review._id);
                user.save();
            }
            return res.status(200).json({
                review,
                ok: true,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Review couldn't be added",
            error,
            ok: false,
        });
    }
};