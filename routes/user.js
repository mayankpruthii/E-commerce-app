const express = require("express");
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getAllUsers, getUser, updateUser } = require("../controllers/user");
const router = express.Router();

router.get("/all", isLoggedIn, isAuthenticated, isAdmin, getAllUsers);
router.get("/", isLoggedIn, isAuthenticated, getUser);
router.put("/", isLoggedIn, isAuthenticated, updateUser)

module.exports = router;