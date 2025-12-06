const { Orders } = require("./schema");

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const data = await Orders.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ORDER BY ID
const getOrderById = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // CREATE ORDER
// const createOrder = async (req, res) => {
//   try {
//     const result = await Orders.create(req.body);
//     res.status(201).json({ message: "Order created", result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


const createOrder = async (req, res) => {
  try {
    const formattedItems = req.body.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl   // ⭐ ENSURE IMAGE URL IS SAVED
    }));

    const newOrder = await Orders.create({
      items: formattedItems,
      totalAmount: req.body.totalAmount,
      OrderDate: req.body.OrderDate || Date.now()
    });

    res.status(201).json({ message: "Order created", result: newOrder });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE ORDER (PUT)
const updateOrder = async (req, res) => {
  try {
    const result = await Orders.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!result) return res.status(404).json({ error: "Order not found" });
    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PARTIAL UPDATE (PATCH)
const updateOrderPartial = async (req, res) => {
  try {
    const result = await Orders.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!result) return res.status(404).json({ error: "Order not found" });
    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ORDER
const deleteOrder = async (req, res) => {
  try {
    const result = await Orders.findByIdAndDelete(req.params.id);

    if (!result) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderPartial,
  deleteOrder
};
