const express = require("express");
const { isLoggedIn, isAdmin } = require("../controllers/auth");
const { getAllUsers, getUser, updateUser, getUserById } = require("../controllers/user");
const router = express.Router();

// get all users
router.get("/all", isLoggedIn, isAdmin, getAllUsers);
// get the user signed in
router.get("/", isLoggedIn, getUser);
// get particular user's information
router.get("/get/:userId", getUserById);
// update user information who is logged in 
router.put("/", isLoggedIn, updateUser)

module.exports = router;