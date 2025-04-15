import React, { useEffect, useState } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const [loadingorderId,setloadingorderId]= useState(null);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/getorders");
      const data = await res.json();
      setOrders(data.orders);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const emails = [...new Set(orders.map(o => o.userId?.email).filter(Boolean))];
  const filtered = email ? orders.filter(o => o.userId?.email === email) : [];

  const handleReject = async (orderId) => {
    setloadingorderId(orderId);
    await fetch(`http://localhost:5000/api/updateorder/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deliveryStatus: "Rejected" })
    });
    await fetchOrders();
    setloadingorderId(null);
  };

  const handleProceed = async (orderId, orderDate, Type) => {
    setloadingorderId(orderId);
    const deliveryDate = new Date(orderDate);
  
    // Fast: +1 day, Normal: +3 days
    if (Type === "Fast") {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
    } else {
      deliveryDate.setDate(deliveryDate.getDate() + 3);
    }
  
    await fetch(`http://localhost:5000/api/updateorder/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deliveryStatus: "Shipped",
        deliveryDate
      })
    });
  
    await fetchOrders();
    setloadingorderId(null);
  };
  

  return (
    <div className="container mt-4">
      <h3>Select Email to View Orders</h3>

      <select className="form-select mb-3" value={email} onChange={(e) => setEmail(e.target.value)}>
        <option value="">-- Select Email --</option>
        {emails.map((e, i) => (
          <option key={i} value={e}>{e}</option>
        ))}
      </select>
{loading && <div className='text-center mt-3 '>please wait...</div>}

      {filtered.length === 0 && email && <p>No orders found for this user.</p>}

      {filtered.map((order, i) => (
        <div key={i} className="card mb-2 p-3">
          <p><strong>Services:</strong></p>
          <ul>
            {order.cartItems.map((item, idx) => (
              <li key={idx}>{item.name} - Quantity: {item.quantity}</li>
            ))}
          </ul>
          <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          <p><strong>Delivery Type:</strong> {order.deliveryType || "Not Selected"}</p>
          <p><strong>Status:</strong> {order.deliveryStatus}</p> 
{order.deliveryDate && (
  <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
)}

          <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
          

          <div className="mt-2 d-flex gap-2">
          <button
  className="btn btn-danger"
  onClick={() => handleReject(order._id)}
  disabled={loadingorderId===order._id ||order.deliveryStatus === "Rejected"}  // Reject can be done anytime unless already rejected

>
  {loadingorderId=== order._id? "Processing...":"Reject"}
</button>

<button
  className="btn btn-success"
  onClick={() => handleProceed(order._id, order.orderDate, order.deliveryType)}
  disabled={loadingorderId===order._id || order.deliveryStatus === "Shipped" || order.deliveryStatus === "Rejected"}
>
  {loadingorderId=== order._id ? "Processing...":"Proceed"}
</button>


          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;