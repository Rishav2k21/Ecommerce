const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
//   updateOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/order");
const router = express.Router();

const { isAuth, isrole } = require("../middleware/auth");

router.route("/order/new").post(isAuth, newOrder);

router.route("/order/:id").get(isAuth, getSingleOrder);

router.route("/orders/me").get(isAuth, myOrders);

router
  .route("/admin/orders")
  .get(isAuth, isrole("admin"), getAllOrders);

  router
  .route("/admin/order/:id")
  .put(isAuth,isrole("admin"), updateOrder)
  .delete(isAuth, isrole("admin"), deleteOrder);

  module.exports=router;