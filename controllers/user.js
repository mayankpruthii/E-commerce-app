const User = require("../models/user");
const { cleanApiData } = require("../utils/helper");

// get a single user
// only accessible to the user signed in
module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }).populate({
            path: "reviews",
            model: "Review",
            select: "rating review product",
            populate: {
                path: "product",
                model: "Product",
                select: "title",
            },
        });
        if (user) {
            const newUser = cleanApiData(user);
            return res.status(200).json({
                user: newUser,
                ok: true,
            });
        }
    } catch (error) {
        return res.status(422).json({
            message: "User not found",
            ok: false,
        });
    }
};

// get user by id
// accessible to everyone
module.exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        if (user) {
            user.populate({
                path: "reviews",
                model: "Review",
                select: "rating review product",
                populate: {
                    path: "product",
                    model: "Product",
                    select: "title",
                },
            });
            return res.status(200).json({
                user: {
                    name: user.name,
                    reviews: user.reviews,
                },
                ok: true,
            });
        }
    } catch (error) {
        return res.status(422).json({
            message: "User not found",
            ok: false,
        });
    }
};

// get all user information
// only accessible by admin
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users) {
            return res.status(200).json({
                users,
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

// logged in users can update their account
module.exports.updateUser = async (req, res) => {
    try {
        const { body } = req;
        let file;
        // so they cant update their role
        body.role = 0;
        if(req.file) {
            image = req.file.filename;
        }
        const newUser = {
            body,
            image
        }
        console.log(newUser);
        const user = await User.findByIdAndUpdate(req.user._id, body, {
            new: true,
        });
        if (user) {
            const newUser = cleanApiData(user);
            return res.status(200).json({
                user: newUser,
                ok: true,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error,
            ok: false,
        });
    }
};
