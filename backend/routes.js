

// module.exports = router;
const express = require("express");
const router = express.Router();


const controller = require("./ProductController");
const orderController=require("./OrderController");
const authMiddleware = require("./Authintication");
// const { registerUser, getAllUsers, getUserById, deleteUser } = require("./ProductService");

// ============================
// PRODUCT ROUTES
// ============================
router.post("/registerUser", controller.registerUser);
router.post("/login", controller.loginUser);

router.use(authMiddleware);


router.get("/products/getAll", controller.getAllProducts);
router.get("/products/getById/:id", controller.getProductById);
router.post("/products/saveall", controller.createProduct);
router.put("/products/put/:id", controller.updateProduct);
router.patch("/products/patch/:id", controller.updateProductPartial);
router.delete("/products/delete/:id", controller.deleteProduct);

// ============================
// VEG ROUTES
// ============================
router.get("/veg/getVegItems", controller.getAllVegItems);
router.get("/veg/getVegById/:id", controller.getVegById);
router.post("/veg/saveVeg", controller.createVeg);
router.put("/veg/put/:id", controller.updateVegItem);
router.patch("/veg/patch/:id", controller.updateVegItemPartial);
router.delete("/veg/delete/:id", controller.deleteVegItem);

// ============================
// NONVEG ROUTES
// ============================
router.get("/nonVeg/getNonVegItems", controller.getAllNonVegItems);
router.get("/nonVeg/getNonVegById/:id", controller.getNonVegById);
router.post("/nonVeg/saveNonVeg", controller.createNonVeg);
router.put("/nonVeg/put/:id", controller.updateNonVegItem);
router.patch("/nonVeg/patch/:id", controller.updateNonVegItemPartial);
router.delete("/nonVeg/delete/:id", controller.deleteNonVegItem);

// ============================
// ORDER ROUTES
// ============================

router.get("/orders", orderController.getAllOrders);
router.post("/orders", orderController.createOrder);
router.get("/orders/:id", orderController.getOrderById);
router.put("/orders/:id", orderController.updateOrder);
router.patch("/orders/:id", orderController.updateOrderPartial);
router.delete("/orders/:id", orderController.deleteOrder);

// ============================
// Users ROUTES
// ============================

router.get("/getAllUser", controller.getAllUsers);
router.get("/getUserById/:id", controller.getUserById);
router.delete("/deleteUser/:id", controller.deleteUser);

//===========================
// Login User
//===========================



module.exports = router;



// const express = require("express");
// const router = express.Router();

// const controller = require("./ProductController");
// const orderController = require("./OrderController");
// const authMiddleware = require("./Authintication");


// // ============================
// // AUTH ROUTES (Public)
// // ============================
// router.post("/registerUser", controller.registerUser);
// router.post("/login", controller.loginUser);


// // ============================
// // PRODUCT ROUTES (Public)
// // ============================
// router.get("/products/getAll", controller.getAllProducts);
// router.get("/products/getById/:id", controller.getProductById);


// // ============================
// // VEG ROUTES (Public)
// // ============================
// router.get("/veg/getVegItems", controller.getAllVegItems);
// router.get("/veg/getVegById/:id", controller.getVegById);


// // ============================
// // NON-VEG ROUTES (Public)
// // ============================
// router.get("/nonVeg/getNonVegItems", controller.getAllNonVegItems);
// router.get("/nonVeg/getNonVegById/:id", controller.getNonVegById);


// // =====================================================
// // 🔒 PROTECT ALL ROUTES BELOW (Login Required)
// // =====================================================
// router.use(authMiddleware);


// // ============================
// // PRODUCT ROUTES (Admin protected)
// // ============================
// router.post("/products/saveall", controller.createProduct);
// router.put("/products/put/:id", controller.updateProduct);
// router.patch("/products/patch/:id", controller.updateProductPartial);
// router.delete("/products/delete/:id", controller.deleteProduct);


// // ============================
// // VEG ROUTES (Protected)
// // ============================
// router.post("/veg/saveVeg", controller.createVeg);
// router.put("/veg/put/:id", controller.updateVegItem);
// router.patch("/veg/patch/:id", controller.updateVegItemPartial);
// router.delete("/veg/delete/:id", controller.deleteVegItem);


// // ============================
// // NON-VEG ROUTES (Protected)
// // ============================
// router.post("/nonVeg/saveNonVeg", controller.createNonVeg);
// router.put("/nonVeg/put/:id", controller.updateNonVegItem);
// router.patch("/nonVeg/patch/:id", controller.updateNonVegItemPartial);
// router.delete("/nonVeg/delete/:id", controller.deleteNonVegItem);


// // ============================
// // ORDER ROUTES (Protected)
// // ============================
// router.get("/orders", orderController.getAllOrders);
// router.post("/orders", orderController.createOrder);
// router.get("/orders/:id", orderController.getOrderById);
// router.put("/orders/:id", orderController.updateOrder);
// router.patch("/orders/:id", orderController.updateOrderPartial);
// router.delete("/orders/:id", orderController.deleteOrder);


// // ============================
// // USER ROUTES (Protected)
// // ============================
// router.get("/getAllUser", controller.getAllUsers);
// router.get("/getUserById/:id", controller.getUserById);
// router.delete("/deleteUser/:id", controller.deleteUser);


// // ============================
// module.exports = router;
