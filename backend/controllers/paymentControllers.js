const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")("sk_test_51NSvg7SJdJczrCbf8KdgaCqEUN50jdaW6CPZqoMkdSXLdVpkzgz4Xr6MyobNemcE27sEhmrQyWntUrWcX70QvRyZ00NslAExGF");

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey:"pk_test_51NSvg7SJdJczrCbfaRuvkraIGC3MwJeZCj4t0BXXxHPriRpSE8gIYzlh3U2rSzJa1UIgwPebYoLaWeqTmdPSeBj2009tu9olsS"});
});