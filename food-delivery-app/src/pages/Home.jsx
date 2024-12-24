import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation

const Home = ({ addToCart }) => {
  const fullText = "It's Not Just Food, It's an Experience."; // Full text to display
  const [displayedText, setDisplayedText] = useState(""); // Text being displayed
  const [letterIndex, setLetterIndex] = useState(0); // Track which letter is being typed
  const [cursorVisible, setCursorVisible] = useState(true); // Cursor visibility

  // Typing animation logic
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (letterIndex < fullText.length) {
        setDisplayedText((prev) => prev + fullText[letterIndex]); // Add next letter
        setLetterIndex((prev) => prev + 1);
      } else {
        clearInterval(typingInterval); // Stop typing
        setTimeout(() => {
          setDisplayedText(""); // Clear text after 1s
          setLetterIndex(0); // Restart the typing animation
        }, 1500);
      }
    }, 100); // Typing speed (100ms per letter)

    return () => clearInterval(typingInterval); // Cleanup on unmount
  }, [letterIndex]);

  // Cursor blinking animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev); // Toggle cursor visibility
    }, 500); // Blinking speed

    return () => clearInterval(cursorInterval); // Cleanup on unmount
  }, []);

  // Function to style words
  const renderStyledText = () => {
    const words = displayedText.split(" "); // Split displayed text into words
    return words.map((word, index) => {
      const isRed = word.startsWith("Food") || word.startsWith("Experience"); // Check for target words
      return (
        <span key={index} className={isRed ? "text-red-500" : "text-white"}>
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-8 pt-1">
      {/* Header Section with rounded top and bottom */}
      <header
        className="relative bg-cover bg-center h-[540px] flex items-center justify-center rounded-lg overflow-hidden shadow-xl"
        style={{ backgroundImage: "url('/home.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative text-center px-6 md:px-12 z-10">
          {/* Typing Animation with cursor */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 bg-opacity-80 rounded-lg p-4 inline-block">
            {renderStyledText()} {/* Reusable function to render styled words */}
            {/* Blinking Cursor */}
            <span
              className={`inline-block w-1 h-10 bg-red-500 ml-1 animate-blink ${
                cursorVisible ? "opacity-100" : "opacity-0"
              }`}
            ></span>
          </h1>

          <div className="space-x-4">
            <Link to="/menu">
              <button className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition">
                View Menu
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Dishes Section */}
      <section className="py-11">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-700">
          Our Featured Dishes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              id: 1,
              name: "Burger",
              price: 300.0,
              img: "/burger.jpg",
              desc: "with Fries",
            },
            {
              id: 2,
              name: "Grilled Pineapple Pork",
              price: 350.0,
              img: "/pineapple.jpg",
              desc: "with Extra sauce",
            },
            {
              id: 3,
              name: "Margherita Pizza",
              price: 999.99,
              img: "/Margherita.jpg",
              desc: "classic pizza",
            },
            {
              id: 4,
              name: "Stuffed Potato",
              price: 80.99,
              img: "/Stuffed.jpg",
              desc: "with Mayonnaise",
            },
          ].map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-lg shadow-xl transition-shadow duration-300 p-4"
            >
              <img
                src={dish.img}
                alt={dish.name}
                className="w-full h-48 object-cover rounded-t-lg shadow-md"
              />
              <div className="mt-4">
                <h3 className="text-lg font-bold">{dish.name}</h3>
                <p className="text-sm text-gray-600">{dish.desc}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-600 font-semibold">
                    Pkr: {dish.price.toFixed(2)}
                  </span>
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => addToCart(dish)}
                  >
                    <FaCartPlus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
