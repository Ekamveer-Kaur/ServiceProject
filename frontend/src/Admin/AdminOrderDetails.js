import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../axios';
import './Adminorderdetails.css';

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await api.get(`/adminorderdetails/${orderId}`);
        setOrder(res.data.order);
      } catch (err) {
        console.log('Error fetching order details:', err);
        alert("Error fetching order details.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrderDetails();
  }, [orderId]);

  const handleMarkDelivered = async () => {
    try {
      await api.put(`/updateorder/${orderId}`, { deliveryStatus: 'Delivered' });
      setOrder((prevOrder) => ({
        ...prevOrder,
        deliveryStatus: 'Delivered',
      }));
      alert('Order marked as delivered!');
    } catch (error) {
      console.error("Error marking the order as delivered:", error);
      alert("Error marking the order as delivered.");
    }
  };

  const handleBackToOrders = () => {
    navigate('/admin/orders');
  };

  const handleCancel = async () => {
    try {
      await api.put(`/updateorder/${orderId}`, {
        deliveryStatus: 'Cancelled',
        deliveryType: order.deliveryType,
      });
      setOrder((prevOrder) => ({
        ...prevOrder,
        deliveryStatus: 'Cancelled',
      }));
      alert('Order has been cancelled!');
    } catch (error) {
      console.error("Error cancelling the order:", error);
      alert("Error cancelling the order.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  if (!order) return <div className="text-center">Order not found</div>;

  const isEditable = !['Cancelled', 'Delivered', 'Rejected'].includes(order.deliveryStatus);

  return (
    <div className="order-details-container">
      <div className="order-details-header">
        <button className="btn btn-back" onClick={handleBackToOrders}>
          ← Back to Orders
        </button>
        <h2>Order Details</h2>
      </div>
      <div className="order-details-body">
        <p><strong>Customer Name:</strong> {order.userId?.name || 'N/A'}</p>
        <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
        <p><strong>City:</strong> {order.city}</p>
        <p><strong>Pincode:</strong> {order.pincode}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Status:</strong> {order.deliveryStatus}</p>
        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
        <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>

        {/* Order Items */}
        <div className="order-items">
          <h3>Order Items</h3>
          {order.cartItems.length === 0 ? (
            <p>No items in the order.</p>
          ) : (
            <table className="order-items-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price per Item</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>
                    <td>₹{item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Action buttons */}
        {isEditable && (
          <div className="order-action-btns">
            <button className="btn btn-delivered" onClick={handleMarkDelivered}>
              Mark as Delivered
            </button>
            <button className="btn btn-cancel" onClick={handleCancel}>
              Cancel Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderDetails;
