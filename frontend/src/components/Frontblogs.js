import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate import kiya
import { Link } from 'react-router-dom';

const Frontblogs = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // ✅ useNavigate ko define kiya

  // Handle deletion of a comment
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/deleteblog/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        setItems(prevItems => prevItems.filter(item => item._id !== id)); // Ensure using `_id` for deletion
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetch('http://localhost:5000/viewblogs') // Make sure this matches your backend API route
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the data to inspect it
        setItems(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2 className="text-center">View Blogs</h2>
      
      <div className="row">
        {items.map(item => (
          <div className="col-md-4" key={item._id}> {/* Using `col-md-4` to show 3 cards per row */}
            <div className="card mb-4">
              <img
                src={item.photo}
                alt={item.title}
                className="card-img-top"
                style={{ maxHeight: '200px', objectFit: 'cover' }} // Styling the image
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.content.substring(0,100)}...</p>
                <div className='d-flex justify-content-between'>
                  <Link to={`/fullblog/${item._id}`} className="btn btn-primary btn-sm">
                    Read More
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)} // Make sure to use `_id` here
                    className="btn btn-danger"
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Blog Button */}
      <button 
        onClick={() => navigate('/UserDashboard/blogs')} 
        className="btn btn-success mt-4"
      >
        Add Blog
      </button>
    </div>
  );
}

export default Frontblogs;
