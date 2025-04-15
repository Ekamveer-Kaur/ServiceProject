import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Success");
        navigate("/login");
      } else {
        alert("User already exists, please login");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #ff9a9e, #fad0c4)",
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
        <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px", color: "#444" }}>
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            onMouseOver={(e) => (e.target.style.background = "linear-gradient(to right, #ff7eb3, #ff758c)")}
            onMouseOut={(e) => (e.target.style.background = "linear-gradient(to right, #ff758c, #ff7eb3)")}
          >
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ff758c", fontWeight: "bold", textDecoration: "none" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
