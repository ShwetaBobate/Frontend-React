import React from "react";

function About() {
  const highlights = [
    {
      title: "Handpicked Dishes",
      desc: "We bring together a collection of the most loved and trending dishes so you always find something exciting to try.",
      icon: "🍜",
      color: "bg-orange-100",
    },
    {
      title: "Taste the World",
      desc: "From street food favorites to international cuisines, FoodDVerse lets you explore flavors from everywhere.",
      icon: "🌍",
      color: "bg-purple-100",
    },
    {
      title: "Food Inspiration",
      desc: "Not sure what to eat? Browse our food gallery and discover dishes that inspire your next meal.",
      icon: "✨",
      color: "bg-yellow-100",
    },
    {
      title: "Simple & Fun",
      desc: "Our goal is to make food discovery fun, colorful, and effortless for every user.",
      icon: "🎉",
      color: "bg-pink-100",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">

      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          The Story Behind FoodDVerse 🍔
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          FoodDVerse was created for people who love discovering food. Whether
          it's a comfort meal or something completely new, this space celebrates
          the joy of exploring flavors.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {highlights.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition ${item.color}`}
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-black">{item.title}</h3>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Experience Section */}
      <div className="max-w-5xl mx-auto mt-16 bg-white shadow-lg rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">
          Food is an Experience
        </h2>
        <p className="text-gray-600 text-lg">
          Food is more than just something we eat — it’s memories, culture, and
          creativity on a plate. FoodDVerse celebrates this experience by
          bringing together dishes that people love and enjoy every day.
        </p>
      </div>

      {/* Fun Tagline */}
      <div className="text-center mt-14">
        <h3 className="text-2xl font-semibold text-gray-700">
          Explore. Taste. Repeat. 🍕
        </h3>
      </div>
    </div>
  );
}

export default About;