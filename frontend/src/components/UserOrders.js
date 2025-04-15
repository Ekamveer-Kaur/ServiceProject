import React, { useEffect, useState } from "react";

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
          <div key={index} className="card p-3 mb-3 shadow-sm">
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
            <p><strong>Items:</strong></p>
            <ul>
              {order.cartItems.map((item, idx) => (
                <li key={idx}>
                  {item.name} (Qty: {item.quantity}) - ₹{item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
