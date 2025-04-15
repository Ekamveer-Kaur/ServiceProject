import React, { useEffect, useState } from "react";
import "../Blogform.css";  // Adjust relative path
 // Import scoped CSS file
import axios from "axios";
import {useParams} from 'react-router-dom';

const Updatesubcategory = () => {

  const [subcategorytitle, setsubcategorytitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [photourl, setPhotourl] = useState("");
 const [content,setcontent] = useState("");
const [items,setitems]=useState({});

let {categoryid, subcategoryid}= useParams()
const formdata= JSON.stringify({
    categoryid:categoryid,  // aage wali backend vali back wali frontend wali
    subcategoryid:subcategoryid
})

useEffect(()=>{
if(items && typeof items== "object")
{
 
    setsubcategorytitle(items.subcategoryname);
    setPhotourl(items.subcategoryimage);
    setcontent(items.content);
}
},[items]);


useEffect(() => {
    fetch('http://localhost:5000/api/getsubcategory',{
        method: "POST",
        headers: {
            'Content-type': 'application/json'
          },
    
        body: formdata,
      }) // Make sure this matches your backend API route
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the data to inspect it
        setitems(data);
      })
      .catch(err => console.log(err));
  }, [categoryid]);


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
        alert("Error updating photo");
      });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(photourl);
  
    if (!subcategorytitle || !content || !photourl) {
      alert("All fields are required");
      return;
    }
  
    alert("Updating SubCategory...");
  
    // Upload the image first
    // await Upload(photo);  // Directly call Upload here instead of in useEffect.
  
    // if (!photourl) {
    //   alert("Image upload failed. Please try again.");
    //   return;
    // }
  
    try {
      const formData = {   categoryid,  
        subcategoryid, subcategoryname: subcategorytitle, subcategoryimage: photourl, content: content };
  
      const response = await axios.post("http://localhost:5000/api/updatesubcategory", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 200) {
        alert("SubCategory updated successfully");
        window.location.href="/admin/viewsubcategories";
        setsubcategorytitle("");
        setPhoto("");
        setcontent("");
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
      alert("Failed to update subcategory");
    }
  };
  
  


return (
    <div className="comment-container container mt-5 mb-4">
      <div className="row justify-content-center m-4">
        {/* Comment Form */}
        <div className="col-lg-6">
          <div className="card px-4 py-3 shadow-sm">
            <h2 className="text-center mb-3">Update a SubCategory</h2>
            <form onSubmit={handleSubmit}>
           
              <div className="mb-3">
                <label className="form-label">SubCategory Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter subcategory title"
                  value={subcategorytitle}
                  onChange={(e) => setsubcategorytitle(e.target.value)}
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
{photourl && (
  <div className="mb-3 text-center">
    <img src={photourl} alt="uploaded" width="150" className="rounded"/>
  </div>
)}
              <div className="mb-3">
                <label className="form-label">SubCategory Content</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Write your Subcategory content..."
                  value={content}
                  onChange={(e) => setcontent(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                SubCategory Updated
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

export default Updatesubcategory;
