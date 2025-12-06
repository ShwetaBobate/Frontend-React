
// ============================
// IMPORT SERVICES
// ============================

const services = require("./ProductService");

// ============================
// PRODUCT CONTROLLERS
// ============================
const getAllProducts = async (req, res) => {
  try {
    const data = await services.fetchAllProducts();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await services.fetchProductById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await services.addProduct(req.body);
    res.json({ message: "Product(s) added", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await services.updateProduct(id, req.body);
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProductPartial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await services.updateProductPartial(id, req.body);
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await services.deleteItem(id);
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================
// VEG CONTROLLERS
// ============================
const getAllVegItems = async (req, res) => {
  try {
    const data = await services.fetchAllVeg();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getVegById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await services.fetchVegById(id);
    if (!item) return res.status(404).json({ error: "Veg item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createVeg = async (req, res) => {
  try {
    const result = await services.addVeg(req.body);
    res.json({ message: "Veg item(s) added", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateVegItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await services.updateVeg(id, req.body);
    if (!result) return res.status(404).json({ error: "Veg item not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateVegItemPartial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await services.updateVegPartial(id, req.body);
    if (!result) return res.status(404).json({ error: "Veg item not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteVegItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await services.deleteVeg(id);
    if (!result) return res.status(404).json({ error: "Veg item not found" });
    res.json({ message: "Veg item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================
// NONVEG CONTROLLERS
// ============================
const getAllNonVegItems = async (req, res) => {
  try {
    const data = await services.fetchAllNonVeg();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNonVegById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await services.fetchNonVegById(id);
    if (!item) return res.status(404).json({ error: "NonVeg item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createNonVeg = async (req, res) => {
  try {
    const result = await services.addNonVeg(req.body);
    res.json({ message: "NonVeg item(s) added", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateNonVegItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await services.updateNonVeg(id, req.body);
    if (!result) return res.status(404).json({ error: "NonVeg item not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateNonVegItemPartial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await services.updateNonVegPartial(id, req.body);
    if (!result) return res.status(404).json({ error: "NonVeg item not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteNonVegItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await services.deleteNonVeg(id);
    if (!result) return res.status(404).json({ error: "NonVeg item not found" });
    res.json({ message: "NonVeg item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ============================
// REGISTER USER CONTROLLERS
// ============================
// const registerUser = async (req, res) => {
//   try {
//     const result = await services.registerUser(req.body);
//     res.json({ message: "User registered successfully!", result });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const registerUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body);  // ADD THIS

    const result = await services.registerUser(req.body);
    res.json({ message: "User registered successfully!", result });

  } catch (error) {
    console.log("Registration Error:", error.message);  // ADD THIS
    res.status(500).json({ error: error.message });
  }
};


// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const data = await services.getAllUsers();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE USER
const getUserById = async (req, res) => {
  try {
    const data = await services.getUserById(req.params.id);
    if (!data) return res.status(404).json({ error: "User not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const data = await services.deleteUser(req.params.id);
    if (!data) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully!", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // ============================
// //Login user controller
// // ============================
//  const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await services.loginUserService(email, password);

//     res.status(200).json({
//       message: "Login successful",
      
//     });

//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// }

// ============================
// Login user controller
// // =========================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await services.loginUserService(email, password);

    //send the response

    res.status(200).json({
      status:result.status,
      message: result.message,
      token:result.token,
      user: result.user
    });

  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// ============================
// EXPORT ALL
// ============================
module.exports = {
  // Product
  getAllProducts, getProductById, createProduct, updateProduct, updateProductPartial, deleteProduct,
  // Veg
  getAllVegItems, getVegById, createVeg, updateVegItem, updateVegItemPartial, deleteVegItem,
  // NonVeg
  getAllNonVegItems, getNonVegById, createNonVeg, updateNonVegItem, updateNonVegItemPartial, deleteNonVegItem,
  //User
  registerUser,getAllUsers,getUserById,deleteUser,
  //login user
  loginUser

};

