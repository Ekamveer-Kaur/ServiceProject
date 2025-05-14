import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-5 pb-4">
      <div className="container text-md-start text-center">
        <div className="row p-4">

          {/* Urban Company Logo */}
          <div className="col-12 mb-4 text-md-start text-center">
            <img
              src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_144,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1648471968852-1f2b01.png"
              alt="Urban Company Logo"
              style={{
                height: "50px",
                width: "auto",
                overflow: "hidden",
                objectFit: "contain"
              }}
            />
          </div>

          {/* Company Section */}
          <div className="col-md-3 mb-4 mt-5">
            <h5 className="fw-bold">Company</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none">About us</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Terms & conditions</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Privacy policy</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Anti-discrimination policy</a></li>
              <li><a href="#" className="text-dark text-decoration-none">UC impact</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Careers</a></li>
            </ul>
          </div>

          {/* For Customers Section */}
          <div className="col-md-3 mt-5 mb-4">
            <h5 className="fw-bold">For customers</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none">UC reviews</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Categories near you</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Contact us</a></li>
            </ul>
          </div>

          {/* For Partners Section */}
          <div className="col-md-3 mt-5 mb-4">
            <h5 className="fw-bold">For partners</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none">Register as a professional</a></li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="col-md-3 mb-4  mt-5  text-md-start text-center">
            <h5 className="fw-bold">Social links</h5>
            <div className="d-flex justify-content-md-start justify-content-center gap-3">
              <a href="#"><img src="https://img.icons8.com/ios/50/twitter.png" alt="Twitter" width="25"/></a>
              <a href="#"><img src="https://img.icons8.com/ios/50/facebook.png" alt="Facebook" width="25"/></a>
              <a href="#"><img src="https://img.icons8.com/ios/50/instagram-new.png" alt="Instagram" width="25"/></a>
              <a href="#"><img src="https://img.icons8.com/ios/50/linkedin.png" alt="LinkedIn" width="25"/></a>
            </div>
            {/* <div className="mt-3 d-flex justify-content-md-start justify-content-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Google_Play_Store_badge_EN.svg" alt="Google Play" width="120" className="me-2"/>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" width="120"/>
            </div> */}
          </div>

        </div>
        <hr className='mt-4' style={{ width: "100%", borderTop: "1px solid #7e7e7e" }} /> 


        {/* Copyright Section */}
        <div className=" text-muted mt-4 pt-5">
          © Copyright 2024 Urban Company. All rights reserved. | CIN: U74140DL2014PTC274413
        </div>
      </div>
    </footer>
  );
};

export default Footer;