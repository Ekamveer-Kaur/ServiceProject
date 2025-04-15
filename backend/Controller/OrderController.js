const OrderModel = require("../models/Order Model");
const User = require("../models/user"); // ✅ Correct path
const sendUserEmail= require("../Utlis/SendUserEmail");
const sendAdminEmail = require("../Utlis/SendAdminEmail");

const placeorder = async (req, res) => {
  const { userId, cartItems, totalAmount, serviceDate, deliveryType = "Normal" } = req.body;


  if (!userId || !cartItems || cartItems.length === 0 || !serviceDate) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Calculate deliveryDate only
    const deliveryDate = new Date(serviceDate);

    const order = new OrderModel({
      userId,
      cartItems,
      totalAmount, // ✅ use passed value
      serviceDate,
      deliveryType,
      deliveryDate,
    });

    await order.save();
    await sendAdminEmail(order, user.email);
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Get orders for a specific user
// const getUserOrders = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const orders = await OrderModel.find({ userId }).sort({ orderDate: -1 });

//     res.json({
//       success: true,
//       myOrders: orders,
//     });
//   } catch (error) {
//     console.error("Error fetching user orders:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch user orders",
//     });
//   }
// };


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
const updateOrder = async (req, res) => {
  try {
    const updated = await OrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("userId"); 

    
    if (!updated.userId || !updated.userId.email){
      return res.status(400).json({message:"User email not found"});
    }
      await sendUserEmail(updated._id, updated.userId.email, req.body.deliveryStatus);
    

    res.json({ message: "Order updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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

// GET: All orders (for admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("userId");
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to get orders" });
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
   // 👈 export admin controller
};
