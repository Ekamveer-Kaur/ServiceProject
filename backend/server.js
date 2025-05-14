const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const User = require('./models/user');
const app = express();

const orderRoutes= require("./Routes/orderRoutes")
const dotenv = require("dotenv")
app.use(cors());
app.use(express.json());
app.use("/api",orderRoutes);
require('dotenv').config();
// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/bluecollar")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// // User Schema
// const User = mongoose.model('user', new mongoose.Schema({
//   name: { type: String },
//   email: { type: String, unique: true },
//   password: { type: String },
//   role:{type:String, enum:["user", "admin"], default:"user"},
//   profilePic: { type: String, default: "" },
//   createdat: { type: Date, default: Date.now }
// }));
// module.exports = User;
// Blog model

const Blog = mongoose.model('blog', new mongoose.Schema({
  title: { type: String, required: true },
  photo: { type: String, required: true },
  content: { type: String, required: true },
  createdat: { type: Date, default: Date.now },
}));
// module.exports= Blog;

// Add to Cart Schema
const AddToCart = mongoose.model('cart', new mongoose.Schema({
  name: { type: String },
  subcategoryname: { type: String },
  subsmallcategoryname: { type: String },
  price: { type: String },
 subsmallcategoryimage: { type: String },
  createdat: { type: Date, default: Date.now }
}));

// Model & Schema
const CategoryModel = mongoose.model('category', new mongoose.Schema({
  name:{type: String, required:true},
  image: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
  subcategories:[
    {
      subcategoryname:{type: String,required:true},
      subcategoryimage:{type:String, required: true },
      content: { type: String, default: "" },
      createdAt: { type: Date, default: Date.now },
      subsmallcategories:[
        {
          subsmallcategoryname:{type: String,required:true},
          subsmallcategoryimage:{type:String, required: true },
          subsmallcategorycontent: { type: String, default: "" },
          price: { type: Number, required:true },
          createdAt: { type: Date, default: Date.now },
          
        },
      ],
      
    },
  ],
},{timestamps: true}));


// app.get("/api/search", async (req, res) => {
//   try {
//     const { query } = req.query;  // User se search query lene ke liye

//     if (!query) {
//       return res.status(400).json({ message: "Search query is required" });
//     }

//     // Category, Subcategory, aur Small Subcategory ko filter karne ke liye query search
//     const categories = await CategoryModel.find({
//       name: { $regex: query, $options: 'i' }  // Case-insensitive search
//     });

//     const filteredSubcategories = await CategoryModel.aggregate([
//       { $unwind: "$subcategories" },
//       { $match: { "subcategories.name": { $regex: query, $options: 'i' } } }
//     ]);

//     const filteredSmallSubcategories = await CategoryModel.aggregate([
//       { $unwind: "$subcategories" },
//       { $unwind: "$subcategories.subsmallcategories" },
//       { $match: { "subcategories.subsmallcategories.name": { $regex: query, $options: 'i' } } }
//     ]);

//     // Combine all results and send them back in a response
//     const results = {
//       categories,
//       subcategories: filteredSubcategories.map(sub => sub.subcategories),
//       smallSubcategories: filteredSmallSubcategories.map(sub => sub.subcategories.subsmallcategories)
//     };

//     res.status(200).json(results);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error while searching", error: err.message });
//   }
// });


