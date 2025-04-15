// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const Viewsmallsubcategoryinfront = () => {
//   const { name, subcategoryname } = useParams(); // Route se le rha hai
//   console.log(name);
//   const [subsmallcategories, setSmallSubcategories] = useState([]);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/getSubsmallcategories/${name}/${subcategoryname}`)
//       .then((response) => {
//         setSmallSubcategories(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching small subcategories:", error);
//       });
//   }, [name, subcategoryname]);

//   const AddToCart = async (subsmallcategoryname, subsmallcategoryimage,subsmallcategorycontent, price) => {
//     try {
//       alert("Add to cart..."); // Show alert before submission
//       const response = await axios.post(
//         "http://localhost:5000/api/addtocart",
//         {
//           name,
//           subcategoryname,
//           subsmallcategoryname:subsmallcategoryname,
//           subsmallcategoryimage: subsmallcategoryimage,
//           subsmallcategorycontent: subsmallcategorycontent,
//           price: price,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (response.status === 200) {
//         alert("Added to cart successfully");
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add to cart");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4" style={{ fontWeight: "bold", color: "#2C3E50" }}>Small Subcategories of {subcategoryname}</h2>
//       <div className="row">
//         {subsmallcategories.map((item) => (
//           <div key={item._id} className="col-md-4 mb-4">
//             <div 
//               className="card shadow-sm" 
//               style={{ 
//                 borderRadius: "12px", 
//                 overflow: "hidden", 
//                 border: "none", 
//                 background: "#F8F9FA"
//               }}
//             >
//               <img
//                 src={item.subsmallcategoryimage}
//                 className="card-img-top"
//                 alt={item.subsmallcategoryname}
//                 style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
//               />
//               <div className="card-body text-center" style={{ background: "#FFFFFF" }}>
//                 <h5 className="card-title" style={{ fontWeight: "600", color: "#34495E" }}>{item.subsmallcategoryname}</h5>
//                 <h5 className="card-title" style={{ fontWeight: "600", color: "#34495E" }}>{item.subsmallcategorycontent}</h5>
//                 <h6 className="card-text" style={{ fontWeight: "bold", color: "#E74C3C" }}>
//                   Price: ₹{item.price} {/* ✅ Price Show Kar Raha Hai */}
//                 </h6>
//                 <button 
//                   className="btn mt-2" 
//                   style={{ 
//                     background: "#3498DB", 
//                     border: "none", 
//                     borderRadius: "8px", 
//                     padding: "10px 20px", 
//                     color: "#fff", 
//                     fontWeight: "bold", 
//                     transition: "0.3s ease"
//                   }}
//                   onMouseOver={(e) => e.target.style.background = "#2980B9"}
//                   onMouseOut={(e) => e.target.style.background = "#3498DB"}
//                   onClick={() => AddToCart(item.subsmallcategoryname,item.subsmallcategoryimage,item.subsmallcategorycontent)}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Viewsmallsubcategoryinfront;




import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";


