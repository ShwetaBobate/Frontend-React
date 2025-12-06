import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Home() {
  const slides = [
    { id: 1, image: "images/home1.jpeg", text: "Delicious Meals Delivered Fresh" },
    { id: 2, image: "images/home2.jpg", text: "Taste the Best From Top Chefs" },
    { id: 3, image: "images/home3.jpg", text: "Healthy, Hygienic & Super Quick" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000); // auto change every 3s
    return () => clearInterval(interval);
  }, [slides.length]);


  const navigate = useNavigate();

  const orderNow=()=>{
navigate("/veg")
  }

  const categories = [
    { id: 1, title: "Veg", image: "images/vegItems.jpeg", route: "/classic" },
    { id: 2, title: "Non-Veg", image: "images/nonvegItems.jpeg", route: "/gourmet" },
    { id: 3, title: "Deserts", image: "images/deserts.jpeg", route: "/designer" },
    { id: 4, title: "Beverages", image: "images/beverages.jpeg", route: "/desserts" },
  ];

  // ⭐ MAP LOGIC OUTSIDE RETURN
  const categoryCards = categories.map((cat) => (
    <div
      key={cat.id}
      onClick={() => navigate("/veg")}
      className="cursor-pointer group"
    >
      <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-xl transition transform group-hover:scale-105">
        <img
          src={cat.image}
          alt={cat.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-black text-center mt-4 text-xl font-semibold group-hover:text-red-500 transition">
        {cat.title.toUpperCase()}
      </h2>
    </div>
  ));






  return (
    <>

      <div className="w-full h-[85vh] relative overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-150 ease-in-out 
          ${current === index ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.image}
              alt="food banner"
              className="w-full h-full object-cover"
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
                {slide.text}
              </h1>
              <p className="mt-4 text-white text-lg md:text-xl">
                Fresh • Fast • Flavorful
              </p>

              <button onClick={()=>orderNow()}className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-md hover:bg-gray-200 transition">
                Order Now
              </button>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-6 w-full flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition 
              ${current === index ? "bg-white" : "bg-white/40"}`}
            ></button>
          ))}
        </div>
      </div>
      <section className="bg-white py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black">Menu</h1>
          <p className="text-gray-900 text-xl mt-2">What will you wish for?</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {categoryCards}
        </div>
      </section>


      <div className="">
        {/* Footer */}
        <footer className="bg-black text-white py-10 mt-0">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Brand */}
            <div>
              <h2 className="text-2xl font-bold mb-3">FoodVerse</h2>
              <p className="text-gray-300">
                Your favorite meals delivered hot & fresh. Fast service, great taste!
              </p>
              <div className="flex gap-4 mt-4">
  <i className="fa-brands fa-facebook text-white text-2xl hover:text-gray-400 cursor-pointer"></i>
  <i className="fa-brands fa-instagram text-white text-2xl hover:text-gray-400 cursor-pointer"></i>
  <i className="fa-brands fa-twitter text-white text-2xl hover:text-gray-400 cursor-pointer"></i>
</div>

            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white cursor-pointer">Home</li>
                <li className="hover:text-white cursor-pointer">Menu</li>
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white cursor-pointer">Help Center</li>
                <li className="hover:text-white cursor-pointer">Delivery Info</li>
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">📍 Nagpur, India</p>
              <p className="text-gray-300 mt-2">📞 +91 98765 43210</p>
              <p className="text-gray-300 mt-2">📧 support@foodverse.com</p>
            </div>

          </div>

          {/* Bottom */}
          <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} FoodVerse — All Rights Reserved.
          </div>
        </footer>

      </div>


    </>

  );
}

export default Home;
