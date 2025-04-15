import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate import kiya
import { Link } from 'react-router-dom';
const Viewsmallsubcategories = () => {
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
    <div>
      <h2 className='text-center'>View SmallSubcategories</h2>
      <table className="table table-dark">
        <tbody>
          <tr className="table-active">
            <th>Category Name</th>
            <th>Subcategory Name</th>
            <th>Small Subcategory Name</th>
            <th>Image</th>
            <th>Content</th>
            <th>Price</th>
            <th>Created at</th>
            <th>Action</th>
            <th>Update</th>
            </tr>
  {
    items.map(category => 
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
                style={{ maxWidth: '100px', maxHeight: '100px' }} 
              />
            </td>
            <td>{smallsub.subsmallcategorycontent}</td>
            <td>{smallsub.price}</td> {/* ✅ Price show karega */}

            <td>{new Date(smallsub.createdAt).toLocaleDateString()}</td>
            <td>
              <button onClick={() => Deletecategory(smallsub._id)}>❌</button>
            </td>
            <td>
                            <Link to ={`/admin/Updatesmallsubcategory/${category._id}/${subcategory._id}/${smallsub._id}`}>
                           <button className='btn btn-warning '><i class="fa fa-edit"></i>
                            </button></Link>
                            </td>
          </tr>
         ))
        )
      )
    }
  </tbody>
      </table>

      {/* Add Blog Button */}
      <button 
        onClick={() => navigate('/admin/subsmallcategories')} 
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
        Add SmallSubCategory
      </button>
    </div>
  );
}

export default Viewsmallsubcategories;





