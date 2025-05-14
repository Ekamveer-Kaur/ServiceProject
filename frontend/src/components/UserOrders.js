import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("USER");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/user/${userId}`);
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch past orders:", err);
      }
    };

    if (userId) fetchOrders();
  }, [userId]);

  if (!userId) return <p>Please log in to view your orders.</p>;

  return (
    <div className="container mt-5">
      <h3>Your Past Orders</h3>

      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="mb-4">
            <div className="card p-3 shadow-sm">
            <p><strong>Order Id:</strong> {order._id}</p>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>
                <strong>Delivery Status:</strong>{" "}
                <span className={
                  order.deliveryStatus === "Pending" ? "text-warning" :
                  order.deliveryStatus === "Shipped" ? "text-primary" :
                  order.deliveryStatus === "Delivered" ? "text-success" :
                  order.deliveryStatus === "Rejected" ? "text-danger" : ""
                }>
                  {order.deliveryStatus}
                </span>
              </p>
              {order.deliveryDate && (
                <p><strong>Expected Delivery:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
              )}
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
              <p><strong>Delivery Type:</strong> {order.deliveryType}</p>
              <p><strong>Date:</strong> {order.orderDate}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.cartItems.map((item, idx) => (
                  <li key={idx}>
                    {item.name} (Qty: {item.quantity}) - ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-2 text-end">
              <Link
                to={`/UserDashboard/getuserorderdetails/${order._id}`}
                className="btn btn-sm btn-outline-primary rounded-pill px-4"
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default UserOrders;
