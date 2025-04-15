// import React, { useEffect, useState } from "react";
// import "../Categoryform.css"; 
// import axios from "axios";

// const Subcategories = () => {
//   const [subcategoryname, setSubcategoryName] = useState("");
//   const [photo, setPhoto] = useState("");
//   const [content, setContent] = useState(""); 
//   const [subcategoryimage, setSubcategoryImage] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/categories");
//       setCategories(res.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   // Handle file upload to Cloudinary
//   const Upload = async (photo) => {
//     if (!photo) {
//       alert("Please select a photo");
//       return;
//     }

//     const data = new FormData();
//     data.append("file", photo);
//     data.append("upload_preset", "categories");
//     data.append("cloud_name", "dbuk7btza");

//     try {
//       const res = await fetch("https://api.cloudinary.com/v1_1/dbuk7btza/image/upload", {
//         method: "POST",
//         body: data,
//       });
//       const file = await res.json();
//       if (file.url) {
//         setSubcategoryImage(file.url);
//         alert("Photo uploaded successfully");
//       } else {
//         alert("Failed to upload photo");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Error uploading photo");
//     }
//   };

//   useEffect(() => {
//     if (photo) {
//       Upload(photo);
//     }
//   }, [photo]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!subcategoryname || !subcategoryimage || !content) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       const formData = { subcategoryname, subcategoryimage, name: selectedCategory ,content};

//       const response = await axios.post("http://localhost:5000/api/insertsubcategory", formData, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.status === 200) {
//         alert("SubCategory added successfully");
//         setSubcategoryName("");
//         setPhoto("");
//         setSubcategoryImage("");
//         setSelectedCategory("");
//       }
//     } catch (error) {
//       console.error("Error adding subcategory:", error);
//       alert("Failed to add subcategory");
//     }
//   };

//   return (
//     <div className="category-container container mt-5 mb-4">
//       <div className="row justify-content-center m-4">
//         <div className="col-lg-6">
//           <div className="card px-4 py-3 shadow-sm">
//             <h2 className="text-center mb-3">Add a Sub Category</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Select Category</label>
//                 <select
//                   className="form-control"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   <option value="">Choose a Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat.name}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">SubCategory Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter subcategory name"
//                   value={subcategoryname}
//                   onChange={(e) => setSubcategoryName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Image </label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   onChange={(e) => setPhoto(e.target.files[0])}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">SubCategory Content</label>
//                 <textarea
//                   className="form-control"
//                   rows="5"
//                   placeholder="Enter description..."
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   required
//                 ></textarea>
//               </div>
//               <button type="submit" className="btn btn-primary w-100">
//                 Add SubCategory
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className="col-lg-6 mt-3 d-flex flex-column ">
//           <img
//             style={{ height: "300px", width: "400px" }}
//             src="https://th.bing.com/th/id/OIP.wWghX8rRvtrHuA3cGqqjFwHaDt?rs=1&pid=ImgDetMain"
//             alt="Blog"
//             className="category-image img-fluid rounded shadow "
//           />
//           <img
//             style={{ height: "300px", width: "400px" }}
//             src="https://wpupdoot.com/wp-content/uploads/2021/10/NCT025-Add-Category-1030x579.png"
//             alt="Blog"
//             className="category-image img-fluid rounded shadow mt-4"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Subcategories;













import React, { useEffect, useState } from "react";
import "../Categoryform.css";
import axios from "axios";

const Subcategories = () => {
  const [subcategoryname, setSubcategoryName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [content, setContent] = useState("");
  const [subcategoryimage, setSubcategoryImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle file upload to Cloudinary
  const uploadToCloudinary = async (photo) => {
    if (!photo) return alert("Please select a photo");

    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "categories");
    data.append("cloud_name", "dbuk7btza");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dbuk7btza/image/upload", {
        method: "POST",
        body: data,
      });
      const file = await res.json();
      if (file.url) {
        setSubcategoryImage(file.url);
        alert("Photo uploaded successfully");
      } else {
        alert("Failed to upload photo");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading photo");
    }
  };

  useEffect(() => {
    if (photo) uploadToCloudinary(photo);
  }, [photo]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subcategoryname || !subcategoryimage || !content || !selectedCategory) {
      return alert("All fields are required");
    }

    try {
      const formData = { 
        subcategoryname, 
        subcategoryimage, 
        name: selectedCategory, 
        content 
      };

      console.log("Sending Data:", formData);

      const response = await axios.post("http://localhost:5000/api/insertsubcategory", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("SubCategory added successfully");
        setSubcategoryName("");
        setPhoto(null);
        setSubcategoryImage("");
        setSelectedCategory("");
        setContent("");
      }
    } catch (error) {
      console.error("Error adding subcategory:", error);
      alert("Failed to add subcategory");
    }
  };

  return (
    <div className="category-container container mt-5 mb-4">
      <div className="row justify-content-center m-4">
        <div className="col-lg-6">
          <div className="card px-4 py-3 shadow-sm">
            <h2 className="text-center mb-3">Add a Sub Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Select Category</label>
                <select
                  className="form-control"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="">Choose a Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">SubCategory Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter subcategory name"
                  value={subcategoryname}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">SubCategory Content</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Enter description..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={!subcategoryimage} // Ensure image is uploaded
              >
                Add SubCategory
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-6 mt-3 d-flex flex-column ">
          <img
            style={{ height: "300px", width: "400px" }}
            src={subcategoryimage || "https://th.bing.com/th/id/OIP.wWghX8rRvtrHuA3cGqqjFwHaDt?rs=1&pid=ImgDetMain"}
            alt="Preview"
            className="category-image img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default Subcategories;
  