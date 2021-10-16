const express = require("express");
const { isLoggedIn, isAdmin } = require("../controllers/auth");
const {
    getAllCategories,
    createCategory,
    assignCategoriesToProduct,
    getProductWithCategory,
    deleteSingleCategory
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
// get a product for certain category
router.get("/product/:categoryId", getProductWithCategory);
// delete a category
router.delete("/:categoryId", isLoggedIn, isAdmin, deleteSingleCategory)

module.exports = router;
