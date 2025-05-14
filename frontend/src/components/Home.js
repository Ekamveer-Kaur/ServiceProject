import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ContactUs from "./ContactUs";
import Services from "./Services";
import pic1 from "../Images/right.webp";
import pic2 from "../Images/first.webp";
import pic3 from "../Images/second.webp";
import pic4 from "../Images/third.webp";
import pic5 from "../Images/forth.webp";
import pic6 from "../Images/fifth.webp";
import pic7 from "../Images/sixth.webp";
import pic8 from "../Images/one.webp";
import pic9 from "../Images/two.png";
import pic10 from "../Images/three.jpeg";
import pic11 from "../Images/four.webp";
import pic12 from "../Images/five.jpg";
import Slider from "./Slider";
import Testimonial from "./Testimonials";
import AboutUs from "./AboutUs";
const Home = () => {
  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="row align-items-center bg-light p-4 rounded shadow-lg">
        {/* Left Column */}
        <div className="col-lg-6 mb-4">
          <h2 className="text-primary fw-bold display-6 text-center mb-4">
            Home Services at Your Doorstep
          </h2>
          <div
            className="p-4 rounded-4 shadow-sm bg-white"
            style={{ maxWidth: "520px", margin: "auto" }}
          >
            <h5 className="text-dark mb-4">What are you looking for?</h5>
            <Services />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-6">
          <img
            src={pic1}
            alt="Home Services"
            className="img-fluid rounded-4 shadow"
            style={{ objectFit: "cover", height: "100%", maxHeight: "500px" }}
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="d-flex justify-content-center gap-5 text-center mt-5">
        <div>
          <h3 className="text-warning fw-bold">⭐ 4.8</h3>
          <p className="text-muted">Service Rating</p>
        </div>
        <div>
          <h3 className="text-success fw-bold">👥 12M+</h3>
          <p className="text-muted">Customers Globally</p>
        </div>
      </div>

      {/* Carousel Section */}
      <div id="carouselExample" className="carousel slide mt-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="d-flex justify-content-center gap-4">
              {[pic2, pic3, pic4].map((pic, i) => (
                <img key={i} src={pic} alt={`Slide ${i}`} className="img-fluid rounded-3 shadow" style={{ width: "30%", objectFit: "cover" }} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex justify-content-center gap-4">
              {[pic5, pic6, pic7].map((pic, i) => (
                <img key={i} src={pic} alt={`Slide ${i + 3}`} className="img-fluid rounded-3 shadow" style={{ width: "30%", objectFit: "cover" }} />
              ))}
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* New and Noteworthy */}
      <div className="mt-5">
        <h2 className="text-center mb-4 text-decoration-underline">New and Noteworthy</h2>
        <div className="d-flex justify-content-center flex-wrap gap-4">
          {[{ img: pic8, text: "Insta Maids" }, { img: pic9, text: "Wall Panels" }, { img: pic10, text: "Native Water Purifier" }, { img: pic11, text: "Native Smart Locks" }, { img: pic12, text: "Kitchen Cleaning" }].map((item, idx) => (
            <div key={idx} className="text-center" style={{ width: "160px" }}>
              <img src={item.img} className="img-fluid rounded shadow-sm" alt={item.text} style={{ height: "160px", objectFit: "cover" }} />
              <p className="fw-semibold mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Most Booked */}
      <div className="mt-5">
        <h2 className="text-center mb-4 text-decoration-underline">Most Booked Services</h2>
        <div className="d-flex justify-content-center flex-wrap gap-4">
          {[{ img: pic8, text: "Insta Maids" }, { img: pic9, text: "Wall Panels" }, { img: pic10, text: "Native Water Purifier" }, { img: pic11, text: "Native Smart Locks" }, { img: pic12, text: "Kitchen Cleaning" }].map((item, idx) => (
            <div key={idx} className="text-center" style={{ width: "160px" }}>
              <img src={item.img} className="img-fluid rounded shadow-sm" alt={item.text} style={{ height: "160px", objectFit: "cover" }} />
              <p className="fw-semibold mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
<Slider/>
<AboutUs/>
      <ContactUs />
      <Testimonial/>
    </div>
  );
};

export default Home;
