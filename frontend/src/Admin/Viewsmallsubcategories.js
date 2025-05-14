import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate import kiya
import { Link } from 'react-router-dom';
const Viewsmallsubcategories = () => {
  const [items, setitems] = useState([]);
  const navigate = useNavigate(); // ✅ useNavigate ko define kiya

  // Handle deletion of a comment
  const Deletesmallsubcategory = async (categoryid, subcategoryid, smallsubcategoryid) => {
    const formdata = JSON.stringify({
      categoryid,
      subcategoryid,
      smallsubcategoryid
    });
    try{
    const response = await fetch(`http://localhost:5000/api/deletesmallsubcategory`,
       { method: 'POST' ,
        headers:{'content-type':'application/json'},
        body:formdata
       })
       if(response.ok){
        alert("SmallSubCategory deleted");
        setTimeout(()=>{
window.location.reload();
        },1000);
       }
       else{
alert("error");
       }
    }
    catch(err){
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
      <h1 className="text-center mb-4">View SmallSubcategories</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Category Name</th>
              <th>Subcategory Name</th>
              <th>Small Subcategory Name</th>
              <th>Image</th>
              <th>Content</th>
              <th>Price</th>
              <th>Created At</th>
              <th>Action</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {items.map(category =>
              category.subcategories.map(subcategory =>
                subcategory.subsmallcategories.map(smallsub => (
                  <tr key={smallsub._id}>
                    <td>{category.name}</td>
                    <td>{subcategory.subcategoryname}</td>
                    <td>{smallsub.subsmallcategoryname}</td>
                    <td>
                      <img
                        src={smallsub.subsmallcategoryimage}
                        alt={smallsub.subsmallcategoryname}
                        className="img-fluid rounded"
                        style={{ height: "50px", width: "50px", objectFit: "cover" }}
                      />
                    </td>
                    <td>{smallsub.subsmallcategorycontent}</td>
                    <td>{smallsub.price}</td>
                    <td>{new Date(smallsub.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => Deletesmallsubcategory(category._id, subcategory._id, smallsub._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                    <td>
                      <Link to={`/admin/Updatesmallsubcategory/${category._id}/${subcategory._id}/${smallsub._id}`}>
                        <button className="btn btn-warning btn-sm">
                          <i className="fa fa-edit"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-3">
        <button
          onClick={() => navigate('/admin/subsmallcategories')}
          className="btn btn-primary"
        >
          <i className="bi bi-plus-circle"></i> Add SmallSubCategory
        </button>
      </div>
    </div>
  );
};

export default Viewsmallsubcategories;





