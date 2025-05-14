import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const AdminLayout = () => {
    const [item, setItem] = useState([]);
    const [pic, setPic] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');  // Token Check kar rahe hain
        if (!token) {
            navigate('/login'); // Agar Token nahi mila toh login page par redirect karega
        } else {
            const name = localStorage.getItem('name');
            setItem({ name });
            getProfilePic();
        }
    }, []); // [] dependency hai taki useEffect me error na aaye

    const getProfilePic = async () => {
        const email = localStorage.getItem("email");
        try {
            const response = await fetch("http://localhost:5000/api/get-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                const data = await response.json();
                setPic(data.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
            } else {
                alert("Failed to update profile in backend");
            }
        } catch (error) {
            console.error("Error updating profile in backend:", error);
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        navigate("/login");
    }

    useEffect(() => {
        // Bootstrap dropdown enable karne ke liye
        const dropdownElements = document.querySelectorAll('.dropdown-toggle');
        dropdownElements.forEach(dropdown => {
            new window.bootstrap.Dropdown(dropdown);
        });
    }, []);

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark sidebar-custom">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none fs-4 fw-bold">
                            <i className="bi bi-speedometer2 me-2"></i> <span className="d-none d-sm-inline">Admin</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 w-100" id="menu">
                            <li className="nav-item">
                                <Link to="enquiries" className="nav-link text-white custom-link">
                                    <i className="bi bi-house-door me-2"></i> Home
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white custom-link" href="#" id="dashboardDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-speedometer me-2"></i> Dashboard
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li><Link className="dropdown-item" to="getallusers">View Users</Link></li>
                                    <li><Link className="dropdown-item" to="viewcategories">View Categories</Link></li>
                                    <li><Link className="dropdown-item" to="viewsubcategories">View Sub-Categories</Link></li>
                                    <li><Link className="dropdown-item" to="viewsmallsubcategories">View Small Sub-Categories</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="orders" className="nav-link text-white custom-link">
                                    <i className="bi bi-bag-check me-2"></i> Orders
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white custom-link" href="#" id="blogDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-journals me-2"></i> Blog
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li><Link className="dropdown-item" to="blogs">Add Blog</Link></li>
                                    <li><Link className="dropdown-item" to="viewblogs">View Blog</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white custom-link" href="#" id="catDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-tags me-2"></i> Categories
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li><Link className="dropdown-item" to="categories">Add Category</Link></li>
                                    <li><Link className="dropdown-item" to="subcategories">Sub Category</Link></li>
                                    <li><Link className="dropdown-item" to="subsmallcategories">Sub-small category</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <hr className="w-100 border-light" />
                        <div className="dropdown pb-4 w-100">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img 
                                    src={pic} 
                                    alt="Profile" 
                                    width="32" 
                                    height="32" 
                                    className="rounded-circle me-2 shadow-sm"
                                />
                                <span className="d-none d-sm-inline">{item.name}</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#" onClick={handleSignOut}>Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col py-3 bg-light" style={{ minHeight: '100vh', overflowY: 'auto' }}>
                    <Outlet />
                </div>
            </div>

            <style jsx>{`
                .sidebar-custom {
                    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
                }

                .custom-link {
                    padding: 10px;
                    border-radius: 10px;
                    margin: 5px 0;
                    transition: background 0.3s ease;
                }

                .custom-link:hover {
                    background-color: #495057;
                    color: #fff !important;
                }

                .dropdown-menu {
                    border-radius: 10px;
                }

                @media (max-width: 768px) {
                    .sidebar-custom {
                        min-height: auto;
                        padding-bottom: 20px;
                    }
                    .dropdown-menu {
                        position: static !important;
                        float: none;
                    }
                }
            `}</style>
        </div>
    );
}

export default AdminLayout;
