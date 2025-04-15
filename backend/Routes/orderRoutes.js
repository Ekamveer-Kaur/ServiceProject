const express = require("express");
const router = express.Router();
const {
  placeorder,
  getUserOrders,
  getAllOrders,
  updateOrder
   // ✅ New admin route controller
} = require("../Controller/OrderController");

router.post("/order", placeorder);
router.put("/updateorder/:id", updateOrder);
// Get all orders (admin)
router.get("/getorders", getAllOrders);
// Get orders by userId (user)
router.get("/user/:userId", getUserOrders);

module.exports = router;
