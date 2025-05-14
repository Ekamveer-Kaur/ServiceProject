import React, {  useState, useEffect } from 'react'
import { Link , Outlet, useNavigate} from 'react-router-dom'



const UserLayout = () => {
    const [user,setUser]=useState({})
    const [pic,setPic]=useState("");
    const navigate=useNavigate();


    useEffect(() => {
        // Bootstrap dropdown enable karne ke liye
        const dropdownElements = document.querySelectorAll('.dropdown-toggle');
        dropdownElements.forEach(dropdown => {
          new window.bootstrap.Dropdown(dropdown);
        });
    
        // Get user email from localStorage
        const email = localStorage.getItem("email");
        const profile = localStorage.getItem("profile");
        const name = localStorage.getItem("name");

        if (name) {
            setUser({ name });  // 👈 This sets name from localStorage for instant rendering
          }
        
        if (email) {
          getUserProfile(email);
          if (profile) {
            setPic(profile);
          }
        }
      }, []);

      const getUserProfile = async (email) => {
        try {
          const res = await fetch("http://localhost:5000/api/get-profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
    
          if (res.ok) {
            const data = await res.json();
              // Save name and profile pic both
            setUser({ name: data.name });
            
            if (data.profilePic) {
                setPic(data.profilePic);
                localStorage.setItem("profile", data.profilePic); // ✅ SAVE profile in localStorage
              }
          } else {
            console.error("User not found or error in fetching");
          }
        } catch (error) {
          console.error("Fetch user error:", error);
        }
      };

      const handleSignOut = () => {
        // LocalStorage se data remove karna
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("profile");
    
        // User ko login page pe redirect karna
        navigate("/login");
      };
      return (
        <div className="d-flex">
          {/* Sidebar */}
          <div className="sidebar d-flex flex-column p-3 text-white">
            <div className="text-center mb-4">
              <img
                src={
                  pic ||
                  'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                }
                alt="Profile"
                className="rounded-circle shadow"
                width="80"
                height="80"
              />
              <h5 className="mt-2">{user.name}</h5>
            </div>
            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  <i className="bi bi-house-door me-2"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="userorders" className="nav-link text-white">
                  <i className="bi bi-bag-check me-2"></i> My Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/viewaddtocart" className="nav-link text-white">
                  <i className="bi bi-cart me-2"></i> Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/frontblog" className="nav-link text-white">
                  <i className="bi bi-journals me-2"></i> Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link text-white">
                  <i className="bi bi-person me-2"></i> Profile
                </Link>
              </li>
              <li className="nav-item mt-3">
                <button className="btn btn-outline-light w-100" onClick={handleSignOut}>
                  <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                </button>
              </li>
            </ul>
          </div>
    
          {/* Main content */}
          <div className="content p-4" style={{ flex: 1, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Outlet />
          </div>
    
          {/* CSS Styles */}
          <style jsx="true">{`
            .sidebar {
              width: 240px;
              min-height: 100vh;
              background: linear-gradient(180deg, #3c3b3f, #605c3c);
              box-shadow: 2px 0 15px rgba(0,0,0,0.1);
            }
    
            .nav-link {
              font-size: 1rem;
              padding: 12px;
              margin: 5px 0;
              border-radius: 10px;
              transition: background-color 0.3s ease;
            }
    
            .nav-link:hover {
              background-color: rgba(255, 255, 255, 0.2);
            }
    
            @media (max-width: 768px) {
              .sidebar {
                width: 100%;
                flex-direction: row;
                justify-content: space-around;
                padding: 10px 0;
              }
    
              .nav-pills {
                flex-direction: row;
                flex-wrap: wrap;
              }
    
              .nav-item {
                flex: 1 1 45%;
                text-align: center;
              }
    
              .content {
                padding: 1rem;
              }
            }
          `}</style>
        </div>
      );
    };

export default UserLayout