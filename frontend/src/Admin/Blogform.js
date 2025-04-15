import React, { useEffect, useState } from "react";
import "../Blogform.css";  // Adjust relative path
 // Import scoped CSS file
import axios from "axios";

const Blogform = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [photourl, setPhotourl] = useState("");
 const [content,setContent] = useState("");


  useEffect(() => {
    if (photo) {
      Upload(photo);
    }
  }, [photo]);
  
  const Upload = async(photo) => {
    if (!photo) {
      alert("Please select a photo");
      return;
    }
  
    // Check if the selected file is an image
  // if (!photo.type.startsWith('image/')) {
  //   alert("Please select a valid image file");
  //   return;
  // }
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "comments");
    data.append("cloud_name", "dbuk7btza");
  
    await fetch("https://api.cloudinary.com/v1_1/dbuk7btza/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setPhotourl(data.url);
          localStorage.setItem("photo", data.url);
          alert("Photo uploaded successfully");
        } else {
          alert("Failed to upload photo");
        }
      })
      .catch((err) => {
        console.error("Upload error:", err);
        alert("Error uploading photo");
      });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(photourl);
  
    if (!title || !content || !photourl) {
      alert("All fields are required");
      return;
    }
  
    alert("Submitting Blog...");
  
    // Upload the image first
    // await Upload(photo);  // Directly call Upload here instead of in useEffect.
  
    // if (!photourl) {
    //   alert("Image upload failed. Please try again.");
    //   return;
    // }
  
    try {
      const formData = { title, photo: photourl, content };
  
      const response = await axios.post("http://localhost:5000/api/insertblog", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 200) {
        alert("Blog posted successfully");
        setTitle("");
        setPhoto("");
        setContent("");
      }
    } catch (error) {
      console.error("Error submitting Blog:", error);
      alert("Failed to submit Blog");
    }
  };
  
  


return (
    <div className="comment-container container mt-5 mb-4">
      <div className="row justify-content-center m-4">
        {/* Comment Form */}
        <div className="col-lg-6">
          <div className="card px-4 py-3 shadow-sm">
            <h2 className="text-center mb-3">Add a Blog Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Blog Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter comment title"
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

              <div className="mb-3">
                <label className="form-label">Blog Content</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Write your Blog..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Publish Blog
              </button>
            </form>
          </div>
        </div>

        {/* Comment Image */}
        <div className="col-lg-6 mt-3 d-flex flex-column ">
          <img style={{height:"300px",width:"400px"}}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnMGl8QAo8SpCh_HJ4aia-8agpOdGGSxbKKg&s"
            alt="Blog"
            className="comment-image img-fluid rounded shadow "
          />
          <img  style={{height:"300px",width:"400px"}}
            src="https://img.freepik.com/free-photo/online-message-comment-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg"
            alt="Blog"
            className="comment-image img-fluid rounded shadow mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Blogform;