const Viewsmallsubcategoryinfront = () => {

  const navigate = useNavigate();

  const { name, subcategoryname } = useParams();

  const [smallsubcategories, setSmallSubcategories] = useState([]);

  const [cart, setCart] = useState([]);

  const [cartcount, setcartcount] = useState(0); // Initialize cartcount state


  // const userId = localStorage.getItem("USER") || "guest"; // User ID from localStorage or default to 'guest'


  // useEffect(() => {

  //   // Fetch data for small subcategories based on categoryname and subcategoryname

  //   const fetchData = async () => {

  //     try {

  //       const response = await axios.get(`http://localhost:5000/api/getSubsmallcategoriesinfront/${name}/${subcategoryname}`);

  //       setSmallSubcategories(response.data);

  //     } catch (error) {

  //       console.error("Error fetching data:", error);

  //     }

  //   };


  //   fetchData();


  //   // Load cart from localStorage

  //   const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  //   const storedCartCount = localStorage.getItem("cartcount") || 0;

  //   setCart(storedCart);

  //   setcartcount(Number(storedCartCount));  // Ensure cartcount is a number

  // }, [name, subcategoryname]);


  // const handleAddToCart = (item) => {
  //   console.log("Adding to cart:", item); // ✅ Check incoming item
  //   const existingItemIndex = cart.findIndex(

  //     (cartItem) => cartItem.productId === item._id && cartItem.userId === userId && cartItem.status === "pending"

  //   );


  //   let updatedCart;

  //   if (existingItemIndex !== -1) {

  //     // If item already exists, update quantity and price

  //     updatedCart = cart.map((cartItem, index) =>

  //       index === existingItemIndex

  //         ? {

  //             ...cartItem,

  //             quantity: cartItem.quantity + 1,

  //             price: (cartItem.quantity + 1) * item.price, // Price update

  //           }

  //         : cartItem

  //     );

  //   } else {

  //     // Add a new item to the cart

  //     updatedCart = [

  //       ...cart,

  //       {

  //         productId: item._id,

  //         userId: userId,

  //         name: item.subsmallcategoryname,

  //         image: item.subsmallcategoryimage,

  //         price: item.price,

  //         quantity: 1,

  //         status: "pending",

  //       },

  //     ];

  //   }


  //   // Update the cart and cart count state

  //   setCart(updatedCart);

  //   const newCartCount = updatedCart.length;  // Calculate cart count based on updatedCart length

  //   setcartcount(newCartCount);


  //   // Store updated cart and cart count in localStorage

  //   localStorage.setItem("cart", JSON.stringify(updatedCart));

  //   localStorage.setItem("cartcount", newCartCount);


  //   // Display success alert

  //   alert("Item added to cart!");

  //   console.log(newCartCount);


  //   // Dispatch event to notify storage change

  //   window.dispatchEvent(new Event("storage"));

    

  //   // Navigate to the add to cart page

  //   navigate("/viewaddtocart");

  // };

  const email = localStorage.getItem("email") || "guest";

useEffect(() => {
  // Fetch small subcategories
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getSubsmallcategoriesinfront/${name}/${subcategoryname}`);
      setSmallSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();

  // Load cart for this user
  const storedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
  setCart(storedCart);
  setcartcount(storedCart.length);
}, [name, subcategoryname, email]);

const handleAddToCart = (item) => {
if(!email){
  alert("Please Login first");
  navigate("/login");
  return;
}

  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.productId === item._id && cartItem.status === "pending"
  );

  let updatedCart;
  if (existingItemIndex !== -1) {
    updatedCart = cart.map((cartItem, index) =>
      index === existingItemIndex
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            price: (cartItem.quantity + 1) * item.price,
          }
        : cartItem
    );
  } else {
    updatedCart = [
      ...cart,
      {
        productId: item._id,
        userId: email,
        name: item.subsmallcategoryname,
        image: item.subsmallcategoryimage,
        price: item.price,
        quantity: 1,
        status: "pending",
      },
    ];
  }

  setCart(updatedCart);
  setcartcount(updatedCart.length);

  // Save to localStorage using email
  localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
  localStorage.setItem("cartcount", updatedCart.length);
  window.dispatchEvent(new Event("storage"));

  alert("Item added to cart!");
  navigate("/viewaddtocart");
};


  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4">{subcategoryname} Products</h2>


      <div className="row">

        {smallsubcategories.map((item) => (

          <div className="col-md-4 mb-4" key={item._id}>

            <div className="card">

              <img src={item.subsmallcategoryimage} className="card-img-top" alt={item.subsmallcategoryname} />

              <div className="card-body">

                <h5>{item.subsmallcategoryname}</h5>

                <p>Price: ₹{item.price}</p>

                <button className="btn btn-primary w-100" onClick={() => handleAddToCart(item)}>

                  Add to Cart

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};


export default Viewsmallsubcategoryinfront;
