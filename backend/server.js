// const express = require("express");
// const mongoose = require("mongoose");
// const router = require("./routes");
// const cors = require("cors");


// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Test Route
// app.get("/", (req, res) => {
//   res.send("API is working 🚀");
// });

// // Mount all routes ONCE
// app.use("/api/v1", router);

// // Serve images
// app.use("/images", express.static("public/images"));

// // DB Connection
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// // Server
// app.listen(process.env.PORT, () => {
//   console.log("Server running at http://localhost:3000");
// });
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve images folder
app.use("/images", express.static("public/images"));

// Test Route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// All API routes
app.use("/api/v1", router);

// DB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected ✔️"))
  .catch(err => console.log("DB Error:", err));

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
