const User = require("../models/user");
const { cleanApiData } = require("../utils/helper");

module.exports.getUser = async (req, res) => {
    try {
        console.log(req.user);
        const user = await User.findOne({ _id: req.user._id });
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

module.exports.updateUser = async (req, res) => {
    try {
        const { body } = req;
        body.role = 0;
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