import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [username, setUsername] = useState(""); 
  const [userName,setUserName] = useState("");
  const [role, setRole] = useState(""); // Role check karne ke liye
  const [cartCount, setCartCount] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("name");
    const userRole = localStorage.getItem("role"); // Role bhi get karein
    const useremail = localStorage.getItem("email");
    console.log("User Role from localStorage:", userRole); // ✅ Debugging
    if (user) {
      setUsername(user); 
      setUserName(useremail);
      setRole(userRole); 
    }
  },[location])
  // useEffect(() => {
  //   // ✅ Fetch initial cart count from localStorage
  //   const storedCartCount = localStorage.getItem("cartcount") || 0;
  //   setCartCount(parseInt(storedCartCount));
  
    // // ✅ Listen for changes in localStorage
    // const handleStorageChange = () => {
    //   const updatedCartCount = localStorage.getItem("cartcount") || 0;
    //   setCartCount(parseInt(updatedCartCount));
    // };
  
  //   window.addEventListener("storage", handleStorageChange);
  
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
      setCartCount(savedCart.length);
    }
  
    const handleStorageChange = () => {
      const email = localStorage.getItem("email");
      if (email) {
        const updatedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
        setCartCount(updatedCart.length);
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [location]);

 

  const handleLogout = () => {
localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setUserName(null);
    setUsername(""); 
    setRole("");
    setCartCount(0);
    navigate("/login");
  };

  const handlecart=async()=>{
    const email=localStorage.getItem("email");
    if(email){
      navigate("viewaddtocart");
    }
    else{
      alert("First login");
      navigate("/login");
    }

  }

  // Sliding placeholder text for search bar
  const placeholders = [
    "Search for 'Facial'",
    "Search for 'Kitchen Cleaning'",
    "Search for 'Home Spa'",
    "Search for 'Plumbing'",
    "Search for 'AC Repair'",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          background: "linear-gradient(to right, #F8F9FA, #E3E7EB)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "12px 25px",
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            <img
              src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_108,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1687285683825-e6cf23.jpeg"
              alt="Logo"
              height="40"
              style={{ borderRadius: "8px" }}
            />
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item px-3">
                <Link to="/AboutUs" className="nav-link fw-bold">About Us</Link>
              </li>
              <li className="nav-item px-3">
                <Link to="/ContactUs" className="nav-link fw-bold">Contact Us</Link>
              </li>
              <li className="nav-item px-3">
                <Link to="/frontblog" className="nav-link fw-bold">Blogs</Link>
              </li>
              <li className="nav-item px-3">
                <Link to="/" className="nav-link fw-bold">Category</Link>
              </li>

              {/* Search Bar */}
              <li className="nav-item px-3">
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder={placeholders[placeholderIndex]} // Sliding Placeholder
                    style={{
                      borderRadius: "20px",
                      padding: "8px 15px",
                      border: "1px solid #B0BEC5",
                      outline: "none",
                      minWidth: "250px",
                    }}
                  />
                  <button
                    className="btn btn-secondary"
                    type="submit"
                    style={{
                      borderRadius: "20px",
                      fontWeight: "bold",
                      padding: "8px 15px",
                      backgroundColor: "#34495E",
                      color: "white",
                    }}
                  >
                    Search
                  </button>
                  
                </form>
               
              </li>
              </ul>
              </div>
               {/* Conditional Dashboard Links */}
               {/* {role === "admin" ? (
                
                  <Link to="/admin" className="nav-link fw-bold"><button className="btn btn-primary px-3">Admin Dashboard</button></Link>
                
              ) : role === "user" ? (
                
                  <Link to="/UserDashboard" className="nav-link fw-bold"><button className="btn btn-primary px-3">User Dashboard</button></Link>
                
              ) : null} */}
            {/* ✅ Role-Based Dashboard Navigation */}
          {role === "admin" ? (
              <Link className="nav-link" to="/admin">
                <button className="btn btn-primary me-3"> Dashboard</button>
              </Link>
            ) : role === "user" ? (
              <Link className="nav-link" to="/UserDashboard">
                <button className="btn btn-primary me-3">Dashboard</button>
              </Link>
            ) : null}


          
          

<div className="d-flex align-items-center position-relative" style={{ marginRight: "20px" }}>
  <div style={{ position: "relative" }}>
    <i onClick={() => handlecart()} className="bi bi-cart3 fs-4"></i>

    {cartCount > 0 && (
      <span
        style={{
          position: "absolute",
          top: "-8px",
          right: "-10px",
          background: "red",
          color: "white",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {cartCount}
      </span>
    )}
  </div>

  {username && (
    <div className="d-flex align-items-center ms-3">
      <span
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#2C3E50",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "18px",
          marginRight: "10px",
        }}
      >
        {username?.charAt(0)?.toUpperCase()}
      </span>
      <button className="btn btn-danger ms-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )}
</div>

        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
