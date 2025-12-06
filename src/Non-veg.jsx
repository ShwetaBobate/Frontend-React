
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, fetchNonVegItems } from "./Store";
// import { toast } from "react-toastify";

// function NonVeg() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchNonVegItems());
//   }, [dispatch]);

//   const { loading, nonVegItems, error } = useSelector(
//     (state) => state.nonVeg
//   );

//   if (loading) return <h1 className="text-center mt-10 text-xl">Loading...</h1>;
//   if (error) return <h1 className="text-center mt-10 text-red-500">{error}</h1>;

//   // ⭐ Pagination logic
//   const totalItems = nonVegItems.length;
//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const [currentPage, setCurrentPage] = useState(1);

//   const start = (currentPage - 1) * itemsPerPage;
//   const end = start + itemsPerPage;

//   const currentItems = nonVegItems.slice(start, end);

//   // ⭐ UI Cards (Same design as Veg.jsx)
//   const cards = currentItems.map((item) => (
//     <div
//       key={item.id}
//       className="w-full sm:w-[160px] md:w-[220px] lg:w-[260px]
//                  bg-white/90 backdrop-blur-sm border border-gray-200
//                  rounded-2xl p-4 shadow-lg hover:shadow-xl transition
//                  duration-300 hover:-translate-y-1"
//     >
//       <img
//         src={item.imageUrl}
//         alt={item.name}
//         className="w-full h-[180px] rounded-xl mb-4 object-cover shadow-sm"
//       />

//       <h3 className="text-xl font-semibold text-gray-800 text-center">
//         {item.name}
//       </h3>

//       <p className="text-sm text-center text-gray-500 mb-2">{item.desc}</p>

//       <p className="text-lg text-center font-bold text-emerald-700">
//         ₹{item.price}
//       </p>

//       <button
//         onClick={() => {
//           dispatch(addToCart(item));
//           toast.success(`Product ${item.name} added successfully`);
//         }}
//         className="mt-4 w-full bg-emerald-500 text-white py-2 rounded-xl 
//                    hover:bg-emerald-600 transition shadow-md"
//       >
//         Add To Cart
//       </button>
//     </div>
//   ));

//   return (
//     <>
//       <h1 className="text-center my-6 text-3xl font-bold">
//         This is Non-Veg Section
//       </h1>

//       {/* Cards */}
//       <div className="flex flex-wrap gap-6 justify-center mt-5">
//         {cards}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-5 space-x-3">
        
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
//         >
//           Prev
//         </button>

//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentPage(index + 1)}
//             className={`px-3 py-1 rounded ${
//               currentPage === index + 1
//                 ? "bg-amber-600 text-white"
//                 : "bg-white border"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}

//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
//         >
//           Next
//         </button>

//       </div>
//     </>
//   );
// }

// export default NonVeg;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchNonVegItems } from "./Store";
import { toast } from "react-toastify";

function NonVeg() {
  const dispatch = useDispatch();

  const { loading, nonVegItems, error } = useSelector(
    (state) => state.nonVeg
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchNonVegItems());
  }, [dispatch]);

  if (loading) return <h1 className="text-center mt-10 text-xl">Loading...</h1>;
  if (error) return <h1 className="text-center mt-10 text-red-500">{error}</h1>;
  if (!nonVegItems || nonVegItems.length === 0) 
    return <h1 className="text-center mt-10 text-gray-500">No items found</h1>;

  // Pagination
  const totalItems = nonVegItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = nonVegItems.slice(start, end);

  return (
    <>
      <h1 className="text-center my-6 text-3xl font-bold">Non-Veg Section</h1>

      {/* Cards */}
      <div className="flex flex-wrap gap-6 justify-center mt-5">
        {currentItems.map((item) => (
          <div
            key={item._id || item.id} // Use _id if backend uses MongoDB
            className="w-full sm:w-[160px] md:w-[220px] lg:w-[260px] 
                       bg-white/90 backdrop-blur-sm border border-gray-200
                       rounded-2xl p-4 shadow-lg hover:shadow-xl transition
                       duration-300 hover:-translate-y-1"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-[180px] rounded-xl mb-4 object-cover shadow-sm"
            />
            <h3 className="text-xl font-semibold text-gray-800 text-center">{item.name}</h3>
            <p className="text-sm text-center text-gray-500 mb-2">{item.desc}</p>
            <p className="text-lg text-center font-bold text-emerald-700">₹{item.price}</p>
            <button
              onClick={() => {
                dispatch(addToCart(item));
                toast.success(`Product ${item.name} added successfully`);
              }}
              className="mt-4 w-full bg-emerald-500 text-white py-2 rounded-xl hover:bg-emerald-600 transition shadow-md"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
   <div className="flex justify-center items-center space-x-2 mt-6">

  {/* Prev Button */}
  <button
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-medium transition-transform duration-200
      ${currentPage === 1
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-gradient-to-br from-blue-400 to-white hover:from-blue-500 hover:to-blue-200 transform hover:scale-110"}
    `}
  >
    &lt;
  </button>

  {/* Page Numbers */}
  <div className="flex space-x-1">
    {Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;
      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-transform duration-200
            ${currentPage === page
              ? "bg-gradient-to-br from-blue-600 to-blue-400 text-white transform scale-110 shadow-md"
              : "bg-gradient-to-br from-blue-400 to-white text-blue-700 hover:from-blue-500 hover:to-blue-200 hover:scale-110"}
          `}
        >
          {page}
        </button>
      );
    })}
  </div>

  {/* Next Button */}
  <button
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-medium transition-transform duration-200
      ${currentPage === totalPages
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-gradient-to-br from-blue-400 to-white hover:from-blue-500 hover:to-blue-200 transform hover:scale-110"}
    `}
  >
    &gt;
  </button>

</div>

    </>
  );
}

export default NonVeg;
