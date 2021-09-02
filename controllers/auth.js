const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");
const { cleanApiData, generatePassword } = require("../utils/helper");

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
			const { _id, email, role } = user;
			const newUser = cleanApiData(user);
			const token = await jwt.sign(
				{ _id, email, role },
				process.env.JWT_SECRET,
				{
					expiresIn: "7d",
					algorithm: "HS256",
				}
			);
			res.cookie("auth_token", token, { httpOnly: true });
			res.cookie("is_logged_in", "true", {
				maxAge: 7 * 24 * 60 * 60 * 100,
			});
			return res.status(200).json({
				message: "Signup successful",
				user: newUser,
				ok: true,
			});
		} else {
			throw new Error("User could not be created");
		}
	} catch (error) {
		if (error.keyValue.email) {
			return res.status(400).json({
				message: "User already exists",
				ok: false,
			});
		}
		return res.status(500).json({
			message: "User could not be created",
			ok: false,
		});
	}
};

// login the user by giving him the token in cookies
module.exports.login = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({
				message: errors.errors[0].msg,
				ok: false,
			});
		}
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			const { _id, email, role } = user;
			if (user.validatePassword(password)) {
				const newUser = cleanApiData(user);
				const token = await jwt.sign(
					{ _id, email, role },
					process.env.JWT_SECRET,
					{
						expiresIn: "7d",
						algorithm: "HS256",
					}
				);
				res.cookie("auth_token", token, { httpOnly: true });
				res.cookie("is_logged_in", "true", {
					maxAge: 7 * 24 * 60 * 60 * 100,
				});
				return res.status(200).json({
					user: newUser,
					ok: true,
				});
			} else {
				throw "Invalid Id or password";
			}
		} else {
			throw "Invalid Id or password";
		}
	} catch (error) {
		return res.status(400).json({
			message: error,
			ok: false,
		});
	}
};

// for google login
module.exports.googleLogin = async (req, res) => {
	const { user } = req;

	if (user) {
		const { _id, email, role } = user;
		const newUser = cleanApiData(user);
		const token = await jwt.sign(
			{ _id, email, role },
			process.env.JWT_SECRET,
			{
				expiresIn: "7d",
				algorithm: "HS256",
			}
		);
		res.cookie("auth_token", token, { httpOnly: true });
		res.cookie("is_logged_in", "true", {
			maxAge: 7 * 24 * 60 * 60 * 100,
		});
		res.redirect(process.env.ORIGIN_NAME);
	}
};

// for signed in users simply remove the auth_token cookie
module.exports.logout = (req, res) => {
	if (req.cookies.auth_token) {
		res.clearCookie("auth_token");
		res.clearCookie("is_logged_in");
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

//  AUTH MIDDLEWARES

// decode the token and verify it
module.exports.isLoggedIn = [
	// sets the user in req.user
	expressJwt({
		getToken: (req) => {
			if (req.cookies.auth_token && req.cookies.is_logged_in) {
				return req.cookies.auth_token;
			}
			return null;
		},
		secret: process.env.JWT_SECRET,
		algorithms: ["HS256"],
	}),
	// if above code sends token as null
	function (err, req, res, next) {
		// if the user does not have either of the token
		if (!req.cookies.is_logged_in || !req.cookies.auth_token) {
			res.clearCookie("is_logged_in");
			res.clearCookie("auth_token");
			return res.status(400).json({
				message: "You have been logged out",
				ok: false,
			});
		}
		return res.status(403).json({
			message: "ACCESS DENIED",
			ok: false,
		});
	},
];

// to check if the user is admin
module.exports.isAdmin = (req, res, next) => {
	if (req.user.role === 0) {
		return res.status(403).json({
			message: "ACCESS DENIED",
			ok: false,
		});
	}
	next();
};