//delete category
app.post("/api/deletecategory", async (req, res) => {

  try{
    await CategoryModel.deleteOne({_id:req.body.id})
    res.status(200).json({message:"ok"})
  }
  catch(err){
    res.status(500).json({message:"error"})
    console.log(err);
  }
})
// delete sub category 
app.post("/api/deletesubcategory", async (req, res) => {
  try {
    const { id, subcategoryid } = req.body;

    if (!id || !subcategoryid) {
      return res.status(400).json({ message: "Category ID and Sub-category ID are required" });
    }

    // Find the category by ID
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Remove the subcategory from the array of subcategories
    category.subcategories = category.subcategories.filter(
      (sub) => sub._id.toString() !== subcategoryid
    );

    await category.save(); // Save the updated category

    res.status(200).json({ message: "Sub-category deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// delete small sub category
app.post("/api/deletesmallsubcategory", async (req, res) => {
  try {
    const { categoryid, subcategoryid, smallsubcategoryid } = req.body;

    if (!categoryid || !subcategoryid || !smallsubcategoryid) {
      return res.status(400).json({ message: "Category ID, Sub-category ID, Small-Sub-category ID are required" });
    }

    // ✅ कैटेगरी खोजें
    const category = await CategoryModel.findById(categoryid);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // ✅ सबकैटेगरी खोजें
    const subcategory = category.subcategories.find(sub => sub._id.toString() === subcategoryid);
    if (!subcategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    // ✅ छोटे सबकैटेगरी को फ़िल्टर करके हटाएँ
    subcategory.subsmallcategories = subcategory.subsmallcategories.filter(
      smallsub => smallsub._id.toString() !== smallsubcategoryid
    );

    await category.save(); // ✅ अपडेट को सेव करें

    res.status(200).json({ message: "Small sub-category deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//dashboard pe blogs show krvane k liye 

// GET total number of blogs

app.get("/api/count-blogs", async (req, res) => {
  try {
    const countBlogs = await Blog.countDocuments();
    res.json({ count: countBlogs }); // Change countBlogs to count
  } catch (error) {
    res.status(500).json({ message: "Error counting blogs", error });
  }
});


//Add to cart
app.post("/api/addtocart", async (req, res) => {
  try {
    const { name, subcategoryname, subsmallcategoryname, subsmallcategoryimage, price } = req.body;  // Corrected destructuring

    if (!name || !subcategoryname || !subsmallcategoryname || !subsmallcategoryimage || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new cart item
    const newAdd = new AddToCart({
      name,
      subcategoryname,
      subsmallcategoryname,
      subsmallcategoryimage,
      price,
    });

    await newAdd.save();

    res.status(200).json({ message: "Added to cart successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
});

// view categories 
app.get('/api/viewaddtocart',async(req,res)=>{
  const data=await AddToCart.find()
  res.json(data);
})

// view categories 
app.get('/viewcategories',async(req,res)=>{
  const data=await CategoryModel.find()
  res.json(data);
})
// update category
app.post('/api/updatecategory', async (req, res) => {
  try {
    await CategoryModel.updateOne({_id:req.body.id}, req.body)
    res.status(200).json({"message":"ok"})
  }
  catch(err){
    res.status(500).json({"message":"error"})
    console.log(err)
  }
});

// ✅ Fetch a single category by ID
app.post('/api/getcategory', async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    console.log("Error occurred while finding the data:", err);
    return res.status(500).json({ message: "Error while fetching the Category", err: err.message });
  }
});


// update subcategory
app.post('/api/updatesubcategory', async (req, res) => {
  try {
    const { categoryid, subcategoryid, subcategoryname, subcategoryimage, content } = req.body;

    // Category dhoondo
    const category = await CategoryModel.findById(categoryid);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Subcategory find karke update karo
    const subcategory = category.subcategories.id(subcategoryid);
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    subcategory.subcategoryname = subcategoryname;
    subcategory.subcategoryimage = subcategoryimage;
    subcategory.content = content;

    await category.save();

    res.status(200).json({ message: "Subcategory updated successfully", subcategory });

  } catch (error) {
    res.status(500).json({ message: "Error updating subcategory" });
  }
});

// ✅ Fetch a subcategory by ID
app.post('/api/getsubcategory', async (req, res) => {
  const { categoryid, subcategoryid } = req.body;
  
  console.log("Category ID:", categoryid);
  console.log("Subcategory ID:", subcategoryid);

  try {
    // Find the category first
    const category = await CategoryModel.findById(categoryid);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find the subcategory inside the category
    const subcategory = category.subcategories.find(sub => sub._id.toString() === subcategoryid);

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json(subcategory);
  } catch (err) {
    console.error("Error occurred while finding the data:", err);
    return res.status(500).json({ message: "Error while fetching the Subcategory", error: err.message });
  }
});

// ✅ Fetch a smallsubcategory by ID
app.post('/api/getsmallsubcategory', async (req, res) => {
  const { categoryid, subcategoryid ,smallsubcategoryid, price} = req.body;
  
  console.log("Category ID:", categoryid);
  console.log("Subcategory ID:", subcategoryid);
  console.log("SmallSubcategory ID:", smallsubcategoryid);
  try {
    // Find the category first
    const category = await CategoryModel.findById(categoryid);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find the subcategory inside the category
    const subcategory = category.subcategories.find(sub => sub._id.toString() === subcategoryid);

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

// ✅ Step 3: Find the smallsubcategory inside the subcategory
const smallsubcategory = subcategory.subsmallcategories.id(smallsubcategoryid);
if (!smallsubcategory) {
  return res.status(404).json({ message: "Small Subcategory not found" });
}
    res.status(200).json(smallsubcategory);
  } catch (err) {
    console.error("Error occurred while finding the data:", err);
    return res.status(500).json({ message: "Error while fetching the SmallSubcategory", error: err.message });
  }
});


// update subsmallcategory

app.post('/api/updatesubsmallcategory', async (req, res) => {
  try {
    const { categoryid, subcategoryid, subsmallcategoryid, subsmallcategoryname, subsmallcategoryimage, subsmallcategorycontent, price } = req.body;

    // ✅ Step 1: Find the category
    const category = await CategoryModel.findById(categoryid);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // ✅ Step 2: Find the subcategory inside the category
    const subcategory = category.subcategories.id(subcategoryid);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // ✅ Step 3: Find the small subcategory inside the subcategory
    const subsmallcategory = subcategory.subsmallcategories.id(subsmallcategoryid);
    if (!subsmallcategory) {
      return res.status(404).json({ message: "Small Subcategory not found" });
    }

    // ✅ Step 4: Update the smallsubcategory details
    subsmallcategory.subsmallcategoryname = subsmallcategoryname;
    subsmallcategory.subsmallcategoryimage = subsmallcategoryimage;
    subsmallcategory.subsmallcategorycontent = subsmallcategorycontent;
    subsmallcategory.price = price;

    // ✅ Step 5: Save the updated category
    await category.save();

    res.status(200).json({ message: "Small Subcategory updated successfully", subsmallcategory });

  } catch (error) {
    console.error("Error updating Small Subcategory:", error);
    res.status(500).json({ message: "Error updating Small Subcategory", error: error.message });
  }
});

//End 


// category routes

app.post('/api/insertcategory', async (req, res) => {
  console.log("Received Category Data:", req.body); // Debugging line
  
  const newcategory = new CategoryModel(req.body);
  try {
    await newcategory.save();
    res.status(200).json({ message: 'Category added successfully' });
  } catch (error) {
    console.error("Error saving category:");
    res.status(500).json({ message: 'Failed to add category', error });
  }
});


app.get("/categories", async (req, res) => {
  try {
      const Showcategory = await CategoryModel.find(); 
      res.json(Showcategory);
  } catch (error) {
      res.status(500).json({ message: "Server Error", error });
  }
});

app.get("/api/subcategories/:name", async (req, res) => {

  try {
    const {name}=req.params
      const Showcategory = await CategoryModel.findOne({name}); 
if(!Showcategory){
  return res.status(400).json({message:"category not found"})
}
res.json(Showcategory.subcategories)
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
  }
});






app.post("/api/insertsubcategory", async (req, res) => {
  try {
    const { name, subcategoryname, subcategoryimage, content } = req.body;
    
    if (!name ||!subcategoryname || !subcategoryimage || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Category find karo
    const category = await CategoryModel.findOne({ name });

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Subcategory add karo
    category.subcategories.push({
      subcategoryname,
      subcategoryimage,
      content
    });

    await category.save();

    res.status(200).json({ message: "Subcategory added successfully" });
  } catch (error) {
    console.error("Error adding Subcategory:", error);
    res.status(500).json({ message: "Error adding Subcategory", error: error.message });
  }
});
// get subsmallcategory

app.get("/api/getSubsmallcategoriesinfront/:name/:subcategoryname", async (req, res) => {
try {
      const { name, subcategoryname } = req.params; 
      
      console.log(req.params);
      if (!name || !subcategoryname) {
          return res.status(400).json({ message: "Categoryname and Subcategoryname are required" });
      }

      const category = await CategoryModel.findOne({ name });
      console.log(category);

      if (!category) {
          return res.status(404).json({ message: "Category not found" });
      }

      const subcategory = category.subcategories.find(
          (sub) => sub.subcategoryname === subcategoryname
      );

      if (!subcategory || !subcategory.subsmallcategories) {
          return res.status(404).json({ message: "Small Subcategories not found" });
      }

      res.json(subcategory.subsmallcategories);
  } catch (error) {
      res.status(500).json({ message: "Error fetching small subcategories", error });
  }
});


// subcategories ka dropdown dikhane k liye 

app.post("/api/insertsmallsubcategory", async (req, res) => {
  console.log("Request Body:", req.body); 
  try {
    const { name, subcategoryname, subsmallcategoryname, subsmallcategoryimage, subsmallcategorycontent , price} = req.body;
    
    if (!name ||!subcategoryname || !subsmallcategoryname|| !subsmallcategoryimage || !subsmallcategorycontent || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Category find karo
    const category = await CategoryModel.findOne({ name });

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }
// ab subcategory find kro

const subcategory = category.subcategories.find(
  (sub) => sub.subcategoryname=== subcategoryname
);
if (!subcategory) {
  return res.status(400).json({ message: "SubCategory not found" });
}
    // SmallSubcategory add karo
    subcategory.subsmallcategories.push({
      subsmallcategoryname,
      subsmallcategoryimage,
      subsmallcategorycontent,
      price
    });

    await category.save();

    res.status(200).json({ message: "Small Subcategory added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error adding Small Subcategory", error: error.message });
  }
});

// Blog routes

app.post('/api/insertblog', async (req, res) => {
  const newblog = new Blog(req.body); // changed 'request' to 'req'
  try {
    await newblog.save();
    res.status(200).json({ message: 'Congratulations, your message has been sent successfully' }); // fixed syntax error
  } catch (error) {
    res.status(500).json({ message: 'Oops! Failed' });
    console.log(error);
  }
});

// Readmore 
app.post('/api/fullblog', async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.log("Error occurred while finding the data:", err);
    return res.status(500).json({ message: "Error while fetching the blog", err: err.message });
  }
});

// Delete Blog
app.post('/api/deleteblog', async (req, res) => {
  try {
    await Blog.deleteOne({_id:req.body.id})
    res.status(200).json({"message":"ok"})
  }
  catch(err){
    res.status(500).json({"message":"error"})
    console.log(err)
  }
});

// view blogs 
app.get('/viewblogs',async(req,res)=>{
  const data=await Blog.find()
  res.json(data);
})
// update blog
app.post('/api/updateblog', async (req, res) => {
  try {
    await Blog.updateOne({_id:req.body.id}, req.body)
    res.status(200).json({"message":"ok"})
  }
  catch(err){
    res.status(500).json({"message":"error"})
    console.log(err)
  }
});

//signup
app.post("/api/signup", async (req, res) => {
  console.log(req.body);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists, please login" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 = salt rounds

    // Save new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role:"user",
      profilePic: ""
    });

    await newUser.save();

    // Send success response
    res.status(200).json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//login 
app.post("/api/login", async (req, res) => {
  console.log(req.body);

  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: "User not found, please sign up" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token=jwt.sign(
      {email : user.email,userId:user._id, role: user.role},
      "gfdtr$re",{expiresIn:"1d"}
    )

    res.status(200).json({ message: "Login successful" ,
      token:token,
      role:user.role,
      email:user.email,
      name:user.name,
      profilePic: user.profilePic,
      user:user._id
  })
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// Upload Profile Picture API ✅
app.post("/api/upload-profile", async (req, res) => {
  const { email, profilePic } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { profilePic },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
else{
    res.status(200).json({ message: "Profile picture updated", profilePic: user.profilePic });
  } }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.post("/api/get-profile", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne(
      { email },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
else{
    res.status(200).json(user);
  } }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Delete User API ✅
app.delete("/deleteenquiry/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// view enquiries 
app.get('/viewenquiries',async(req,res)=>{
  const data=await User.find()
  res.json(data);
})

// Start Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
