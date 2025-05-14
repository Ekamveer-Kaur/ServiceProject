import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Enquiries from "./Enquiries";
import UserDashboard from "./UserDashboard";
import UserLayout from "./UserLayout";
import Profile from "./components/Profile";
import Blogform from "./Admin/Blogform";
import Viewblogs from "./Admin/Viewblogs";
import Frontblogs from "./components/Frontblogs";
import Readmore from "./components/Readmore";
import Categoryform from "./Admin/Categoryform";
import Subcategories from "./Admin/Subcategories";
import Subsmallcategories from "./Admin/Subsmallcategories";
import Updateblog from "./Admin/Updateblog";
import Viewcategories from "./Admin/Viewcategories";
import Viewsubcategories from "./Admin/Viewsubcategories";
import Viewsmallsubcategories from "./Admin/Viewsmallsubcategories";
import Updatecategory from "./Admin/Updatecategory";
import Updatesubcategory from "./Admin/Updatesubcategory";
import Updatesmallsubcategory from "./Admin/Updatesmallsubcategory";
import Viewsmallsubcategoryinfront from "./components/Viewsmallsubcategoryinfront";
import ViewAddtocart from "./components/ViewAddtocart";
import AdminOrders from "./Admin/AdminOrders";
import UserOrders from "./components/UserOrders";
import AdminRoute from "./components/AdminRoute";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import GetAllUser from "./Admin/GetAllUser";
import Footer from "./components/Footer";
import ViewSlider from "./components/ViewSlider";
import GetUserOrderDetails from "./components/GetUserOrderDetails";
import AdminOrderDetails from "./Admin/AdminOrderDetails";
// import Services from "./components/Services";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <BrowserRouter>
      <Routes>

        {/* Navbar Layout */}
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="" element={<Footer />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="/Viewsmallsubcategory/:name/:subcategoryname" element={<Viewsmallsubcategoryinfront/>} />
          <Route path="Viewaddtocart" element={<ViewAddtocart />} />
          <Route path="/frontblog" element={<Frontblogs />} />
          <Route path="/fullblog/:id" element={<Readmore/>}/>
          <Route path="/AboutUs" element={<AboutUs/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="category/:category" element={<ViewSlider />}/>
        </Route>
      
        {/* User Dashboard Layout */}
        <Route path="/UserDashboard" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
         
          <Route path="userorders" element={<UserOrders />} />
          <Route path="getuserorderdetails/:orderId" element={<GetUserOrderDetails />} />
         
        </Route>

        {/* Admin Dashboard Layout */}
        <Route path="/admin" element={<AdminRoute>
          <AdminLayout />
          </AdminRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="updateblog/:id" element={<Updateblog />} />
          <Route path="categories" element={<Categoryform/>}/>
          <Route path="viewcategories" element={<Viewcategories/>}/>
          <Route path="updatecategory/:id" element={<Updatecategory/>}/>
          <Route path="subcategories" element={<Subcategories />} /> 
          <Route path="updatesubcategory/:categoryid/:subcategoryid" element={<Updatesubcategory/>}/>
          <Route path="viewsubcategories" element={<Viewsubcategories />} /> 
          <Route path="subsmallcategories" element={<Subsmallcategories />} /> 
          <Route path="viewsmallsubcategories" element={<Viewsmallsubcategories />} />
          <Route path="updatesmallsubcategory/:categoryid/:subcategoryid/:smallsubid" element={<Updatesmallsubcategory/>}/>
          <Route path="blogs" element={<Blogform/>}/>
          <Route path="viewblogs" element={<Viewblogs/>}/>
          <Route path="getallusers" element={<GetAllUser/>}/>
          <Route path="adminorderdetails/:orderId" element={<AdminOrderDetails/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
