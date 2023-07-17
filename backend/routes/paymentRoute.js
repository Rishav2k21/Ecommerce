const express = require("express");
const {
  processPayment,

} = require("../controllers/paymentControllers");
const router = express.Router();
const { isAuth } = require("../middleware/auth");

router.route("/payment/process").post(isAuth, processPayment);

// router.route("/stripeapikey").get(isAuth, sendStripeApiKey);

module.exports = router;
