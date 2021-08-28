const express = require("express");
const { check } = require("express-validator");
const { signup, login, logout } = require("../controllers/auth");
const router = express.Router();

// for user signup
router.post(
    "/signup",
    [
        check("password")
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 characters long")
            .matches(/\d/)
            .withMessage("Password must contain a number"),
        check("email").isEmail().withMessage("Email not valid"),
    ],
    signup,
);

// for user login
router.post(
    "/login",
    [check("email").isEmail().withMessage("Email not valid")],
    login,
);

router.get("/logout", logout);

module.exports = router;
