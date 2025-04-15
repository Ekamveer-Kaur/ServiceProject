import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha()); // Static CAPTCHA
  const [userCaptcha, setUserCaptcha] = useState("");

  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // A-Z, a-z, 0-9
    let captcha = "";
    for (let i = 0; i < 6; i++) { // 6-character CAPTCHA
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha()); // New CAPTCHA on refresh button click
    setUserCaptcha(""); // Clear input field
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ CAPTCHA validation fix
    if (!userCaptcha || userCaptcha.trim().toUpperCase() !== captcha.trim().toUpperCase()) {
      alert("❌ CAPTCHA incorrect! Please try again.");
      setUserCaptcha(""); // Clear input field
      refreshCaptcha(); // Generate new CAPTCHA
      return; // ✅ Stop function execution if CAPTCHA is incorrect
    }
  
    // If CAPTCHA is correct, proceed with login request
    const obj = JSON.stringify({ email, password });
  
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: obj,
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("✅ Successfully logged in!");
        
  
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role); // Save role
        localStorage.setItem("USER", data.user);
        console.log("Login Response:", data); 
        // Navigate based on role
       localStorage.setItem("user", JSON.stringify({
        name: data.name,
        email: data.email,
        isAdmin: data.role === "admin"
       }));
          navigate("/");
        
      } else {
        alert("❌ Invalid credentials! Try again.");
      }
    } catch (err) {
      console.log(err);
      alert("❌ Something went wrong. Please try again.");
    }
  };
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #a18cd1, #fbc2eb)",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#444",
          }}
        >
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                transition: "0.3s",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                transition: "0.3s",
              }}
            />
          </div>

   {/* CAPTCHA Section */}
   <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "15px" }}>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                background: "#eee",
                padding: "5px 10px",
                borderRadius: "5px",
                letterSpacing: "3px",
              }}
            >
              {captcha}
            </p>
            <button type="button" onClick={refreshCaptcha} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <i class="fa-solid fa-rotate"></i>
            </button>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Enter CAPTCHA"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              background: "linear-gradient(to right, #ff758c, #ff7eb3)",
              border: "none",
              borderRadius: "5px",
              color: "white",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(to right, #ff7eb3, #ff758c)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(to right, #ff758c, #ff7eb3)")
            }
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          <Link
            to="/forgot-password"
            style={{
              color: "#ff758c",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Forgot Password?
          </Link>
        </p>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          New here?{" "}
          <Link
            to="/signup"
            style={{
              color: "#ff758c",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
