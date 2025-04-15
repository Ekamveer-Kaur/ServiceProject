import React, { useEffect, useState } from "react";
import "../Categoryform.css";  // Adjust relative path
 // Import scoped CSS file
import axios from "axios";

const Categoryform = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [photourl, setPhotourl] = useState("");
 


  useEffect(() => {
    console.log("selected photo "+photo)
    if (photo) {
      Upload(photo);
    }
  }, [photo]);
  
  const Upload = async (photo) => {
    if (!photo) {
      alert("Please select a photo");
      return ;
    }
  
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "categories");
    data.append("cloud_name", "dbuk7btza");
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dbuk7btza/image/upload", {
        method: "POST",
        body: data,
      });
  
      const result = await res.json();
      if (result.url) {
        setPhotourl(result.url);
        localStorage.setItem("photo", result.url);
        alert("Photo uploaded successfully");
        return result.url; // Return uploaded image URL
      } else {
        alert("Failed to upload photo");
        return null;
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading photo");
      return null;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("name:"+title);
    console.log("photo"+photourl)
  
    if (!title || !photo ) {
      alert("All fields are required");
      return;
    }
  
    alert("Uploading image, please wait...");
  
    const uploadedImage = await Upload(photo); // Wait for upload completion
    if (!uploadedImage) {
      alert("Image upload failed. Please try again.");
      return;
    }
  
    try {
      const formData = { name:title, image: photourl };
  
      const response = await axios.post(
        "http://localhost:5000/api/insertcategory",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        alert("Category added successfully");
        setTitle("");
        setPhoto("");
        
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category");
    }
  };
  
  
  
  


return (
    <div className="category-container container mt-5 mb-4">
      <div className="row justify-content-center m-4">
        {/* Category Form */}
        <div className="col-lg-6">
          <div className="card px-4 py-3 shadow-sm">
            <h2 className="text-center mb-3">Add a Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Category Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>

             

              <button type="submit" className="btn btn-primary w-100">
                Add Category
              </button>
            </form>
          </div>
        </div>

        {/* Category Image */}
        <div className="col-lg-6 mt-3 d-flex flex-column ">
          <img style={{height:"300px",width:"400px"}}
            src="https://th.bing.com/th/id/OIP.wWghX8rRvtrHuA3cGqqjFwHaDt?rs=1&pid=ImgDetMain"
            alt="Blog"
            className="category-image img-fluid rounded shadow "
          />
          <img  style={{height:"300px",width:"400px"}}
            src="https://wpupdoot.com/wp-content/uploads/2021/10/NCT025-Add-Category-1030x579.png"
            alt="Blog"
            className="category-image img-fluid rounded shadow mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Categoryform;