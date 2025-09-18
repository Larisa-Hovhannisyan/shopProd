const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/dashboard", productController.listProducts);
router.get("/products/add", productController.getAddProduct);
router.post("/products/add", productController.postAddProduct);

router.get("/products/edit/:id", productController.getEditProduct);
router.post("/products/edit/:id", productController.postEditProduct);

// Delete product
router.get("/products/delete/:id", productController.deleteProduct);


module.exports = router;
