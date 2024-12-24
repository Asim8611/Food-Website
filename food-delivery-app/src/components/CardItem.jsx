import React from 'react';

const CartItem = ({ name, price, quantity, onRemove, onQuantityChange }) => (
  <div className="flex justify-between items-center border-b py-4">
    <div>
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-700">${price}</p>
    </div>
    <div className="flex items-center space-x-4">
      <input 
        type="number" 
        min="1" 
        value={quantity} 
        onChange={(e) => onQuantityChange(e.target.value)} 
        className="w-16 text-center border rounded-md"
      />
      <button 
        onClick={onRemove} 
        className="text-red-500 hover:underline"
      >
        Remove
      </button>
    </div>
  </div>
);

export default CartItem;
