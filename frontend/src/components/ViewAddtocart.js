import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import axios

const Addtocart = () => {
  const [cart, setCart] = useState([]);
  const [orderPlace, setOrderPlace] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [deliveryType, setDeliveryType] = useState("Normal");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [step, setStep] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const navigate = useNavigate();

  const email = localStorage.getItem("email") || "guest";

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
    console.log("Loaded cart from localStorage:", storedCart); // ✅
    setCart(storedCart);
    setCartCount(storedCart.length);
    
    // console.log("vghj"+cart.price);
  }, [email]);
  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);
  
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    setCartCount(updatedCart.length);
    localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
    localStorage.setItem("cartcount", updatedCart.length);
    window.dispatchEvent(new Event("storage"));
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
   
    );
    updateCart(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = cart
      .map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
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
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const extraCharge = deliveryType === "Fast" ? 50 : 0;
  const totalAmountWithDelivery = parseFloat(totalAmount) + extraCharge;

  const getServiceDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + (deliveryType === "Fast" ? 1 : 3));
    return date;
  };

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("USER");

    if (!userId || cart.length === 0) {
      alert("Invalid order data. Please log in and add items.");
      return;
    }

    if (!address.trim() || !city.trim() || !pincode.trim() || !deliveryType) {
      alert("Please fill all delivery details (address, city, pincode, delivery type).");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/order", {
        userId,
        cartItems: cart,
        totalAmount: totalAmountWithDelivery,
        pincode,
        address,
        city,
        serviceDate: getServiceDate(),
        deliveryType,
        userEmail: email,
      });

      const orderData = response.data.order;

      if (response.status === 201 && orderData._id) {
        const options = {
          key: "rzp_test_99IwqPHWTFKkXS",
          amount: parseFloat(totalAmountWithDelivery) * 100,
          currency: "INR",
          name: "Urban Company",
          description: "Order Payment",
          handler: async function (razorpayResponse) {
            try {
              const paymentRes = await axios.put(
                `http://localhost:5000/api/updatepayment/${orderData._id}`,
                {
                  paymentId: razorpayResponse.razorpay_payment_id,
                  paymentStatus: "Paid",
                }
              );

              if (paymentRes.status === 200) {
                alert("Payment Successful!");
                localStorage.removeItem(`cart_${email}`);
                localStorage.setItem("cartcount", 0);
                setCart([]);
                setCartCount(0);
                setOrderPlace(true);
                window.dispatchEvent(new Event("storage"));
                navigate("/");
              } else {
                alert("Payment captured but failed to update order.");
              }
            } catch (err) {
              console.error("Payment update failed:", err);
              alert("Payment succeeded but order update failed.");
            }
          },
          prefill: {
            name: address,
            email: email,
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Failed to create order. Try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="addtocart-container py-5" style={{ padding: "20px" }}>
      {/* Internal CSS */}
      <style>{`
        .checkout-steps {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .step {
          text-align: center;
          flex: 1;
          position: relative;
          padding: 10px;
          min-width: 80px;
        }
        .step::after {
          content: '';
          position: absolute;
          top: 20px;
          right: -50%;
          width: 100%;
          height: 4px;
          background-color: #ddd;
          z-index: 0;
        }
        .step:last-child::after {
          display: none;
        }
        .step-circle {
          width: 40px;
          height: 40px;
          margin: 0 auto;
          line-height: 40px;
          border-radius: 50%;
          font-weight: bold;
          color: white;
          background-color: #ccc;
          z-index: 1;
          position: relative;
          transition: all 0.3s ease;
        }
        .step-label {
          margin-top: 10px;
          font-weight: 500;
          font-size: 14px;
        }
        .step.active .step-circle {
          background-color: #007bff;
          box-shadow: 0 0 10px rgba(0, 123, 255, 0.6);
        }
        .step.completed .step-circle {
          background-color: #28a745;
          box-shadow: 0 0 10px rgba(40, 167, 69, 0.6);
        }
        @media (max-width: 768px) {
          .step {
            flex: none;
            width: 25%;
          }
          .step-label {
            font-size: 12px;
          }
        }
      `}</style>
  
      {/* Step Indicators */}
      <div className="checkout-steps">
        {["Cart", "Address", "Payment", "Summary"].map((label, idx) => (
          <div
            key={idx}
            className={`step ${step === idx ? "active" : step > idx ? "completed" : ""}`}
          >
            <div className="step-circle">{idx + 1}</div>
            <div className="step-label">{label}</div>
          </div>
        ))}
      </div>
  
      {/* Step 0 - Cart */}
      {step === 0 && (
        <div className="row">
          <div className="col-md-8">
            <h4>Your Cart</h4>
            <div className="row">
              {cart.map((item, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <div className="card cart-card shadow-sm">
                    <img
                      src={item.image}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                      alt={item.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
  ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
</p>

 
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleIncreaseQuantity(index)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-warning btn-sm text-white"
                          onClick={() => handleDecreaseQuantity(index)}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="col-md-4">
            <div className="card p-3 shadow">
              <h5>Order Summary</h5>
              <ul className="list-group list-group-flush">
                {cart.map((item, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
                <li className="list-group-item fw-bold d-flex justify-content-between border-top">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </li>
              </ul>
              <button
                className="btn btn-primary mt-3 w-100"
                disabled={cart.length === 0}
                onClick={() => setStep(1)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* Step 1 - Address */}
      {step === 1 && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h4>Delivery Address</h4>
            <input
              className="form-control my-2"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              className="form-control my-2"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className="form-control my-2"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <select
              className="form-control my-2"
              value={deliveryType}
              onChange={(e) => setDeliveryType(e.target.value)}
            >
              <option value="">Select Delivery Type</option>
              <option value="Fast">Fast (₹50, 1 Days)</option>
              <option value="Slow">Normal (Free, 3 Days)</option>
            </select>
  
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                if (address && city && pincode && deliveryType) {
                  setStep(2);
                } else {
                  alert("Please fill all fields!");
                }
              }}
            >
              Continue to Payment
            </button> 
  
            <button className="btn btn-secondary w-100 mt-2" onClick={() => setStep(0)}>
              Back to Cart
            </button>
          </div>
        </div>
      )}
  
      {/* Step 2 - Payment */}
      {step === 2 && (
        <div className="text-center">
          <h4>Payment</h4>
          <p>Simulated payment method (Cash/UPI etc)</p>
          <button
  className="btn btn-dark"
  onClick={() => {
    const extraCharge = deliveryType === "Fast" ? 50 : 0;
    setFinalAmount(parseFloat(totalAmount) + extraCharge); // 👈 Add this
    setStep(3);
  }}
>
  Continue to Summary
</button>

          <br />
          <button className="btn btn-secondary mt-2" onClick={() => setStep(1)}>
            Back to Address
          </button>
        </div>
      )}
  
      {/* Step 3 - Summary */}
      {step === 3 && (
        <div className="text-center">
          <h4>Order Summary</h4>
          <p>Total: ₹{finalAmount}</p>
          <button className="btn btn-success" onClick={handlePlaceOrder}>
            Place Order
          </button>
          <br />
          <button className="btn btn-secondary mt-2" onClick={() => setStep(2)}>
            Back to Payment
          </button>
        </div>
      )}
    </div>
  );
}  

export default Addtocart;
