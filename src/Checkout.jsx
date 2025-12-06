import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "./Store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

 function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
   const { total, discountAmount, gst, shipping, finalAmount } = useSelector(
    (state) => state.checkout
  );
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate();


 const handlePlaceOrder = () => {

    const orderData = {
      items: cartItems,
      totalAmount: finalAmount,
      OrderDate: new Date(),

    };

    dispatch(placeOrder(orderData));
    
  Swal.fire({
   icon: "success",
    title: "Order Placed Successfully! 🎉",
    text: "Thank you for shopping with us!",
    confirmButtonText: "View Orders →",
    confirmButtonColor: "#000",
    backdrop: "rgba(0,0,0,0.65)",
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/orders");
    }
  });
  };
    


  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Section */}
        <div className="md:col-span-2 space-y-6">

          {/* Delivery Address */}
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-black">Delivery Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border p-3 rounded-xl w-full text-gray-600 "
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="border p-3 rounded-xl w-full text-gray-600"
              />
            </div>

            <textarea
              placeholder="House No, Street, Landmark"
              className="border p-3 rounded-xl w-full text-gray-600"
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                placeholder="City"
                className="border p-3 rounded-xl w-full text-gray-600"
              />
              <input
                placeholder="State"
                className="border p-3 rounded-xl w-full text-gray-600"
              />
              <input
                placeholder="Pincode"
                className="border p-3 rounded-xl w-full text-gray-600"
              />
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-black">Payment Method</h2>

            <div className="space-y-4">
              {/* COD */}
              <div
                className={`border p-4 rounded-xl cursor-pointer flex justify-between items-center ${
                  paymentMethod === "cod" ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <span className="font-medium text-black">Cash on Delivery</span>
                <input type="radio" checked={paymentMethod === "cod"} readOnly />
              </div>

              {/* Online */}
              <div
                className={`border p-4 rounded-xl cursor-pointer flex justify-between items-center ${
                  paymentMethod === "online"
                    ? "border-black"
                    : "border-gray-300"
                }`}
                onClick={() => setPaymentMethod("online")}
              >
                <span className="font-medium text-black">Online Payment (UPI/Card)</span>
                <input
                  type="radio"
                  checked={paymentMethod === "online"}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 sticky top-6 space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>{total}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Dicount</span>
              <span>{discountAmount}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>GST</span>
              <span>{gst}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span> {shipping}</span>
            </div>
            <div className="flex justify-between text-gray-700 font-bold">
              <span>Total</span>
              <span>{finalAmount.toFixed(2)}</span>
            </div>

            <motion.div whileTap={{ scale: 0.95 }}>
              <button onClick={handlePlaceOrder}  className="w-full bg-black text-white text-lg py-4 rounded-2xl shadow-md hover:bg-gray-800 transition">
                Place Order
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;