import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate import kiya

const Enquiries = () => {
  const [items, setitems] = useState([]);
  const navigate = useNavigate(); // ✅ useNavigate ko define kiya
  
useEffect(() => {
    fetch('http://localhost:5000/viewenquiries')
      .then(response => response.json())
      .then(data => setitems(data))
      .catch(err => console.log(err))
  }, []);

  const handleDelete = async (id, email) => {
    try {
        await fetch(`http://localhost:5000/deleteenquiry/${id}`, { method: "DELETE" });
        setitems(items.filter(item => item._id !== id));

        const loggedInEmail = localStorage.getItem("email");
        if (loggedInEmail === email) {
            localStorage.removeItem("email"); // ✅ User logout kar diya
            navigate("/blog"); // ✅ Redirect to blog page
        }
    } catch (err) {
        console.log("Delete failed:", err);
    }
};

  

  return (
    
    <div>
      <h2 className='text-center '>View Enquiries</h2>
      <table className="table table-dark">
        <tbody>
          <tr className="table-active">
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>createdat</th>
            <th>Action</th>
          </tr>
          {
            items.map(item => (
              <tr key={item.id}>
                <td>
                  <img 
                   src={item.profilePic ? item.profilePic : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
 
                    alt="profile" 
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #fff"
                    }} 
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.createdat}</td>
                <td>
                <button onClick={() => handleDelete(item._id, item.email)}>❌</button>

              </td>
              </tr>
            ))
          }
        </tbody>
      </table>
 {/* Add User Button */}
 <button 
        onClick={() => navigate('/signup')} 
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Add User
      </button>

    </div>
  )
}

export default Enquiries;
