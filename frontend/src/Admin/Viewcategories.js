import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Viewcategories = () => {
  const [items, setitems] = useState([]);
  const navigate = useNavigate();

  const Deletecategory = async (id) => {
    const formdata = JSON.stringify({ id: id });
    try {
      const response = await fetch(`http://localhost:5000/api/deletecategory`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: formdata
      });

      if (response.ok) {
        alert("Category deleted");
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
    fetch('http://localhost:5000/viewcategories')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setitems(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    // <div className="container-fluid p-3">
    //   <h2 className="text-center">View Categories</h2>
    //   <div className="table-responsive">
    //     <table className="table table-dark table-bordered">
    //       <thead>
    //         <tr className="table-active">
    //           <th>Image</th>
    //           <th>Name</th>
    //           <th>Created at</th>
    //           <th>Action</th>
    //           <th>Update</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {items.map(item => (
    //           <tr key={item._id}>
    //             <td>
    //               <img
    //                 src={item.image}
    //                 alt={item.name}
    //                 className="img-fluid rounded"
    //                 style={{ width: '60px', height: '60px', objectFit: 'cover' }}
    //               />
    //             </td>
    //             <td>{item.name}</td>
    //             <td>{new Date(item.createdAt).toLocaleString()}</td>
    //             <td>
    //               <button onClick={() => Deletecategory(item._id)} className="btn btn-danger">❌</button>
    //             </td>
    //             <td>
    //               <Link to={`/admin/Updatecategory/${item._id}`}>
    //                 <button className="btn btn-warning">
    //                   <i className="fa fa-edit"></i>
    //                 </button>
    //               </Link>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    //   <button
    //     onClick={() => navigate('/admin/categories')}
    //     className="btn btn-success mt-3"
    //   >
    //     Add Category
    //   </button>
    // </div>

    <div className="container mt-4">
      <h1 className="text-center mb-4">View Category</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Image </th>
              <th>Name</th>
              
              <th>Created At</th>
              <th>Action</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
               
                <td>
                  <img
                    src={item.image}
                    alt="Blog Thumbnail"
                    className="img-fluid rounded"
                    style={{ height: "50px", width: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => Deletecategory(item._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
                <td>
                
                              <Link to={`/admin/updatecategory/${item._id}`}>  <button
                                    className="btn  "
                                    
                                  >
                                    <i class="fa-solid fa-pen-to-square"></i>
                                  </button></Link>  
                                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-3">
        <Link to="/admin/categories" className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Add More
        </Link>
      </div>
    </div>
  );
};

export default Viewcategories;
