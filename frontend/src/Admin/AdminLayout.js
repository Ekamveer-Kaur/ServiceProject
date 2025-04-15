import React, { useEffect, useState } from 'react'
import { Link , Outlet, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const AdminLayout = () => {
    const [item,setItem]=useState([])
    const [pic,setpic]=useState("");
    const navigate=useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');  // Token Check kar rahe hain
        if (!token) {
            
            navigate('/login'); // Agar Token nahi mila toh login page par redirect karega
            
        } else {
            const name = localStorage.getItem('name');
            // const profilepic=localStorage.getItem("profile");
            // setpic(profilepic|| "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
            setItem({ name });
            getprofilepic();
        }
    }, []); // [] dependency hai taki useEffect me error na aaye

    const getprofilepic = async () => {
        const email = localStorage.getItem("email");
        try {
            const response = await fetch("http://localhost:5000/api/get-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    
                })
            });

            if (response.ok) {
                const data=await response.json();
                // const profilepic=localStorage.getItem("profile");
                // console.log(data)
                console.log(data.profilePic);
            setpic(data.profilePic|| "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");

            } else {
                alert("Failed to update profile in backend");
            }
        } catch (error) {
            console.error("Error updating profile in backend:", error);
        }
    }   

    const handleSignOut=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        navigate("/contact")
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
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <Link to=
                        'enquiries' class="nav-link align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
    <a href="#" className="nav-link px-0 align-middle dropdown-toggle" id="blogDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="fs-4 bi-file-text"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
    </a>
    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="blogDropdown">
        <li><Link className="dropdown-item" to="viewcategories">View Categories</Link></li>
        <li><Link className="dropdown-item" to="viewsubcategories">View Sub-Categories</Link></li>
        <li><Link className="dropdown-item" to="viewsmallsubcategories">View Small Sub-Categories</Link></li>
    </ul>
</li>
                    <li>
                        <Link to="orders" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">ALL Orders</span></Link>
                    </li>
                    <li>
                        <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                            <i class="fs-4 bi-bootstrap"></i> <span class="ms-1 d-none d-sm-inline">Bootstrap</span></a>
                        <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1</a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">Products</span> </a>
                            <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 1</a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 2</a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 3</a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 4</a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
    <a href="#" className="nav-link px-0 align-middle dropdown-toggle" id="blogDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="fs-4 bi-file-text"></i> <span className="ms-1 d-none d-sm-inline">Blog</span>
    </a>
    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="blogDropdown">
        <li><Link className="dropdown-item" to="blogs">Add Blog</Link></li>
        <li><Link className="dropdown-item" to="viewblogs">View Blog</Link></li>
    </ul>
</li>
<li className="nav-item dropdown">
    <a href="#" className="nav-link px-0 align-middle dropdown-toggle" id="blogDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="fs-4 bi-file-text"></i> <span className="ms-1 d-none d-sm-inline">Categories</span>
    </a>
    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="blogDropdown">
        <li><Link className="dropdown-item" to="categories">Add Category</Link></li>
        <li><Link className="dropdown-item" to="subcategories">Sub Category</Link></li>
        <li><Link className="dropdown-item" to="subsmallcategories">Sub-small category</Link></li>
    </ul>
</li>
                </ul>
                <hr/>
                <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img 
    src={pic ? pic : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
    alt="Profile" 
    width="30" 
    height="30" 
    className="rounded-circle"
/>


                        


                        <span class="d-none d-sm-inline mx-1">{item.name}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><Link class="dropdown-item" to="profile">Profile</Link></li>
                        <li>
                            <hr class="dropdown-divider"/>
                        </li>
                        <li><a class="dropdown-item" href="#" onClick={handleSignOut}>Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <Outlet/>
        
    </div>
</div>
  )
}

export default AdminLayout


