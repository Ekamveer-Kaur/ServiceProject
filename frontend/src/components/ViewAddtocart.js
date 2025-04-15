import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Addtocart = () => {
  const [cart, setCart] = useState([]);
  const [orderPlace, setOrderPlace] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [deliveryType, setDeliveryType] = useState("Normal");
  const [currentStep, setCurrentStep] = useState(0); // 0=Cart, 1=Address, 2=Payment, 3=Confirm
  const [address, setAddress] = useState(""); // Address state for address page
  const navigate = useNavigate();

  const email = localStorage.getItem("email") || "guest";
  

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
    setCart(storedCart);
    setCartCount(storedCart.length);
  }, [email]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    setCartCount(updatedCart.length);
    localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
    localStorage.setItem("cartcount", updatedCart.length);
    window.dispatchEvent(new Event("storage"));
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index
        ? {
            ...item,
            quantity: item.quantity + 1,
            price: (item.quantity + 1) * (item.price / item.quantity),
          }
        : item
    );
    updateCart(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = cart
      .map((item, i) =>
        i === index && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              price: (item.quantity - 1) * (item.price / item.quantity),
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateCart(updatedCart);
  };

  const totalAmount = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("USER");

    if (!userId || cart.length === 0) {
      alert("Invalid order data. Please log in and add items.");
      return;
    }

    const extraCharge = deliveryType === "Fast" ? 50 : 0;
  const finalAmount = parseFloat(totalAmount) + extraCharge;

  const serviceDate = new Date();
  serviceDate.setDate(
    serviceDate.getDate() + (deliveryType === "Fast" ? 1 : 3)
  );

    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          cartItems: cart,
          totalAmount: finalAmount,
          serviceDate,
          deliveryType,
          userEmail:localStorage.getItem("email"),
        }),
      });

  // const handlePlaceOrder = () => {
  //   setCurrentStep(1); // move to address page
  //   const userId = localStorage.getItem("USER");

  //   if (!userId || cart.length === 0) {
  //     alert("Invalid order data. Please log in and add items.");
  //     return;
  //   }

  //   const extraCharge = deliveryType === "Fast" ? 50 : 0;
  // const finalAmount = parseFloat(totalAmount) + extraCharge;

  // const serviceDate = new Date();
  // serviceDate.setDate(
  //   serviceDate.getDate() + (deliveryType === "Fast" ? 1 : 3)
  // );

  //   try {
  //     const response = await fetch("http://localhost:5000/api/order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId,
  //         cartItems: cart,
  //         totalAmount: finalAmount,
  //         serviceDate,
  //         deliveryType,
  //         userEmail:localStorage.getItem("email"),
  //       }),
  //     });
  // };

  // const handleAddressSubmit = () => {
  //   if (!address.trim()) {
  //     alert("Please enter your address");
  //     return;
  //   }
  //   setCurrentStep(2); // move to payment page
  // };

      const data = await response.json();
      console.log("Response:", response.status, data);

      if (response.status === 201) {
        alert(data.message);
        localStorage.removeItem(`cart_${email}`);
        localStorage.setItem("cartcount", 0);
        setCart([]);
        setCartCount(0);
        setOrderPlace(true);
      } else {
        alert(data.message || "Order not placed");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // const data = await response.json();
  //     if (response.status === 201) {
  //       alert("Order Placed Successfully!");
  //       localStorage.removeItem(`cart_${email}`);
  //       localStorage.setItem("cartcount", 0);
  //       setCart([]);
  //       setCurrentStep(3);
  //     } else {
  //       alert(data.message || "Order not placed");
  //     }
  //   } catch (error) {
  //     console.error("Order error:", error);
  //     alert("Something went wrong.");
  //   }
  // };

  // const renderStepIndicator = () => {
  //   const steps = ["Cart", "Address", "Payment", "Confirm"];
  //   return (
  //     <div className="d-flex justify-content-center mb-4">
  //       {steps.map((s, idx) => (
  //         <div key={idx} className="text-center mx-2">
  //           <div
  //             className={`rounded-circle ${
  //               idx <= currentStep ? "bg-danger" : "bg-secondary"
  //             } text-white`}
  //             style={{
  //               width: "35px",
  //               height: "35px",
  //               lineHeight: "35px",
  //               fontWeight: "bold",
  //             }}
  //           >
  //             {idx + 1}
  //           </div>
  //           <small>{s}</small>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  // const renderAddressStep = () => (
  //   <div className="mb-4">
  //     <h5>📍 Delivery Address</h5>
  //     <textarea
  //       className="form-control"
  //       rows="3"
  //       placeholder="Enter your address..."
  //       value={address}
  //       onChange={(e) => setAddress(e.target.value)}
  //     />
  //     <button
  //       className="btn btn-dark mt-3"
  //       onClick={handleAddressSubmit}
  //     >
  //       Proceed to Payment
  //     </button>
  //   </div>
  // );

  // const renderPaymentStep = () => (
  //   <div className="text-center">
  //     <h4>💳 Payment Step (coming soon...)</h4>
  //     <button
  //       className="btn btn-success mt-3"
  //       onClick={() => setCurrentStep(3)}
  //     >
  //       Confirm & Place Order
  //     </button>
  //   </div>
  // );

  // const renderConfirmStep = () => (
  //   <div className="text-center mt-5">
  //     <h4 className="text-success">🎉 Your order has been placed successfully!</h4>
  //     <button
  //       className="btn btn-outline-primary mt-3"
  //       onClick={() => navigate("/UserDashboard/userorders")}
  //     >
  //       View My Orders
  //     </button>
  //   </div>
  // );


  return (
    <div className="container my-5">
      <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
        }
        .cart-box {
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          padding: 20px;
          transition: transform 0.2s ease;
        }
        .cart-box:hover {
          transform: translateY(-5px);
        }
        .cart-image {
          height: 180px;
          object-fit: cover;
          border-radius: 12px;
          width: 100%;
        }
        .btn-custom {
          border-radius: 20px;
          padding: 4px 12px;
          font-weight: bold;
          border: none;
          transition: all 0.2s ease;
        }
        .btn-custom:hover {
          opacity: 0.9;
          transform: scale(1.05);
        }
        .btn-increase { background-color: #00b894; color: white; }
        .btn-decrease { background-color: #fdcb6e; color: white; }
        .btn-remove { background-color: #d63031; color: white; }
        .order-summary-box {
          border-radius: 16px;
          background: linear-gradient(to top left, #f5f5f5, #ffffff);
          padding: 25px;
          box-shadow: 0 6px 14px rgba(0,0,0,0.12);
        }
        .total-price {
          font-size: 1.2rem;
          color: #2ecc71;
        }
        .btn-order {
          border-radius: 30px;
          font-weight: bold;
          padding: 12px;
          background: linear-gradient(to right, #6a11cb, #2575fc);
          border: none;
          color: white;
          transition: all 0.3s ease;
        }
        .btn-order:hover {
          opacity: 0.95;
          transform: scale(1.02);
        }
        h2 {
          font-weight: 600;
          color: #2d3436;
        }
      `}</style>

<h2 className="text-center mb-4">🛒 Your Cart</h2>
      {orderPlace && (
        <div className="alert alert-success text-center">✅ Order Placed</div>
      )}

      {/* View My Orders Button */}
      <div className="text-center mb-4">
        <button
          className="btn btn-outline-dark custom-btn"
          onClick={() => navigate("/UserDashboard/userorders")}
        >
          View My Orders
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  {cart.map((item, index) => (
                    <div key={index} className="col-md-6 mb-4">
                      <div className="cart-box">
                        <img src={item.image} className="cart-image" alt={item.name} />
                        <h5 className="mt-3">{item.name}</h5>
                        <p>Price: ₹{item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn-custom btn-increase"
                            onClick={() => handleIncreaseQuantity(index)}
                          >
                            +
                          </button>
                          <button
                            className="btn-custom btn-decrease"
                            onClick={() => handleDecreaseQuantity(index)}
                          >
                            -
                          </button>
                          <button
                            className="btn-custom btn-remove"
                            onClick={() => handleRemoveItem(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-4">
                <div className="order-summary-box">
                  <h5 className="mb-3">🧾 Order Summary</h5>
                  <ul className="list-group list-group-flush">
                    {cart.map((item, idx) => (
                      <li
                        key={idx}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span className="fw-bold">₹{item.price}</span>
                      </li>
                    ))}

                    <li className="list-group-item">
                      <label className="fw-bold mb-1">Delivery Type:</label>
                      <select
                        className="form-select"
                        value={deliveryType}
                        onChange={(e) => setDeliveryType(e.target.value)}
                      >
                        <option value="Normal">Normal (Free, 3 days)</option>
                        <option value="Fast">Fast (₹50, 1 day)</option>
                      </select>
                    </li>

                    <li className="list-group-item d-flex justify-content-between fw-bold border-top pt-3">
                      <span>Total</span>
                      <span className="total-price">
                        ₹
                        {(
                          parseFloat(totalAmount) + (deliveryType === "Fast" ? 50 : 0)
                        ).toFixed(2)}
                      </span>
                    </li>
                  </ul>

                  <button className="btn-order w-100 mt-3" onClick={handlePlaceOrder}>
                    🛍️ Place Order
                  </button>
                </div>
              </div>
            </div>
            </>
          )}

        
      
    </div>
  );
};

export default Addtocart;
