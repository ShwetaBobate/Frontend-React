// const Product = require("./schema");

// // Get all products
// const fetchAllProducts = () => {
//     return Product.find();
// };

// // Get product by custom id
// const fetchProductById = (id) => {
//     return Product.findOne({ id: id });
// };

// // Add single or multiple products
// const addProduct = async (data) => {
//     if (Array.isArray(data)) {
//         return await Product.insertMany(data);
//     }
//     return await Product.create(data);
// };

// // Full Update using custom id
// const updateProduct = async (id, data) => {
//     return await Product.findOneAndUpdate(
//         { id: id },
//         data,
//         { new: true, runValidators: true }
//     );
// };

// // Partial update
// const updateProductPartial = async (id, data) => {
//     return await Product.findOneAndUpdate(
//         { id: id },
//         { $set: data },
//         { new: true, runValidators: true }
//     );
// };

// // Delete product
// const deleteItem = async (id) => {
//     return await Product.findOneAndDelete({ id: id });
// };

// module.exports = {
//     fetchAllProducts,
//     fetchProductById,
//     addProduct,
//     updateProduct,
//     updateProductPartial,
//     deleteItem
// };
const { Product, Veg, NonVeg, User } = require("./schema"); // your mongoose models
const jwt = require("jsonwebtoken");


// ============================
// PRODUCT SERVICES
// ============================
const fetchAllProducts = () => Product.find();
const fetchProductById = (id) => Product.findOne({ id });
const addProduct = (data) => Array.isArray(data) ? Product.insertMany(data) : Product.create(data);
const updateProduct = (id, data) => Product.findOneAndUpdate({ id }, data, { new: true, runValidators: true });
const updateProductPartial = (id, data) => Product.findOneAndUpdate({ id }, { $set: data }, { new: true, runValidators: true });
const deleteItem = (id) => Product.findOneAndDelete({ id });

// ============================
// VEG SERVICES
// ============================
const fetchAllVeg = () => Veg.find();
const fetchVegById = (id) => Veg.findOne({ id });
const addVeg = (data) => Array.isArray(data) ? Veg.insertMany(data) : Veg.create(data);
const updateVeg = (id, data) => Veg.findOneAndUpdate({ id }, data, { new: true, runValidators: true });
const updateVegPartial = (id, data) => Veg.findOneAndUpdate({ id }, { $set: data }, { new: true, runValidators: true });
const deleteVeg = (id) => Veg.findOneAndDelete({ id });

// ============================
// NONVEG SERVICES
// ============================
const fetchAllNonVeg = () => NonVeg.find();
const fetchNonVegById = (id) => NonVeg.findOne({ id });
const addNonVeg = (data) => Array.isArray(data) ? NonVeg.insertMany(data) : NonVeg.create(data);
const updateNonVeg = (id, data) => NonVeg.findOneAndUpdate({ id }, data, { new: true, runValidators: true });
const updateNonVegPartial = (id, data) => NonVeg.findOneAndUpdate({ id }, { $set: data }, { new: true, runValidators: true });
const deleteNonVeg = (id) => NonVeg.findOneAndDelete({ id });

// ============================
// ORDER SERVICES
// ============================
const fetchAllOrders = () => Orders.find();
const fetchOrderById = (id) => Orders.findById(id);
const createOrder = (data) => Orders.create(data);
const updateOrder = (id, data) => Orders.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const updateOrderPartial = (id, data) => Orders.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
const deleteOrder = (id) => Orders.findByIdAndDelete(id);

// ============================
// Registration data
// ============================
// CREATE USER
const registerUser = (data) => User.create(data);

// GET ALL USERS
const getAllUsers = () => User.find();

// GET ONE USER
const getUserById = (id) => User.findById(id);

// DELETE USER
const deleteUser = (id) => User.findByIdAndDelete(id);

// ============================
//Login user service layer
// ============================

// const loginUserService = async (email, password) => {

//   //get the user data based on email by using findOne
//   const user = await User.findOne({ email });

//   //check password
//   const isValid = (password === user.password);

//   if (!isValid) {
//     return { status: false, message: "Invalid email or Password" };
//   }

//   //Successful login
//   return {
//     message: "Login Successful"
//   }
// }

const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  // check password
  const isValid = (password === user.password);

  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  //Generate the  JWT Token
  const token=jwt.sign(
    {
      id:user._id,
      email:user.email
    },
    process.env.JWT_SECRET,
    {expiresIn:process.env.JWT_EXPIRE}

  )

  // Successful login
  // return {
  //   message: "Login Successful",
  //   user: {
  //     id: user.id,
  //     username: user.username,
  //     email: user.email,
  //     phone: user.phone,
  //     address: user.address
  //   }
  // };


   return {
    status:true,
    message: "Login Successful",
    token,
    user
  };
};





module.exports = {
  fetchAllProducts, fetchProductById, addProduct, updateProduct, updateProductPartial, deleteItem,
  fetchAllVeg, fetchVegById, addVeg, updateVeg, updateVegPartial, deleteVeg,
  fetchAllNonVeg, fetchNonVegById, addNonVeg, updateNonVeg, updateNonVegPartial, deleteNonVeg,
  fetchAllOrders, fetchOrderById, createOrder, updateOrder, updateOrderPartial, deleteOrder,
  registerUser, getAllUsers, getUserById, deleteUser,
  loginUserService
};
