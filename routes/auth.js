const express = require("express");
const { check } = require("express-validator");

const { signup, login } = require("../controllers/auth");

const router = express.Router();

router.post(
    "/signup",
    [
        check("password")
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 chars long")
            .matches(/\d/)
            .withMessage("Password must contain a number"),
        check("email").isEmail().withMessage("Email not valid"),
    ],
    signup,
);

router.post(
    "/login",
    [check("email").isEmail().withMessage("Email not valid")],
    login,
);

module.exports = router;
