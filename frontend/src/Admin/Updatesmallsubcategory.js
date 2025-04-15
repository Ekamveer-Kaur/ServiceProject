import React, { useEffect, useState } from "react";
import "../Blogform.css";  
import axios from "axios";
import { useParams } from 'react-router-dom';

const Updatesmallsubcategory = () => {
  const [subsmallcategorytitle, setsubsmallcategorytitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [subsmallcategorycontent, setsubsmallcategorycontent] = useState("");
  const [price, setprice] = useState("");
  const [items, setitems] = useState({});

  let { categoryid, subcategoryid, smallsubid } = useParams();

  useEffect(() => {
    fetch("http://localhost:5000/api/getsmallsubcategory", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ categoryid, subcategoryid, smallsubcategoryid: smallsubid }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        setitems(data);
      })
      .catch(err => console.log(err));
  }, [categoryid, subcategoryid, smallsubid]); // ✅ Added all dependencies

  useEffect(() => {
    if (items && typeof items === "object") {
      setsubsmallcategorytitle(items.subsmallcategoryname);
      setPhotourl(items.subsmallcategoryimage); // ✅ Corrected key name
      setsubsmallcategorycontent(items.subsmallcategorycontent);
      setprice(items.price);
    }
  }, [items]);

  useEffect(() => {
    if (photo) {
      Upload(photo);
    }
  }, [photo]);

  const Upload = async (photo) => {
    if (!photo) {
      alert("Please select a photo");
      return;
    }

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
    
    if (!subsmallcategorytitle || !subsmallcategorycontent || !price) {
      alert("All fields are required");
      return;
    }

    alert("Updating SubsmallCategory...");

    try {
      const formData = {
        categoryid,
        subcategoryid,
        subsmallcategoryid: smallsubid,  // ✅ Sahi key name jo backend se match kare  right side vala frontend hota smallsubid

        subsmallcategoryname: subsmallcategorytitle,
        subsmallcategoryimage: photourl,
        subsmallcategorycontent: subsmallcategorycontent,
        price:price
      };

      const response = await axios.post("http://localhost:5000/api/updatesubsmallcategory", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("SubsmallCategory updated successfully");
        window.location.href = "/admin/viewsmallsubcategories";
        setsubsmallcategorytitle("");
        setPhoto("");
        setsubsmallcategorycontent("");
      }
    } catch (error) {
      console.error("Error updating subsmallcategory:", error);
      alert("Failed to update subsmallcategory");
    }
  };

  return (
    <div className="comment-container container mt-5 mb-4">
      <div className="row justify-content-center m-4">
        <div className="col-lg-6">
          <div className="card px-4 py-3 shadow-sm">
            <h2 className="text-center mb-3">Update a SubsmallCategory</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">SubsmallCategory Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter subsmallcategory title"
                  value={subsmallcategorytitle}
                  onChange={(e) => setsubsmallcategorytitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>

              {photourl && (
                <div className="mb-3 text-center">
                  <img src={photourl} alt="uploaded" width="150" className="rounded" />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">SubsmallCategory Content</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Write your Subcategory content..."
                  value={subsmallcategorycontent} // ✅ Fixed incorrect variable name
                  onChange={(e) => setsubsmallcategorycontent(e.target.value)}
                  required
                ></textarea>
              </div>
 {/* ✅ Price Field */}
 <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Update SubsmallCategory
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-6 mt-3 d-flex flex-column ">
          <img style={{ height: "300px", width: "400px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnMGl8QAo8SpCh_HJ4aia-8agpOdGGSxbKKg&s"
            alt="Blog"
            className="comment-image img-fluid rounded shadow "
          />
          <img style={{ height: "300px", width: "400px" }}
            src="https://img.freepik.com/free-photo/online-message-comment-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg"
            alt="Blog"
            className="comment-image img-fluid rounded shadow mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Updatesmallsubcategory;
