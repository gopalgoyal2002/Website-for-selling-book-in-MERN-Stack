const express = require("express");
const router = express.Router();

const { IsSignedIn, isAuthenticated } = require("../controllers/auth");

const { getToken, processPayment } = require("../controllers/paymentb");

router.get("/payment/gettoken/:userId", IsSignedIn, getToken);

router.post(
  "/payment/braintree/:userId",
  IsSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
