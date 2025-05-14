import React from "react";
import { useParams } from "react-router-dom";
import "./Viewslider.css"

const allImages = {
  salon: [
    "https://salonbizsoftware.com/wp-content/uploads/2024/02/Stylists-doing-hair-at-salon-stations.jpg",
"https://media.istockphoto.com/id/1497806504/photo/hair-styling-in-beauty-salon-woman-does-her-hair-in-modern-beauty-salon-woman-stylist-dries.jpg?s=612x612&w=0&k=20&c=3dO_HWS8WvSGNbGmxTsqK70vZMGqM2REnbVJG09YnmI=",
"https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg"
],
NailArt:[
    "https://i.pinimg.com/736x/e8/b8/1c/e8b81cf39f7b8de1e89ea0fb95597dc8.jpg",
"https://m.media-amazon.com/images/I/71u4Yn0K5lL.jpg",

"https://addmug.com/wp-content/uploads/2024/12/Latest-Pink-Nail-Art-Design.webp",
"https://i.ytimg.com/vi/9If1mckU5vY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCFs6nQwv-v_puOsT5slhIgzcPI7A",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiGKYwc9L47nMc_fKMToW3qDV-VQY2dWs9OQ&s"
],
  hospital: [
"https://media.istockphoto.com/id/156431166/photo/young-healthcare-workers-meditation-during-break.jpg?s=612x612&w=0&k=20&c=hhzoWVJPGpRmqlFrQmwQxcKTQS7YZ7CHO7kfqoUcloc=",
"https://media.istockphoto.com/id/156431166/photo/young-healthcare-workers-meditation-during-break.jpg?s=612x612&w=0&k=20&c=hhzoWVJPGpRmqlFrQmwQxcKTQS7YZ7CHO7kfqoUcloc=",
"https://domf5oio6qrcr.cloudfront.net/medialibrary/2293/conversions/l0908b16207233934035-thumb.jpg",
"https://images.healthshots.com/healthshots/en/uploads/2024/10/30124242/group-exercise-1.jpg"],
  Repairing: [
"https://5.imimg.com/data5/SELLER/Default/2023/7/327302559/VN/TF/OJ/193240027/commercial-air-conditioner-repair-service-250x250.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiRgxaeQ9poGpKTaGDkJ32bqtCiIMjeA7Bnw09VzHx9phktU0745Tqu11JbOGEvCuuJ_8&usqp=CAU"
],
Cleaning:[
    "https://content.jdmagicbox.com/v2/comp/hanumangarh/y1/9999p1552.1552.230420113058.l9y1/catalogue/a-to-z-cleaning-services-sureshiya-hanumangarh-cleaning-services-f4se4xxvy0.jpg",
"https://content.jdmagicbox.com/comp/def_content/floor-cleaning-services/gallery31017-728x4102x-floor-cleaning-services-9-8p8ew.jpg"
]
};

const ViewSlider = () => {
  const { category } = useParams();
  //yeh category jo app.js main likha :category vo path hai

  const images = allImages[category] || [];

  return (
    <div className="category-page">
      <h2>{category.toUpperCase()} Images</h2>
      <div className="image-grid">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Category ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ViewSlider;