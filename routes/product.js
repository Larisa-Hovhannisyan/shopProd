const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/dashboard", productController.listProducts);
router.get("/products/add", productController.getAddProduct);
router.post("/products/add", productController.postAddProduct);

module.exports = router;
