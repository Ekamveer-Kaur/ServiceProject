import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate import kiya
import { Link } from 'react-router-dom';
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
    <div>
      <h2 className='text-center'>View Blogs</h2>
      <table className="table table-dark">
        <tbody>
          <tr className="table-active">
            <th>Image</th>
            <th>Title</th>
            <th>Comment Content</th>
            <th>Action</th>
            <th>Update</th>
          </tr>
          {
            items.map(item => (
              <tr key={item._id}>
                <td><img src={item.photo} alt={item.title} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>
                  <button onClick={() => Deleteblog(item._id)}>❌</button>
                </td>
                <td>
               <Link to ={`/admin/Updateblog/${item._id}`}>
               <button className='btn btn-warning '><i class="fa fa-edit"></i>
                </button></Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {/* Add Blog Button */}
      <button 
        onClick={() => navigate('/admin/blogs')} 
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
        Add Blog
      </button>
    </div>
  );
}

export default Viewblogs;
