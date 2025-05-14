import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate import kiya
import { Link } from 'react-router-dom';
const Viewsubcategories = () => {
  const [items, setitems] = useState([]);
  const navigate = useNavigate(); // ✅ useNavigate ko define kiya

  // Handle deletion of a comment
  const DeleteSubcategory = async (categoryId, subcategoryId) => {
    const formdata = JSON.stringify({ id: categoryId, subcategoryid: subcategoryId });
    try {
      const response = await fetch(`http://localhost:5000/api/deletesubcategory`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: formdata
      });

      if (response.ok) {
        alert("Subcategory deleted");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        alert("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };




  useEffect(() => {
    fetch('http://localhost:5000/viewcategories') // Make sure this matches your backend API route
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the data to inspect it
        setitems(data);
      })
      .catch(err => console.log(err));
  }, []);
  

  
    return (
      <div className="container mt-4">
        <h1 className="text-center mb-4">View SubCategories</h1>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Category Name</th>
                <th>Subcategory Name</th>
                <th>Image</th>
                <th>Content</th>
                <th>Created At</th>
                <th>Action</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {items.map(category =>
                category.subcategories.map(subcategory => (
                  <tr key={subcategory._id}>
                    <td>{category.name}</td>
                    <td>{subcategory.subcategoryname}</td>
                    <td>
                      <img
                        src={subcategory.subcategoryimage}
                        alt={subcategory.subcategoryname}
                        className="img-fluid rounded"
                        style={{ height: "50px", width: "50px", objectFit: "cover" }}
                      />
                    </td>
                    <td>{subcategory.content}</td>
                    <td>{new Date(subcategory.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => DeleteSubcategory(category._id, subcategory._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                    <td>
                      <Link to={`/admin/Updatesubcategory/${category._id}/${subcategory._id}`}>
                        <button className="btn btn-warning btn-sm">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-3">
          <Link to="/admin/subcategories" className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Add SubCategory
          </Link>
        </div>
      </div>
    );
  };
export default Viewsubcategories;
