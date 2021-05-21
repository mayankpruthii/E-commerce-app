const express = require("express");
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { addProduct, updateProduct, getAllProducts, getProduct } = require("../controllers/product");
const router = express.Router();

router.post("/add", isLoggedIn, isAuthenticated, isAdmin, addProduct);
router.get("/:productId", getProduct);
router.put("/:productId", isLoggedIn, isAuthenticated, isAdmin, updateProduct);
router.get("/", getAllProducts);

module.exports = router;
