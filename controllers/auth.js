const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");
const { cleanApiData } = require("../utils/helper");

// easy signup api
module.exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.errors[0].msg,
                ok: false,
            });
        }
        const user = await User.create(req.body);
        if (user) {
            return res.status(200).json({
                messafe: "Signup successful",
                ok: true,
            });
        }
    } catch (error) {
        if (error.keyValue.email) {
            return res.status(400).json({
                message: "User already exists",
                error,
                ok: false,
            });
        }
        return res.status(500).json({
            message: "User not created",
            error,
            ok: false,
        });
    }
};

// login the user by giving him the token
// TODO: frontend will store the token in localstorage
module.exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.errors[0].msg,
                ok: false,
            });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const { _id, email, role } = user;
            if (user.validatePassword(password)) {
                newUser = cleanApiData(user);
                const token = await jwt.sign(
                    { _id, email, role },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d",
                        algorithm: "HS256",
                    },
                );
                return res.status(200).json({
                    newUser,
                    token,
                    ok: true,
                });
            } else {
                return res.status(400).json({
                    message: "Invalid Id or password",
                    ok: false,
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            message: "Login fail",
            error,
            ok: false,
        });
    }
};

// middlewares
// decode the token and verify it
module.exports.isLoggedIn = [
    expressJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    }),
    function (err, req, res, next) {
        res.status(403).json({
            message: "ACCESS DENIED",
            ok: false,
        });
    },
];

// to check if the user is admin using jwt tokens
module.exports.isAdmin = (req, res, next) => {
    if (req.user.role === 0) {
        return res.status(403).json({
            message: "ACCESS DENIED",
            ok: false,
        });
    }
    next();
};
