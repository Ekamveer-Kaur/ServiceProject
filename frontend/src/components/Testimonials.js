import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Testimonial = () => {


    const videos = [
        {
          title: "Service Overview",
          src: "https://www.youtube.com/embed/ewtCAkM55Fc",
          description: "Learn more about our services and how we can help you."
        },
        {
          title: "Customer Testimonial",
          src: "https://www.youtube.com/embed/Uf4JAss1vEo",
          
          description: "Hear from our happy customers who have used our services."
        },
        {
          title: "Step-by-Step Guide",
          src: "https://www.youtube.com/embed/-7diJ5P7TCk",
          description: "Follow this guide to make the most of our offerings."
        }
      ];
      

    return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Videos & Information</h2>
      <div className="row">
        {videos.map((video, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm">
              <div className="ratio ratio-16x9">
                <iframe
                  src={video.src}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                <p className="card-text">{video.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;