import React, { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';

const Menu = ({ addToCart }) => {
  const dishes = [
    { id: 1, name: 'Pizza', price: 1000, img: '/menu/pizza1.jpg' },
    { id: 2, name: 'Burger', price: 280, img: '/menu/burger1.jpg' },
    { id: 3, name: 'Pasta', price: 750, img: '/menu/pasta1.jpg' },
    { id: 4, name: 'Salad', price: 650, img: '/menu/salad1.jpg' },
    { id: 5, name: 'Steak', price: 340, img: '/menu/steak1.jpg' },
    { id: 6, name: 'Tacos', price: 650, img: '/menu/tacos1.jpg' },
    { id: 7, name: 'Sushi', price: 280, img: '/menu/sushi.jpg' },
    { id: 8, name: 'Ice Cream', price: 450, img: '/menu/ice-cream.jpg' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  // Filter dishes based on the search term
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-gray-600 mb-6">Our Menu</h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for a dish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-gray-400 text-gray-700"
          />
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={dish.img}
                alt={dish.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="w-full flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{dish.name}</h3>
                  <p className="text-gray-600 font-semibold">Pkr: {dish.price.toFixed(2)}</p>
                </div>
                <button
                  className="text-gray-600 hover:text-gray-900 mt-7"
                  onClick={() => addToCart(dish)}
                >
                  <FaCartPlus size={20} />
                </button>
              </div>
            </div>
          ))}

          {/* Display message if no dishes are found */}
          {filteredDishes.length === 0 && (
            <p className="text-gray-600 text-center col-span-full">
              No dishes found. Try a different search!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
