import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate import kiya
import { Link } from 'react-router-dom';
const Viewsubcategories = () => {
  const [items, setitems] = useState([]);
  const navigate = useNavigate(); // ✅ useNavigate ko define kiya

  // Handle deletion of a comment
//   const Deletecategory = async(id) => {
//     const formdata=JSON.stringify({
//       id:id
//     })
//     try{
//     const response = await fetch(`http://localhost:5000/api/deleteblog`,
//        { method: 'POST' ,
//         headers:{'content-type':'application/json'},
//         body:formdata
//        })
//        if(response.ok){
//         alert("SubCategory deleted");
//         setTimeout(()=>{
// window.location.reload();
//         },1000);
//        }
//        else{
// alert("error");
//        }
//     }
//     catch(err){
//       console.log(err);
//     }
//   };


const Deletecategory = async (id) => {
  const formdata = JSON.stringify({
    id: id
  });

  try {
    const response = await fetch(`http://localhost:5000/api/deleteblog`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: formdata
    });

    if (response.ok) {
      alert("SubCategory deleted");

      // Update state dynamically instead of reloading
      const newItems = items.map(category => {
        return {
          ...category,
          subcategories: category.subcategories.filter(subcategory => subcategory._id !== id)
        };
      });
      setitems(newItems);
    } else {
      alert("Error");
    }
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
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
      <h2 className='text-center'>View subcategories</h2>
      <table className="table table-dark">
        <tbody>
          <tr className="table-active">
            <th>Category Name</th>
            <th>Subcategory Name</th>
            <th>Image</th>
            <th>Content</th>
            <th>Created at</th>
            <th>Action</th>
            <th>Update</th>
          </tr>
          {
            items.map(category => 
                category.subcategories.map(subcategory=>(
                
              <tr key={subcategory._id}>
                <td>{category.name}</td>
                <td>{subcategory.subcategoryname}</td>
                
                <td>
                    <img src={subcategory.subcategoryimage} alt={subcategory.subcategoryname} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
               
                <td>{subcategory.content}</td>

                    <td>{new Date(subcategory.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => Deletecategory(subcategory._id)}>❌</button>
                </td>
                <td>
                <Link to ={`/admin/Updatesubcategory/${category._id}/${subcategory._id}`}>
               <button className='btn btn-warning '><i class="fa fa-edit"></i>
                </button></Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add Blog Button */}
      <button 
        onClick={() => navigate('/admin/subcategories')} 
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
        Add SubCategory
      </button>
    </div>
  );
}

export default Viewsubcategories;
