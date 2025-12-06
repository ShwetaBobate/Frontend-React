import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchVegItems } from "./Store";
import { toast } from "react-toastify";
// import { current } from "@reduxjs/toolkit";
// import { fetchAllVeg } from "../backend/ProductService";

function Veg() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVegItems());
  }, []);
  const { loading, vegItems, error } = useSelector((globalState) => globalState.veg);


  // const vegItems = [
  //     { id: 1, name: "Paneer", price: 250, img: "paneer.jpeg" },
  //     { id: 2, name: "Palak Paneer", price: 350, img: "palak paneer.jpeg" },
  //     { id: 3, name: "Chole Bhatoore", price: 450, img: "chole-bhatoore.jpeg" },
  //     { id: 4, name: "Dal Khichdi", price: 150, img: "dal khichdi.jpeg" },
  //     { id: 5, name: "Pathvadi", price: 250, img: "Pathvadi.jpeg" },
  //     { id: 6, name: "Veg Biryani", price: 350, img: "vegbiryani.jpeg" },
  //     { id: 7, name: "Veg Thali", price: 650, img: "vegthali.avif" },
  //     { id: 8, name: "Aloo Gobi", price: 150, img: "aloo-gobi.jpeg" },
  //     { id: 9, name: "Masala Bhat", price: 150, img: "Masala-bhaat.jpg" }
  // ];

  const totalItems = vegItems.length;
  const itemsPerPage = 10;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const currentItems = vegItems.slice(start, end);

  const currentListItems = currentItems.map((vegItems, index) => (<li key={index}>{vegItems}</li>));


  // const cards = currentItems.map(item => (
  //     <div
  //         key={item.id}
  //         className="w-full sm:w-[150px] md:w-[200px] lg:w-[250px] border border-gray-300 rounded-xl p-4 shadow-md text-center"
  //     >
  //         <img
  //           src={`/${item.img}`}
  //             alt={item.name}
  //             className="w-full h-[200px] rounded-lg mb-3 object-cover"
  //         />

  //         <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
  //         <h3>{item.desc}</h3>

  //         <p className="text-xl">₹{item.price}</p>

  //         <button
  //             onClick={() => {dispatch(addToCart(item));toast.success(`Product ${item.name} added successfully`)}}
  //             className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
  //         >
  //             Add To Cart
  //         </button>

  //     </div>
  // ));

  const cards = currentItems.map(item => (
    <div
      key={item.id}
      className="
      relative
      w-full sm:w-[140px] md:w-[180px] lg:w-[200px]
      bg-white border border-gray-200 
      rounded-2xl p-3 shadow-md hover:shadow-xl 
      transition-all duration-200 hover:-translate-y-1
      hover:border-emerald-400 z-10
    "
    >
      {/* Image */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="
        w-full h-[130px] rounded-xl mb-3 object-cover shadow-sm 
        transition-transform duration-200 hover:scale-105
      "
      />

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800  leading-tight mb-1">
        {item.name}
      </h3>



      {/* Description */}
      <p className="text-xs text-gray-500 mb-2 px-1">
        {item.desc}
      </p>

      {/* Price + Heart */}
      <div className="flex justify-between items-center mb-3 px-1">
        <p className="text-md font-bold text-emerald-700">₹{item.price}</p>

        <button className="bg-white/80 p-1 rounded-full shadow-sm hover:bg-red-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor"
            className="w-5 h-5 text-gray-600 hover:text-red-500 transition">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
               0-3.597 1.126-4.312 2.733C11.285 
               4.876 9.623 3.75 7.688 3.75 5.099 
               3.75 3 5.765 3 8.25c0 7.22 
               9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => {
          dispatch(addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,  // ⭐ MUST ADD THIS
            // desc: item.desc,
            // category: item.category
          }));
          toast.success(`Product ${item.name} added successfully`);
        }}
        className="
        w-full bg-emerald-500 text-white py-2 rounded-xl 
        hover:bg-emerald-600 transition-all duration-200 shadow
      "
      >
        Add To Cart
      </button>
    </div>
  ));







  return (
    <>
      <h2 className="text-center my-6 text-3xl font-bold">
        Veg Section
      </h2>

     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 ms-4 me-4 mt-12 justify-items-center">
  {cards}
</div>

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

export default Veg;
