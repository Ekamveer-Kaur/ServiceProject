import React, { useEffect, useState } from 'react';
import api from '../axios';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingOrderId, setLoadingOrderId] = useState('');

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      const res = await api.get('/getorders');
      setOrders(res.data.orders || []);
      setSelectedEmail('');
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const getOrdersByEmail = async (email) => {
    if (!email) return; // Handle empty email case
    try {
      const res = await api.get(`/ordersbyemail/${email}`);
      setOrders(res.data.orders || []);
      setSelectedEmail(email);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleReject = async (orderId) => {
    setLoadingOrderId(orderId);
    try {
      await api.put(`/updateorder/${orderId}`, {
        deliveryStatus: 'Rejected',
      });
      await getAllOrders();
    } catch (error) {
      console.error("Error rejecting the order:", error);
    }
    setLoadingOrderId(null);
  };

  const handleProceed = async (orderId, orderDate, deliveryStatus) => {
    setLoadingOrderId(orderId);
    let newDeliveryDate = new Date(orderDate);

    if (deliveryStatus === 'fast') {
      newDeliveryDate.setDate(newDeliveryDate.getDate() + 1);
    } else {
      newDeliveryDate.setDate(newDeliveryDate.getDate() + 3);
    }

    try {
      await api.put(`/updateorder/${orderId}`, {
        deliveryStatus: 'Shipped',
        paymentStatus: 'paid',
        deliveryDate: newDeliveryDate,
      });
      await getAllOrders();
    } catch (error) {
      console.error("Error updating the order:", error);
    }

    setLoadingOrderId(null);
  };

  const uniqueEmails = [...new Set(orders.map(order => order.userId?.email).filter(Boolean))];

  const filteredOrders = paymentFilter
    ? orders.filter(order => order.paymentStatus === paymentFilter)
    : orders;

  return (
    <div className="container mt-4">
      <h2>{selectedEmail ? `Orders of ${selectedEmail}` : 'All Orders'}</h2>

      {selectedEmail && (
        <button className="btn btn-secondary mb-3" onClick={getAllOrders}>
          ← Back
        </button>
      )}

      {!selectedEmail && uniqueEmails.length > 0 && (
        <div className="mb-3">
          <label className="form-label"><b>Select by Email:</b></label>
          <select
            className="form-select"
            value={selectedEmail}
            onChange={(e) => getOrdersByEmail(e.target.value)}
          >
            <option value="">-- Select an email --</option>
            {uniqueEmails.map((email) => (
              <option key={email} value={email}>{email}</option>
            ))}
          </select>
          {loading && <div className='text-center md-3 text-white'>Please Wait...</div>}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label"><b>Filter by Payment Status:</b></label>
        <select
          className="form-select"
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
        >
          <option value="">-- All --</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        filteredOrders.map((order, index) => (
          <div key={order._id} className="card mb-3 p-3 shadow-sm">
            <p><b>Service:</b> Order {index + 1} - {order.serviceName}</p>
            <p><strong>Status:</strong> {order.deliveryStatus}</p>
            <p><b>Amount:</b> ₹{order.totalAmount}</p>
            <p>Payment Status: {order.paymentStatus}</p>
            <p>Order Date :{new Date(order.orderDate).toLocaleString()}</p>
            <p>
              <b>User:</b> {order.userId?.name || 'N/A'} (
              <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => getOrdersByEmail(order.userId?.email)}
              >
                {order.userId?.email || 'N/A'}
              </span>
              )
            </p>

            {order.deliveryStatus === 'Pending' && (
              <div className="d-flex gap-2">
                <button className="btn btn-success btn-sm" onClick={() => handleProceed(order._id, order.serviceDate, order.deliveryStatus)}
                  disabled={loadingOrderId === order._id || order.deliveryStatus === "Shipped"} >
                  {loadingOrderId === order._id ? 'Processing...' : 'Approve'}
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleReject(order._id)}
                  disabled={loadingOrderId === order._id || order.deliveryStatus === "Rejected"} >
                  {loadingOrderId === order._id ? 'Rejecting...' : 'Reject'}
                </button>
              </div>
            )}

            {order.deliveryStatus === 'Shipped' && (
              <span className="badge bg-info">Shipped</span>
            )}

            {order.deliveryStatus === 'Delivered' && (
              <span className="badge bg-success">Delivered</span>
            )}

            {order.deliveryStatus === 'Rejected' && (
              <span className="badge bg-danger">Rejected</span>
            )}

            <ul className="order-items mt-2">
              {order.cartItems.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.name}</strong> - ₹{item.price} x {item.quantity}
                </li>
              ))}
            </ul>

            <Link to={`/admin/adminorderdetails/${order._id}`}>
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;