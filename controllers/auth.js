const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");
const { cleanApiData } = require("../utils/helper");

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

module.exports.login = async (req, res) => {
    try {
        console.log("TRIG");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.errors[0].msg,
                ok: false,
            });
        }
        const { email, password } = req.body;
        console.log("BODY", req.body)
        const user = await User.findOne({ email });
        if (user) {
            const { _id } = user;
            console.log(_id)
            if (user.validatePassword(password)) {
                newUser = cleanApiData(user);
                const token = await jwt.sign({ _id }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                    algorithm: "HS256"
                });
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
module.exports.isLoggedIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
})

module.exports.isAuthenticated = (req, res, next) => {
    if(!req.user) {
        return res.status(403).json({
            message: "ACCESS DENIED",
            ok: false
        })
    }
    next();
}

module.exports.isAdmin = (req, res, next) => {
    if(req.user.role === 0) {
        return res.status(403).json({
            message: "ACCESS DENIED",
            ok: false
        })
    }
    next();
}