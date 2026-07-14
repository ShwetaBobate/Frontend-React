
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./Non-veg";
import Cafe from "./Cafe";
import ContactUs from "./ContactUs";
import About from "./About";
import Drinks from "./Drinks";
import Cart from "./Cart";
import Orders from "./Orders";
import Wishlist from "./Wishlist";
import RegisterUser from "./RegisterUser";
// import CheckoutPage from "./Checkout";
import Checkout from "./Checkout";



function AppContent() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const wishlistItems = useSelector((state) => state.wishlist);
  const wishlistCount = wishlistItems.length;

  // const categories = [
  //   { name: "Veg", img: "images/vegthali.avif", path: "/veg" },
  //   { name: "Non Veg", img: "images/nonveg.png", path: "/nonveg" },
  //   { name: "Cafe", img: "images/cafe.png", path: "/cafe" },
  //   { name: "Drinks", img: "images/drinks.png", path: "/drinks" },
  // ];
  const offers = [
    "🎉 Flat 30% OFF on First Order!",
    "💖 Free Delivery Above ₹299",
    "🍕 Buy 1 Get 1 Free on Pizzas"
  ];

  const [currentOffer, setCurrentOffer] = useState(offers[0]);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    let index = 0;

    const runAnimation = () => {
      const box = document.getElementById("offer-box");
      if (!box) return;

      box.classList.remove("offer-animate");
      void box.offsetWidth;                 // reset animation

      setCurrentOffer(offers[index]);       // set new offer
      box.classList.add("offer-animate");   // start animation

      index = (index + 1) % offers.length;
    };

    runAnimation(); // run first

    const interval = setInterval(runAnimation, 6000);
    return () => clearInterval(interval);
  }, []);


  const placeholders = [
    "Pizza",
    "Burger",
    "Pasta",
    "French Fries",
    "Cold Coffee",
    "Momos"
  ];

  useEffect(() => {
    let mainText = "Search for ";     // Static part
    let idx = 0;                      // Which product
    let charIndex = 0;                // Character typing index
    let deleting = false;             // Typing or deleting

    const smoothType = () => {
      const currentWord = placeholders[idx];

      if (!deleting) {
        // Typing
        setSearchTerm(mainText + currentWord.slice(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentWord.length) {
          setTimeout(() => (deleting = true), 1000); // Wait before deleting
        }
      }
      else {
        // Deleting
        setSearchTerm(mainText + currentWord.slice(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          deleting = false;
          idx = (idx + 1) % placeholders.length; // Move to next word
        }
      }
    };

    const interval = setInterval(smoothType, deleting ? 120 : 150);
    // slower delete = 120ms, slower type = 150ms

    return () => clearInterval(interval);
  }, []);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  return (
    <>

      {/* ===== Offer Marquee ===== */}
      <div className="bg-black text-white py-2 overflow-hidden h-8 flex items-center justify-center  sticky top-0 z-50">
        <div
          id="offer-box"
          className="absolute text-center"
        >
          {currentOffer}
        </div>
      </div>




      {/* ===== Top Navbar ===== */}
      <nav className="bg-stone-50 border-b border-stone-200 shadow-lg text-black w-full px-2 py-3 flex items-center justify-between sticky top-0 z-50 ">

        {/* Logo + Name */}
        <div className="flex items-center">
          <div className="w-16 h-8 overflow-hidden flex items-center justify-center">
            <img
              src="images/logo.jpg"
              alt="Logo"
              className="scale-125 object-cover m-0"
            />
          </div>

          <p className="text-black text-4xl font-bold tracking-widest">
            FOODVERSE
          </p>
        </div>
        {/* Search Bar */}
        <div className="relative flex-1 mx-6 max-w-2xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholders || "Search for..."}
            className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-100  focus:outline-none focus:ring-1 focus:ring-black text-gray-600"
          />


          {/* Search Icon (RIGHT SIDE) */}
          <img
            src="images/search.svg"
            alt="S"
            className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 "
          />
        </div>

        {/* Login & Cart */}
        <div className="flex items-center space-x-6">

          {/* Login with ⚡ Badge */}
          <div className="relative transition-transform hover:scale-110">
            <Link
              to="/login"
              className="text-black text-lg"
            >
              <img src="images/login.svg" className="w-7 h-7" alt="Login" />
              <span className="absolute top-1/2 -right-1 -translate-y-1/2 text-yellow-400 text-xl font-bold">⚡</span>

            </Link>
          </div>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative flex items-center text-black transition-transform transform hover:scale-115 text-lg"
          >
            <img src="images/wishlist.svg" className="w-7 h-7" alt="" />

            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-400 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {wishlistCount}
            </span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center text-lg transition-transform transform hover:scale-115"
          >
            <img src="images/bag.svg" alt="Cart" className="w-7 h-7" />

            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-400 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          </Link>

        </div>
      </nav>

      {/* Bottom Navbar */}
      {/* ===== Bottom Navbar (Category Links) ===== */}
      {!isLoginPage && (
        <nav
          className={`text-black w-full pb-3 pt-1 flex items-center justify-center space-x-10 sticky top-20 z-40 transition-all duration-300
  ${scrolled
              ? "bg-white/60 backdrop-blur-md shadow-sm"
              : "bg-stone-50"}
`}
        >          <Link
          to="/home"
          className=" text-lg font-semibold hover:text-yellow-200 transition"
        >
            Home
          </Link>

          <Link
            to="/veg"
            className=" text-lg font-semibold hover:text-yellow-200 transition"
          >
            Veg
          </Link>

          <Link
            to="/nonveg"
            className=" text-lg font-semibold hover:text-yellow-200 transition"
          >
            Non Veg
          </Link>

          <Link
            to="/cafe"
            className="text-lg font-semibold hover:text-yellow-200 transition"
          >
            Cafe
          </Link>
          <Link
            to="/deserts"
            className=" text-lg font-semibold hover:text-yellow-200 transition"
          >
            Deserts
          </Link>

          <Link
            to="/beverages"
            className="e text-lg font-semibold hover:text-yellow-200 transition"
          >
            Beverages
          </Link>



          <Link
            to="/about"
            className=" text-lg font-semibold hover:text-yellow-200 transition"
          >
            About
          </Link>

          <Link
            to="/contact"
            className=" text-lg font-semibold hover:text-yellow-200 transition"
          >
            Contact
          </Link>
          <Link
            to="/orders"
            className=" text-lg font-semibold hover:text-yellow-200 transition"
          >
            Orders
          </Link>


        </nav>


      )}

      {/* ===== Routes ===== */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<RegisterUser />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

    </>
  );
}



function App() {


  return (
    <div>

      <BrowserRouter>
        <ToastContainer />
        <AppContent />
      </BrowserRouter>
      {/* <style>
{`
@keyframes smoothLTR {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.offer-text {
  white-space: nowrap;
  animation: smoothLTR 6s linear;
}
`} */}
      {/* </style> */}

      <style>
        {
          `
          @keyframes slideLTR {
  0% {
    transform: translateX(-120%);
    opacity: 1;
  }
  90% {
    transform: translateX(100%);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.offer-animate {
  white-space: nowrap;
  animation: slideLTR 6s linear forwards;
}

          `
        }
      </style>





    </div>
  );
}

export default App;

