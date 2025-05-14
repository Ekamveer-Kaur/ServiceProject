import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const GetUserOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/orderdetails/${orderId}`);
        setOrder(res.data.order);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="text-center text-secondary my-5">Loading order details...</div>;
  if (error) return <div className="alert alert-danger text-center my-4">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Order Details</h2>

      {order ? (
        <div className="card shadow-lg p-4 border-0 bg-light">
          <div className="mb-4">
            <p className="mb-2"><strong>Order ID:</strong> <span className="text-dark">{order._id}</span></p>
            <p className="mb-2"><strong>Status:</strong> <span className="badge bg-info text-dark">{order.deliveryStatus}</span></p>
            <p className="mb-2"><strong>Amount:</strong> <span className="text-success fw-bold">₹{order.totalAmount}</span></p>
            <p className="mb-2"><strong>Payment Status:</strong> 
              <span className={`ms-2 badge ${order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                {order.paymentStatus}
              </span>
            </p>
            <p className="mb-2"><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <p className="mb-2"><strong>User:</strong> {order.userId?.name || 'N/A'} ({order.userId?.email || 'N/A'})</p>
          </div>

          <div className="bg-white p-3 rounded shadow-sm mb-4">
            <h4 className="mb-3 text-secondary">Items in Order</h4>
            <ul className="list-group">
              {Array.isArray(order.cartItems) && order.cartItems.map((item, idx) => (
                <li
  key={idx}
  className="list-group-item d-flex justify-content-between align-items-center custom-list-item"
>
  <strong>{item.name}</strong>
  <span>₹{item.price}</span>
  <span>{item.quantity}</span>
</li>

))}
            </ul>
          </div>

          <div className="bg-white p-3 rounded shadow-sm">
            <h4 className="mb-3 text-secondary">Delivery Information</h4>
            <p className="mb-2"><strong>Address:</strong> {order.address}</p>
            <p className="mb-2"><strong>City:</strong> {order.city}</p>
            <p className="mb-2"><strong>Pincode:</strong> {order.pincode}</p>
            <p className="mb-2"><strong>Estimated Delivery Date:</strong> 
              {order.deliveryDate ? new Date(order.deliveryDate).toLocaleString() : <span className="text-muted">Not Set</span>}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted">Order not found.</p>
      )}
    </div>
  );
};

export default GetUserOrderDetails;