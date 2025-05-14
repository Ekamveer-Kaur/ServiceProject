const OrderModel = require("../models/Order Model");
const User = require("../models/user"); // ✅ Correct path
const sendUserEmail= require("../Utlis/SendUserEmail");
const sendAdminEmail = require("../Utlis/SendAdminEmail");

const placeorder = async (req, res) => {
  const { userId, cartItems, address, city, pincode, serviceDate, deliveryType = "Normal" } = req.body;


  if (!userId || !cartItems || cartItems.length === 0 || !serviceDate || !deliveryType) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let calculatedTotalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (deliveryType === "Fast") {
      calculatedTotalAmount += 50;
    }

    let deliveryDays = deliveryType === "Fast" ? 1 : 3;
    const estimatedDeliveryDate = new Date(serviceDate);
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + deliveryDays);

    console.log("Service Date:", serviceDate);
    console.log("Estimated Delivery Date:", estimatedDeliveryDate);


    const order = new OrderModel({
      userId,
      cartItems,
      totalAmount: calculatedTotalAmount,
      city,
      address,
      pincode,
      serviceDate: new Date(serviceDate),
      deliveryType,
      deliveryStatus: "Pending",
      deliveryDate: estimatedDeliveryDate, // ✅ SET DELIVERY DATE
    });

    await order.save();
    await sendAdminEmail(order, user.email);
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// ✅ Get all orders for admin

const getAdminOrders=async(req,res)=>{
  try{
      const orders=await OrderModel.find({deliveryStatus:"Pending"}).populate("userId");
      res.status(201).json({message:"pending orders",orders});
  }
  catch(err){
      res.status(500).json({message:"error during placed order",err});
      console.log(err);

  }


}
// Update payment status for an order
const updatePaymentStatus = async (req, res) => {
  const { orderId } = req.params;
  const { paymentId, paymentStatus } = req.body;

  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        paymentId: paymentId || null,
        paymentStatus: paymentStatus || "Paid",
        paymentDate: new Date(),
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Payment update failed:", error);
    res.status(500).json({ message: "Failed to update payment status" });
  }
};


const updateOrder = async (req, res) => {
  try {
    // Validate the request body for necessary fields before updating
    const { deliveryStatus } = req.body;

    if (!deliveryStatus) {
      return res.status(400).json({ message: "Delivery status is required." });
    }

    // Update the order by ID and populate the userId field
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("userId");

    // If the order is not found
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if userId or email is missing after populating the userId
    if (!updatedOrder.userId || !updatedOrder.userId.email) {
      return res.status(400).json({ message: "User email not found" });
    }

    // Send an email to the user after updating the order
    await sendUserEmail(updatedOrder._id, updatedOrder.userId.email, deliveryStatus);

    // Respond with success and the updated order
    res.json({ message: "Order updated successfully", updatedOrder });
  } catch (err) {
    // Log the error and respond with a server error
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};


// GET: Orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.params.userId }).sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

const getUserOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findById(orderId).populate("userId", 'name email').populate('cartItems');
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET: All orders (for admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("userId").sort({ orderDate: -1 });
    res.status(200).json({ message: "All orders fetched", orders });
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json({ message: "Error fetching orders", err });
  }
};

//admin
const getOrdersByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const orders = await OrderModel.find().populate("userId");
    const userOrders = orders.filter(order => order.userId?.email === email);
    res.status(200).json({ message: "User orders fetched", orders: userOrders });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


//admin ki order details
const getOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findById(orderId)
      .populate("userId", "name email")
      .populate("cartItems");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// const updateOrderStatus = async (req, res) => {
// const { orderId, deliveryStatus } = req.body;

// if (!orderId || !["Approved", "Rejected"].includes(deliveryStatus)) {
//   return res.status(400).json({ message: "Invalid request" });
// }

// try {
//   const updatedOrder = await OrderModel.findByIdAndUpdate(
//     orderId,
//     { deliveryStatus },
//     { new: true }
//   );

//   if (!updatedOrder) {
//     return res.status(404).json({ message: "Order not found" });
//   }

//   res.status(200).json({ message: `Order ${deliveryStatus} successfully`, updatedOrder });
// } catch (error) {
//   console.error("Error updating order status:", error);
//   res.status(500).json({ message: "Server error" });
// }
// };

// const getOrdersByEmail = async (req, res) => {
// const { email } = req.params;

// try {
//   const orders = await OrderModel.find()
//     .populate("userId");

//   // Filter orders where user's email matches
//   const userOrders = orders.filter(order => order.userId?.email === email);

//   res.status(200).json({ message: "User orders fetched", orders: userOrders });
// } catch (error) {
//   console.error("Error fetching orders by email:", error);
//   res.status(500).json({ message: "Server error" });
// }
// };

module.exports = {
  placeorder,
  getUserOrders,
  getAdminOrders,
  getAllOrders,
  updateOrder,
  updatePaymentStatus,
  getUserOrderDetails,
  getOrderDetails,
  getOrdersByEmail
   // 👈 export admin controller
};
