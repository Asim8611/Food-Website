// DishCard.js
import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

const DishCard = ({ id, name, price, img, addToCart }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <img
        src={img}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold text-gray-800">{name}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <button
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        onClick={() => addToCart({ id, name, price, img })}
      >
       <FaCartPlus size={20} />
      </button>
    </div>
  );
};

export default DishCard;
