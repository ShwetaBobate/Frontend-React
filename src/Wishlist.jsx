import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, addToCart } from "./Store";


function Wishlist() {
  const wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  // ⭐ Map logic outside return
  const wishlistCards = wishlist.map(item => (
  <div
    key={item.id}
    className="
      relative 
      bg-white 
      w-[220px] sm:w-[240px] 
      border border-gray-200 
      rounded-xl 
      pt-10 px-3 pb-4
      shadow-md
    "
  >
    {/* ❌ Remove button */}
    <button
      onClick={() => dispatch(removeFromWishlist(item.id))}
      className="
        absolute top-2 right-2 
        text-black 
        text-lg 
        font-bold 
        hover:scale-110 
        transition
      "
    >
      ✕
    </button>

    {/* Image */}
    <img
      src={item.imageUrl}
      alt={item.name}
      className="h-36 w-full object-cover rounded-lg"
    />

    {/* Name */}
    <h3 className="font-semibold mt-2 text-sm text-gray-800">
      {item.name}
    </h3>

    {/* Price */}
    <p className="text-green-600 font-bold text-sm">
      ₹{item.price}
    </p>

    {/* Add to Cart */}
    <button
      onClick={() => dispatch(addToCart(item))}
      className="
        w-full mt-3 
        bg-black text-white 
        py-1.5 
        rounded-lg 
        text-sm 
        hover:bg-gray-800 
        transition
      "
    >
      Move to Cart
    </button>
  </div>
));

  // Empty wishlist
  if (wishlist.length === 0) {
    return (
      <div className="bg-white min-h-screen flex  justify-center pt-20">
        <h2 className="text-xl text-black">Wishlist is empty ❤️</h2>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <h2 className="text-center text-2xl py-6 text-black font-stretch-90%">
        My Wishlist❤️
      </h2>

      <div className="flex flex-wrap justify-center gap-10 px-6">
        
        {wishlistCards}
      </div>
    </div>
  );
}

export default Wishlist;
