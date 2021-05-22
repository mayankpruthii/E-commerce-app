const express = require("express");
const { isLoggedIn, isAdmin } = require("../controllers/auth");
const { addProduct, updateProduct, getAllProducts, getProduct, getProductsByCategories } = require("../controllers/product");
const router = express.Router();

// add a product
router.post("/add", isLoggedIn, isAdmin, addProduct);
// get a certain product
router.get("/:productId", getProduct);
// update a product
router.put("/:productId", isLoggedIn, isAdmin, updateProduct);
// get all products with pagination
router.get("/", getAllProducts);

module.exports = router;
