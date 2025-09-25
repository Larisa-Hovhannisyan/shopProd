const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'adminUploads')
  },
  filename: function (req, file, cb) {
    console.log(file);
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

router.get("/dashboard", productController.listProducts);
router.get("/products/add", productController.getAddProduct);
router.post("/products/add", upload.single('avatar'), productController.postAddProduct);

router.get("/products/edit/:id", productController.getEditProduct);
router.post("/products/edit/:id", productController.postEditProduct);

router.get("/products/delete/:id", productController.deleteProduct);


module.exports = router;
