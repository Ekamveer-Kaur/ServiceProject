import React from "react";
import { useNavigate } from "react-router-dom";
import "./slider.css";

const slides = [
  { src: "https://salonbizsoftware.com/wp-content/uploads/2024/02/Stylists-doing-hair-at-salon-stations.jpg", category: "salon" },
  { src: "https://d1593xiyv01mio.cloudfront.net/gb/cms_content/276/e311d0f658824896b27f954b1e00f11f.jpg", category: "NailArt" },
  { src: "https://industry.asianhhm.com/articles/managing-delivering1.jpg", category: "hospital" },
  { src: "https://5.imimg.com/data5/SELLER/Default/2024/3/397835252/WR/BF/HR/92584819/ac-and-refrigeration-repairing.jpg", category: "Repairing" },
  { src: "https://content.jdmagicbox.com/v2/comp/hanumangarh/y1/9999p1552.1552.230420113058.l9y1/catalogue/a-to-z-cleaning-services-sureshiya-hanumangarh-cleaning-services-f4se4xxvy0.jpg", category: "Cleaning" },
  { src: "https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg", category: "spa" },
  { src: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_600,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1738232245414-2c017e.jpeg", category: "facial" }
];

const Slider = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="infinite-slider-container">
      <div className="infinite-slider-track">
        {[...slides, ...slides].map((slide, index) => (
          <div className="infinite-slide" key={index} onClick={() => handleClick(slide.category)}>
            <img src={slide.src} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
