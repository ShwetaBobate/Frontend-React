import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementQty, incrementQty, placeOrder, removeFromCart, saveCheckoutData } from "./Store";
import CouponApply from "./CouponApply";
import SendOrderEmail from "./SendOrderEmail";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const { discount: couponDiscount, message } = useSelector(
    (state) => state.coupon

  );

  const dispatch = useDispatch();

  // ---------------- PLACE ORDER ----------------
  // let navigate = useNavigate();
  // const handlePlaceOrder = () => {

  //   const orderData = {
  //     items: cartItems,
  //     totalAmount: finalAmount,
  //     OrderDate: new Date(),

  //   };

  //   dispatch(placeOrder(orderData));
  //   navigate("/login")
  // };

  const navigate = useNavigate();

const handlePlaceOrder = () => {
  dispatch(
    saveCheckoutData({
      total,
      discountAmount,
      gst,
      shipping,
      finalAmount
    })
  );

  navigate("/login");
  
};

  const { loading, order, error } = useSelector((globalState) => globalState.orders);

  const [manualDiscount, setManualDiscount] = useState(0);
  const [customerEmail, setCustomerEmail] = useState("");

  // ---------------- CALCULATIONS ----------------
  // let total = cartItems.reduce((t, item) => t + item.price * item.quantity, 0);
  // const totalDiscountPercent = manualDiscount + couponDiscount;
  // const discountAmount = (total * totalDiscountPercent) / 100;
  // const afterDiscount = total - discountAmount;
  // const gst = (afterDiscount * 18) / 100;
  // const shipping = 20;
  // const finalAmount = afterDiscount + gst + shipping;


  const allCalculation = useMemo(() => {
    let total = cartItems.reduce((t, item) => t + item.price * item.quantity, 0);
    const totalDiscountPercent = manualDiscount + couponDiscount;
    const discountAmount = (total * totalDiscountPercent) / 100;
    const afterDiscount = total - discountAmount;
    const gst = (afterDiscount * 18) / 100;
    const shipping = 20;
    const finalAmount = afterDiscount + gst + shipping;

    console.log("cart calculation happens", {
      total, totalDiscountPercent, discountAmount, afterDiscount, gst,
      shipping, finalAmount
    });

    return {
      total, totalDiscountPercent, discountAmount, afterDiscount, gst,
      shipping, finalAmount
    };
  }, [cartItems, manualDiscount, couponDiscount]);

  const { total, totalDiscountPercent, discountAmount, afterDiscount, gst,
    shipping, finalAmount } = allCalculation;

  const upiID = "shwetabobate24@okhdfcbank";
  const payerName = "Shweta Bobate";
  const upiLink = `upi://pay?pa=${upiID}&pn=${payerName}&am=${finalAmount}&cu=INR`;

  const [showQR, setShowQR] = useState(false);



  return (
//     <div className="min-h-screen bg-white py-10 px-4">

//       {/* ---------------- WHEN NO ITEMS ---------------- */}
//       {cartItems.length === 0 ? (
//         <h2 className="text-center text-2xl font-semibold text-gray-700 mt-10">
//           OOpssss !!! Your cart is empty 😥
//         </h2>
//       ) : (
//         <>
//           {/* ---------------- CART ITEMS ---------------- */}
// <div className="container mx-auto flex flex-col items-center gap-8 mt-5">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="w-full md:w-[550px] lg:w-[600px] flex items-center gap-6 rounded-2xl p-6 shadow-xl bg-white/80 backdrop-blur-xl border border-white/60"
//               >
//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="w-[150px] h-[150px] rounded-2xl object-cover shadow-md"
//                 />

//                 <div className="flex flex-col grow">
//                   <h3 className="text-2xl font-semibold text-gray-800">
//                     {item.name}
//                   </h3>
//                   <p className="text-xl font-bold text-green-700 mt-1">
//                     ₹{item.price}
//                   </p>

//                   {/* Quantity box */}
//                   <div className="flex items-center mt-4">
//                     <div className="flex items-center bg-white/70 rounded-xl border border-gray-300 overflow-hidden shadow">
//                       <button
//                         onClick={() => dispatch(decrementQty(item.id))}
//                         className="px-4 py-2 hover:bg-gray-200 transition text-lg font-bold text-black"
//                       >
//                         −
//                       </button>

//                       <span className="px-6 py-2 text-lg font-semibold border-l border-r border-gray-300 text-black">
//                         {item.quantity}
//                       </span>

//                       <button
//                         onClick={() => dispatch(incrementQty(item.id))}
//                         className="px-4 py-2 hover:bg-gray-200 transition text-lg font-bold text-black"
//                       >
//                         +
//                       </button>

//                       <button
//                         onClick={() => dispatch(removeFromCart(item.id))}
//                         className="px-4 py-2 hover:bg-red-600 hover:text-white transition text-black"
//                       >
//                         <img src="images/delete-icon.png" alt="delete" className="w-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ---------------- ORDER SECTION ---------------- */}
//           <div className="container mx-auto mt-16 space-y-12">

//             {/* ---------- DISCOUNT BUTTONS ---------- */}
//             <div className="flex justify-center gap-6">
//               {[10, 20, 30].map((d) => (
//                 <button
//                   key={d}
//                   onClick={() => setManualDiscount(d)}
//                   className="bg-linear-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl shadow hover:opacity-90 transition font-medium"
//                 >
//                   {d}% Discount
//                 </button>
//               ))}
//             </div>

//             {/* ---------- COUPON ---------- */}
//             <div className="flex flex-col items-center gap-2">
//               <CouponApply />
//               <p className="text-green-700 font-semibold">{message}</p>
//             </div>

//             {/* ---------- ORDER SUMMARY CARD ---------- */}
//             <div className="flex justify-center">
//               <div className="bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-10 w-full max-w-2xl">

//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//                   Order Summary
//                 </h2>

//                 <div className="grid grid-cols-2 gap-y-4 text-lg">
//                   <p className="text-gray-600">Total Amount:</p>
//                   <p className="text-right text-gray-600 font-medium">₹{total}</p>

//                   <p className="text-gray-600">Manual Discount:</p>
//                   <p className="text-right text-gray-600 ">{manualDiscount}%</p>

//                   <p className="text-gray-600">Coupon Discount:</p>
//                   <p className="text-right text-gray-600 ">{couponDiscount}%</p>

//                   <p className="text-gray-700 font-semibold">Total Discount:</p>
//                   <p className="text-right font-semibold text-green-600">
//                     {totalDiscountPercent}%
//                   </p>

//                   <p className="text-gray-600">Discount Amount:</p>
//                   <p className="text-right text-gray-600 ">₹{discountAmount.toFixed(2)}</p>

//                   <p className="text-gray-600">Price After Discount:</p>
//                   <p className="text-right text-gray-600 ">₹{afterDiscount.toFixed(2)}</p>

//                   <p className="text-gray-600">GST (18%):</p>
//                   <p className="text-right text-gray-600 ">₹{gst.toFixed(2)}</p>

//                   <p className="text-gray-600">Shipping:</p>
//                   <p className="text-right text-gray-600 ">₹{shipping}</p>

//                   <hr className="col-span-2 my-4 border-gray-300" />

//                   <p className="text-2xl font-bold text-gray-800">Final Amount:</p>
//                   <p className="text-2xl font-bold text-green-700 text-right">
//                     ₹{finalAmount.toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* ---------- EMAIL INPUT ---------- */}
//             <div className="flex flex-col items-center space-y-3">
//               <h4 className="text-lg font-medium text-gray-700">
//                 Enter your email to receive order details:
//               </h4>

//               <input
//                 type="email"
//                 value={customerEmail}
//                 onChange={(e) => setCustomerEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="border border-gray-300 bg-white/80 backdrop-blur-xl px-4 py-3 rounded-xl w-full max-w-sm shadow focus:ring-2 focus:ring-green-500 outline-none"
//               />
//               {/* ---------- SEND EMAIL ---------- */}

//               <SendOrderEmail
//                 cartItems={cartItems}
//                 finalAmount={finalAmount}
//                 tax={gst}
//                 customerEmail={customerEmail}
//                 totalAmount={total}
//                 discountAmount={discountAmount}
//                 shipping={shipping}
//               />

//               <button onClick={handlePlaceOrder}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-green-700">Checkout</button>
//             </div>


//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={() => setShowQR(true)}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-green-700"
//               >
//                 Pay Now
//               </button>
//             </div>
//             {showQR && (
//               <div className="flex justify-center mt-4">
//                 <div className="p-3 border rounded-xl bg-white shadow-sm w-fit text-center">
//                   <p className="text-sm font-medium text-gray-700 mb-2">Scan to Pay</p>
//                   <QRCodeCanvas value={upiLink} size={140} />
//                 </div>
//               </div>
//             )}




//           </div>
//         </>
//       )}
//     </div>

<div className="w-full min-h-screen bg-gray-100 py-10">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">

    {/* ---------------- LEFT : CART ITEMS ---------------- */}
    <div className="lg:col-span-2 flex flex-col gap-6">

      {cartItems.length === 0 ? (
        <p className="text-center text-xl font-semibold text-gray-600">
          Your cart is empty.
        </p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="w-full flex items-center gap-6 rounded-2xl p-6 shadow-lg bg-white"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-[140px] h-[140px] rounded-xl object-cover"
            />

            <div className="flex flex-col grow">
              <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
              <p className="text-lg font-bold text-green-700 mt-1">₹{item.price}</p>

              {/* Quantity controls */}
              <div className="flex items-center mt-4">
                <div className="flex items-center rounded-xl border border-gray-300">
                  <button
                    onClick={() => dispatch(decrementQty(item.id))}
                    className="px-4 py-2 hover:bg-gray-200 transition text-lg font-bold"
                  >
                    −
                  </button>

                  <span className="px-6 py-2 text-lg font-semibold border-l border-r border-gray-300">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => dispatch(incrementQty(item.id))}
                    className="px-4 py-2 hover:bg-gray-200 transition text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>

    {/* ---------------- RIGHT : ORDER SUMMARY ---------------- */}
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-10">

        <h2 className="text-2xl font-bold mb-4 text-black">Order Summary</h2>

        {/* Subtotal */}
        <div className="flex justify-between text-lg font-medium mb-2">
          <span className="text-gray-700">Subtotal</span>
          <span className="text-gray-700" >₹{total}</span>
        </div>

        {/* Delivery */}
        <div className="flex justify-between text-lg font-medium mb-4">
          <span className="text-gray-700">Delivery Charges</span>
          <span>FREE</span>
        </div>

        <hr className="my-4" />

        {/* Coupon Box */}
        <div className="bg-gray-100 flex items-center">
          <input
            type="text"
            placeholder="Apply Coupon"
            className="flex-1 p-2  border border-gray-300 outline-none text-gray-700"
          />
          <button className="px-4 py-2 bg-linear-to-r from-pink-500 to-purple-400 text-white  transition">
            Apply
          </button>
        </div>

        {/* Total */}
        <div className="flex justify-between text-xl font-bold mt-6">
          <span className="text-gray-700">Total</span>
          <span className="text-black">₹{total}</span>
        </div>

        {/* Checkout button */}
        <button className="w-full mt-6 bg-linear-to-r from-pink-500 to-purple-400 py-3 rounded-xl text-lg font-semibold  transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</div>

   );
}

export default Cart;
