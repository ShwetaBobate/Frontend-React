import { useDispatch } from "react-redux";
import { addToCart } from "./Store";

function Drinks() {
  // ⭐ Data array
  const vegItems = [
    { id: 1, name: "Paneer", price: 250, img: "paneer.jpeg" },
    { id: 2, name: "Palak Paneer", price: 350, img: "palak paneer.jpeg" },
    { id: 3, name: "Chole Bhatoore", price: 450, img: "chole-bhatoore.jpeg" },
    { id: 4, name: "Dal Khichdi", price: 150, img: "dal khichdi.jpeg" },
    { id: 5, name: "Pathvadi", price: 250, img: "Pathvadi.jpeg" },
    { id: 6, name: "Veg Biryani", price: 350, img: "vegbiryani.jpeg" },
    { id: 7, name: "Veg Thali", price: 650, img: "vegthali.avif" },
    { id: 8, name: "Aloo Gobi", price: 150, img: "aloo-gobi.jpeg" },
    { id: 9, name: "Masala Bhat", price: 150, img: "Masala-bhaat.jpg" }
  ];
          let dispatch=useDispatch();

  // ⭐ CARD LIST UI stored in a variable
  const vegList = (
    <div className="flex flex-wrap gap-5 justify-center mt-5">
      {vegItems.map(item => (
        <div
          key={item.id}
          className="w-[280px] border border-gray-300 rounded-xl p-3 shadow-md text-center font-sans"
        >
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />

          <h3 className="text-lg my-1">{item.name}</h3>

          <p className="text-base font-bold">₹{item.price}</p>


          <button onClick={()=>dispatch(addToCart(item))} className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700">
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );

  // ⭐ return ONLY the variable (as you asked)
  return (
    <>
      <h1 className="text-center text-2xl font-bold my-4">This is Drink section</h1>
      {vegList}
    </>
  );
}

export default Drinks;
