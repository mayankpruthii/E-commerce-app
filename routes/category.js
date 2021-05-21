const express = require("express");
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {getAllCategories ,createCategory} = require("../controllers/category");
const router = express.Router();

router.get("/", getAllCategories);
router.post("/create", isLoggedIn, isAuthenticated, isAdmin, createCategory)

module.exports = router;