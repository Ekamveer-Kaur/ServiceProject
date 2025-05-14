const express = require("express");
const router = express.Router();
const {
  placeorder,
  getUserOrders,
  getAllOrders,
  updateOrder,
  updatePaymentStatus,
  getUserOrderDetails,
  getOrderDetails,
  getOrdersByEmail
   // ✅ New admin route controller
} = require("../Controller/OrderController");
const { getUserCount, getOrderStatusCount, getUser } = require("../Controller/UserCountController");


router.post("/order", placeorder);
router.put("/updateorder/:id", updateOrder);
router.put("/updatepayment/:orderId", updatePaymentStatus);
// Get all orders (admin)
router.get("/getorders", getAllOrders);
// Get orders by userId (user)
router.get("/user/:userId", getUserOrders);
router.get("/orderdetails/:orderId", getUserOrderDetails);
router.get("/adminorderdetails/:orderId", getOrderDetails);
router.get("/ordersbyemail/:email", getOrdersByEmail);
router.get("/count-users", getUserCount);

router.get("/order-status-count", getOrderStatusCount);
router.get("/viewusers", getUser);
module.exports = router;
