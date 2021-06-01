const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");
const { cleanApiData } = require("../utils/helper");

// signup api controller
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

// login the user by giving him the token in cookies
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
				const token = await jwt.sign({ _id, email, role }, process.env.JWT_SECRET, {
					expiresIn: "7d",
					algorithm: "HS256",
				});
				res.cookie("login_token", token, { httpOnly: true });
				return res.status(200).json({
					newUser,
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

// for signed in users simply remove the login_token cookie
module.exports.logout = (req, res) => {
	if (req.cookies.login_token) {
		res.clearCookie("login_token");
		res.status(200).json({
			message: "Logout success!",
			ok: true,
		});
	} else {
		return res.status(400).json({
			error: "No login token found!",
			ok: false,
		});
	}
};

//////////////////////////////////////
///////  AUTH MIDDLEWARES  ///////////
//////////////////////////////////////

// decode the token and verify it
module.exports.isLoggedIn = [
	// sets the user in req.user
	expressJwt({
		getToken: (req) => req.cookies.login_token,
		secret: process.env.JWT_SECRET,
		algorithms: ["HS256"],
	}),
	function (err, req, res, next) {
		return res.status(403).json({
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