const express = require("express");
const { isLoggedIn, isAdmin } = require("../controllers/auth");
const {
    getAllCategories,
    createCategory,
    assignCategoriesToProduct,
    getProductsWithCategories,
    deleteSingleCategory,
    editSingleCategory
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
router.get("/products/get", getProductsWithCategories);
// delete a category
router.delete("/:categoryId", isLoggedIn, isAdmin, deleteSingleCategory)
// edit a category
router.put("/:categoryId", isLoggedIn, isAdmin, editSingleCategory)

module.exports = router;
