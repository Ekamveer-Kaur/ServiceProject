import React, { useEffect, useState } from "react";

const SmallSubCategories = () => {
  const [categories, setCategories] = useState([]); // Store categories
  const [subCategories, setSubCategories] = useState([]); // Store subcategories
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [selectedSubCategory, setSelectedSubCategory] = useState(""); // Selected subcategory
  const [smallSubCategoryTitle, setSmallSubCategoryTitle] = useState(""); // Small subcategory title
  const [photo, setPhoto] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state add kiya
  const [price, setPrice] = useState("");  // ✅ New state added

  // Fetch categories when component loads
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch subcategories when category changes
  // Fetch subcategories when category changes
useEffect(() => {
  if (selectedCategory) {
    fetch(`http://localhost:5000/api/subcategories/${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setSubCategories(data)) // Sahi data set ho raha hai
      .catch((err) => console.error("Error fetching subcategories:", err));
  } else {
    setSubCategories([]); // Agar koi category select nahi hai to subcategories empty rakhni hai
  }
}, [selectedCategory]);

useEffect(() => {
    console.log("Selected Photo:", photo);
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
    data.append("upload_preset", "categories");
    data.append("cloud_name", "dbuk7btza");

    fetch("https://api.cloudinary.com/v1_1/dbuk7btza/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Cloudinary Response:", data);  // ✅ Response check karne ke liye
        if (data.secure_url) {
          setPhotourl(data.secure_url);
          localStorage.setItem("photo", data.secure_url);
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
  console.log("smallcategorytitle:", smallSubCategoryTitle);
    console.log("subcategoryname:", selectedSubCategory);
    console.log("photourl:", photourl);
    console.log("category name:", selectedCategory);
    console.log("content:", content);

  if (!selectedCategory || !selectedSubCategory || !smallSubCategoryTitle || !photourl || !content|| !price) {
    alert("All fields are required");
    return;
  }

  setLoading(true); // ✅ Loading start kar diya
  try {
    const response = await fetch("http://localhost:5000/api/insertsmallsubcategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selectedCategory,
        subcategoryname: selectedSubCategory,
        subsmallcategoryname: smallSubCategoryTitle,
        subsmallcategoryimage: photourl,
        subsmallcategorycontent: content,
        price
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Small-Sub-Category added successfully");
      setSelectedCategory("");
      setSelectedSubCategory("");
      setSmallSubCategoryTitle("");
      setPhoto("");
      setPhotourl("");
      setContent("");
      setPrice("");
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Error submitting small-sub-category:", error);
    alert("Failed to submit small-sub-category. Please try again.");
  } finally {
    setLoading(false); // ✅ Request complete hone ke baad loading hata diya
  }
};



  return (
    <div className="blog-container container mt-5 mb-4">
      <div className="row justify-content-center m-4">
        {/* Form */}
        <div className="col-lg-6">
          <div className="card px-4 py-3 shadow-sm">
            <h2 className="text-center mb-3">Add Small-Sub Category</h2>
            <form onSubmit={handleSubmit}>
              {/* Category Dropdown */}
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <select
                  className="form-control"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub-Category Dropdown */}
              <div className="mb-3">
                <label className="form-label">Sub-Category Name</label>
                <select
                  className="form-control"
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  required
                  disabled={!selectedCategory}
                >
                  <option value="">Select Sub-Category</option>
                  {Array.isArray(subCategories) &&
  subCategories.map((sub) => (

                    <option key={sub._id} value={sub.subcategoryname}>
                      {sub.subcategoryname}
                    </option>
                  ))}
                </select>
              </div>

              {/* Small-Sub-Category Name */}
              <div className="mb-3">
                <label className="form-label">Small-Sub-Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter small-sub-category name"
                  value={smallSubCategoryTitle}
                  onChange={(e) => setSmallSubCategoryTitle(e.target.value)}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>

{/* Price Field */}
<div className="mb-3">
  <label className="form-label">Price</label>
  <input
    type="number"
    className="form-control"
    placeholder="Enter price"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    required
  />
</div>

              {/* Content */}
              <div className="mb-3">
                <label className="form-label">Category Content</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Write your Content..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Add Small-Sub Category
              </button>
            </form>
          </div>
        </div>

        {/* Blog Image */}
        <div className="col-lg-6 mt-3 d-flex flex-column align-items-center">
          <img
            src="https://elearningindustry.com/wp-content/uploads/2013/09/how-to-use-blogs-in-the-classroom.jpg"
            alt="Blog"
            className="blog-image img-fluid rounded shadow "
          />
          <img
            src="https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg"
            alt="Blog"
            className="blog-image img-fluid rounded shadow mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default SmallSubCategories;