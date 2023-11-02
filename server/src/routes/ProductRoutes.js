const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController.js");

router.get("/all", ProductController.getAllProducts);

router.get("/:productId", ProductController.getByProductId);

router.post("/search", ProductController.searchProducts);

router.put("/:productId", ProductController.updateProduct);

router.post("/create", ProductController.createProduct);

router.delete("/:productId", ProductController.deleteProduct);

module.exports = router;
