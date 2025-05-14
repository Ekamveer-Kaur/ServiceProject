import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GetAllUser = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/viewusers')
      .then(response => response.json())
      .then(data => {
        setItems(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">View Users</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Username</th>
              <th>User Email</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map(item => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ height: "50px", width: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{new Date(item.createdat).toLocaleString()}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default GetAllUser;
