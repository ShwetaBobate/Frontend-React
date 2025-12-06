import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { applyCoupon } from "./Store";
import Swal from "sweetalert2";

function CouponApply() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  // const handleApply = () => {
  //   dispatch(applyCoupon(input));
  //   Swal.fire({
  //     title: 'Success!',
  //     text:  'Coupoun Applied Successfully',
  //     icon: 'success',
  //     confirmButtonColor: '#10B981', // Tailwind emerald-500
  //   })
  // };
  const handleApply = () => {
  dispatch(applyCoupon(input))
    .then(() => {
      Swal.fire({
        title: "Success!",
        text: "Coupon Applied Successfully!",
        icon: "success",
        confirmButtonColor: "#10B981",
      });
    })
    .catch(() => {
      Swal.fire({
        title: "Invalid Coupon!",
        text: "Coupon does not exist or expired.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    });
};


  return (
    <>
      <input
        type="text"
        placeholder="Enter Coupon Code"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-black border border-gray-300 bg-white/80 backdrop-blur-xl px-4 py-3 rounded-xl w-full max-w-sm shadow focus:ring-2 focus:ring-green-500 outline-none"
      />

      <button
        onClick={handleApply}
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
      >
        Apply Coupon
      </button>
    </>
  );
}

export default CouponApply;
