import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, updateQuantity, removeItem }) => {
  const navigate = useNavigate();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add some items before proceeding to checkout.');
    } else {
      navigate('/order-confirmation');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">
            Your cart is empty. Start adding some delicious food!
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-grow ml-4">
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">{item.price.toFixed(2)}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-gray-100 rounded-md">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-700">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>{calculateTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-900"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
