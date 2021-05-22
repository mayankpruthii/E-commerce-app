const express = require("express");
const { isLoggedIn, isAdmin } = require("../controllers/auth");
const {
    getAllCategories,
    createCategory,
    assignCategoriesToProduct,
} = require("../controllers/category");
const router = express.Router();

// get all categories
router.get("/", getAllCategories);
// make a new category
router.post("/create", isLoggedIn, isAdmin, createCategory);
// assign category to a product
router.post(
    "/assign/:productId",
    isLoggedIn,
    isAdmin,
    assignCategoriesToProduct,
);

module.exports = router;
