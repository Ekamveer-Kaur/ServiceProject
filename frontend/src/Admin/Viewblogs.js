import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate import kiya
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const Viewblogs = () => {
  const [items, setitems] = useState([]);
  const navigate = useNavigate(); // ✅ useNavigate ko define kiya

  // Handle deletion of a comment
  const Deleteblog = async(id) => {
    const formdata=JSON.stringify({
      id:id
    })
    try{
    const response = await fetch(`http://localhost:5000/api/deleteblog`,
       { method: 'POST' ,
        headers:{'content-type':'application/json'},
        body:formdata
       })
       if(response.ok){
        alert("Blog deleted");
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
    fetch('http://localhost:5000/viewblogs') // Make sure this matches your backend API route
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the data to inspect it
        setitems(data);
      })
      .catch(err => console.log(err));
  }, []);
  

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">View Blogs</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Content</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map(item => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ height: "50px", width: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.content}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => Deleteblog(item._id)}
                    >
                      ❌
                    </button>
                  </td>
                  <td>
                    <Link to={`/admin/Updateblog/${item._id}`}>
                      <button className="btn btn-warning btn-sm">
                        <i className="fa fa-edit"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* Add Blog Button */}
      <div className="text-center mt-3">
        <button
          onClick={() => navigate('/admin/blogs')}
          className="btn btn-success"
        >
          Add Blog
        </button>
      </div>
    </div>
  );
};

export default Viewblogs;
