import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./Services.css";


const Services = () => {
  const navigate=useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [show, setShow] = useState(false);
const[selectedsubCategory, setselectedsubCategory]= useState();
  useEffect(() => {
    fetch("http://localhost:5000/categories") // ✅ Backend se API Call
      .then((response) => response.json())
      .then((data) =>{
console.log("categories Data:", data);
       setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleShow = (category) => {
    setSelectedCategory(category);
    setShow(true);
  };
  //handleShow(): Jab user kisi category pe click karega, toh us category ka data store karega aur modal open hoga.
const handlesubcategory=(subs)=>{
  setselectedsubCategory(subs);
  navigate(`/viewsmallsubcategory/${selectedCategory?.name}/${subs.subcategoryname}`)
}

  const handleClose = () => setShow(false);

  return (
    <div>
    {/* <h2 className="text-left ms-5 mt-4 d-flex" >Expert Home Services,<strong className="d-block p-4 fs-1" > Anytime, Anywhere</strong></h2> */}

    <div className="services-container mt-5 p-4">
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category._id} className="category-card" onClick={() => handleShow(category)}>
              <strong>{category.name}</strong>
              <img src={category.image}/>
          </div>
        ))}
      </div>
      

      {/* ✅ Bootstrap Modal for Subcategories */}
      
      <Modal show={show} onHide={handleClose} centered>
        {/** jb show state true hoge tb modal dikhai denga */}

        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory?.name} -</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCategory && selectedCategory.subcategories.length > 0 ? (
            //.length property check karti hai ki subcategories ka array empty hai ya nahi.
                <>             
                <ul className="list-group">
                {selectedCategory.subcategories.map((sub) => (


                <li key={sub._id} className="list-group-item" onClick={()=> handlesubcategory(sub)}>
                  {sub.subcategoryname}
                  <img src={sub.subcategoryimage} style={{ width: "50px", height: "50px", marginLeft: "10px" }}/>
                </li>
              ))}
              </ul>

              

 </>           
          ) : (
            <p>No subcategories available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
    
    </div>
    
  );
};

export default Services;