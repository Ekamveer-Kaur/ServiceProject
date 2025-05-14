const mongoose = require("mongoose");
// const User=require("../server");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  cartItems: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      category:{
        type:String,
        required:false
    },
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  address:String,
      city:String,
      pincode:String,
            serviceDate:{
        type:Date,
        required:true
      },
      paymentStatus:{
        type:String,
        enum:["Pending","Paid","Failed"],
        default:"Pending"

      },
      deliveryType:{
        type:String
,
enum:["Fast","Slow"],
required:true},      
deliveryDate:{
  type:Date
},
      deliveryStatus:{
        type:String,
        enum:["Pending","Shipped","Delivered","Rejected"],
        default:"Pending"
      },
      orderDate:{
        type:Date,
        default:Date.now
      },
        paymentId: {
          type: String,
          default: null,
        },
        paymentStatus: {
          type: String,
          enum: ["Pending", "Paid", "Failed"],
          default: "Pending",
        },
        paymentDate: {
          type: Date,
          default: null,
        },
        
})

const OrderModel=mongoose.model("Order",orderSchema)
module.exports=OrderModel;
