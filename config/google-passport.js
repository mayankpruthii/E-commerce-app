require("dotenv").config();
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user");
const { generatePassword } = require("../utils/helper");

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new googleStrategy(
		{
			clientID: process.env.GOOGLE_WEB_CLIENT_ID,
			clientSecret: process.env.GOOGLE_WEB_CLIENT_SECRET,
			callbackURL: "http://localhost:5000/api/auth/google/callback",
			proxy: true,
		},
		function (accessToken, refreshToken, profile, done) {
			User.findOne({ email: profile.emails[0].value }).exec(function (
				err,
				user
			) {
				if (err) {
					done(err, null);
				}
				if (user) {
					return done(null, user);
				} else {
					User.create(
						{
							name: profile.displayName,
							email: profile.emails[0].value,
							password: generatePassword(),
						},
						(err, user) => {
							if (err) {
								done(err, null);
							} else {
								return done(null, user);
							}
						}
					);
				}
			});
		}
	)
);
