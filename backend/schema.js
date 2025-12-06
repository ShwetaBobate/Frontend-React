// const { default: mongoose } = require("mongoose");

// const ProductSchema=new mongoose.Schema({
//     id:Number,
//     name:String,
//     price:Number,
//     desc:String
// });
// module.exports=ProductSchema;
//===========================================================================
// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema({
//   id:{type:Number , required:true},
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   category: { type: String },
//   imageUrl: { type: String }
// }, { timestamps: true });

// module.exports = ProductSchema;
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        id: Number,
        name: String,
        price: Number,
        imageUrl: String
      },
    ],
    totalAmount: {
      type: Number,
      required: true

    },
    OrderDate: {
      type: Date,
      default: Date.now
    }


  },
  {
    timestamps: true
  }
)


const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },   // manual ID
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  imageUrl: { type: String }
}, { timestamps: true });



const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users");



// module.exports = mongoose.model("Product", ProductSchema);
// Main product collection
const Product = mongoose.model("Product", ProductSchema, "products");

// Two NEW collections
const Veg = mongoose.model("Veg", ProductSchema, "vegItems");
const NonVeg = mongoose.model("NonVeg", ProductSchema, "nonvegItems");
const Orders = mongoose.model("Orders", orderSchema, "orders")

module.exports = { Product, Veg, NonVeg, Orders, User };