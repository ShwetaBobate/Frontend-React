import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-4xl font-bold transition tracking-widest mb-4">
                FOODVERSE       
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Bringing delicious meals to your doorstep with freshness,
            quality ingredients, and fast delivery.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-6 text-xl">
            <a href="#" className="transition transform hover:scale-110">
              <i className="fa-brands fa-facebook"></i>
            </a>

            <a href="#" className=" transition transform hover:scale-110">
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a href="#" className=" transition transform hover:scale-110">
              <i className="fa-brands fa-twitter"></i>
            </a>

            <a href="#" className=" transition transform hover:scale-110">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-3">
            {["Home", "Menu", "Categories", "Offers", "About Us"].map((item) => (
              <li
                key={item}
                className="cursor-pointer transition duration-300 hover:text-white hover:translate-x-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Customer Support</h3>

          <ul className="space-y-3">
            {[
              "Help Center",
              "Delivery Info",
              "Refund Policy",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((item) => (
              <li
                key={item}
                className="cursor-pointer transition duration-300 hover:text-white hover:translate-x-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Map */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Our Location</h3>

          <p className="text-gray-400 mb-3">
            📍 21 Food Street, IT Park Road,
            <br />
            Nagpur, Maharashtra 440001
          </p>

          {/* Google Map */}
          <div className="rounded-lg overflow-hidden border border-gray-700">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=Nagpur&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-32"
            ></iframe>
          </div>

          <p className="text-gray-400 mt-3">📞 +91 98765 43210</p>
          <p className="text-gray-400">✉ support@foodverse.com</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} FoodVerse Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;