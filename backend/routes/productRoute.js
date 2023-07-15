const express=require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createreview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const {isAuth,isrole}=require("../middleware/auth")
const router=express.Router();



router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuth,isrole("admin"),createProduct)
router.route("/admin/product/:id").put(isAuth,isrole("admin"),updateProduct).delete(isAuth,isrole("admin"),deleteProduct)
router.route("/product/:id").get(getProductDetails)
router.route("/review").put(isAuth, createreview);
router
  .route("/admin/products")
  .get(isAuth, isrole("admin"), getAdminProducts);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuth, deleteReview);

module.exports=router;