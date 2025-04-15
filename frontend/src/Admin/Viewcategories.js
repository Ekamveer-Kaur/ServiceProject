import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate import kiya
import { Link } from 'react-router-dom';
const Viewcategories = () => {
  const [items, setitems] = useState([]);
  const navigate = useNavigate(); // ✅ useNavigate ko define kiya

  // Handle deletion of a comment
  const Deletecategory = async(id) => {
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
        alert("Category deleted");
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
    <div>
      <h2 className='text-center'>View categories</h2>
      <table className="table table-dark">
        <tbody>
          <tr className="table-active">
            <th>Image</th>
            <th>Name</th>
           
            <th>Created at</th>
            <th>Action</th>
            <th>Update</th>
           
          </tr>
          {
            items.map(item => (
              <tr key={item._id}>
                <td><img src={item.image} alt={item.title} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                <td>{item.name}</td>
               
                <td>{item.createdAt}</td>
                
                <td>
                  <button onClick={() => Deletecategory(item._id)}>❌</button>
                </td>
               <td>
                <Link to ={`/admin/Updatecategory/${item._id}`}>
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
        onClick={() => navigate('/admin/categories')} 
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
        Add Category
      </button>
    </div>
    
  );
}

export default Viewcategories;
