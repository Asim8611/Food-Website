import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    paymentMethod: "",
    onlinePaymentType: "",
    cardNumber: "",
    cardIssueDate: "",
    cardExpiryDate: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Full Name is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Payment Method is required.";

    if (formData.paymentMethod === "online") {
      if (!formData.onlinePaymentType) newErrors.onlinePaymentType = "Select a payment type.";
      if (formData.onlinePaymentType === "card") {
        if (!formData.cardNumber) newErrors.cardNumber = "Card Number is required.";
        if (!formData.cardIssueDate) newErrors.cardIssueDate = "Issue Date is required.";
        if (!formData.cardExpiryDate) newErrors.cardExpiryDate = "Expiry Date is required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/menu");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center  px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-xl w-full mt-3 mb-3">
        <h1 className="text-4xl font-bold text-gray-700 mb-6">Checkout</h1>
        <form>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-1 ">Full Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring focus:text-gray-400 focus:outline-none ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 text-left">{errors.name}</p>}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-1">Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring focus:text-gray-400 focus:outline-none ${
                errors.address ? "border-red-500" : ""
              }`}
              placeholder="Enter your address"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1 text-left">{errors.address}</p>}
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-1">City*</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring focus:text-gray-400 focus:outline-none ${
                errors.city ? "border-red-500" : ""
              }`}
              placeholder="Enter your city"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1 text-left">{errors.city}</p>}
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-left text-gray-700 mb-1">Payment Method*</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring focus:text-gray-400 focus:outline-none ${
                errors.paymentMethod ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Payment Method</option>
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>
            {errors.paymentMethod && <p className="text-red-500 text-sm mt-1 text-left">{errors.paymentMethod}</p>}
          </div>

          {/* Online Payment Type */}
          {formData.paymentMethod === "online" && (
            <>
              <div className="mb-4">
                <label className="block text-left text-gray-700 mb-1">Online Payment Type*</label>
                <select
                  name="onlinePaymentType"
                  value={formData.onlinePaymentType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring focus:text-gray-400 focus:outline-none${
                    errors.onlinePaymentType ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Online Payment Type</option>
                  <option value="easypaisa">Easypaisa</option>
                  <option value="jazzcash">JazzCash</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
                {errors.onlinePaymentType && <p className="text-red-500 text-sm mt-1 text-left">{errors.onlinePaymentType}</p>}
              </div>

              {/* Card Details */}
              {formData.onlinePaymentType === "card" && (
                <>
                  <div className="mb-4">
                    <label className="block text-left text-gray-700 mb-1">Card Number*</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring focus:text-gray-400 focus:outline-none ${
                        errors.cardNumber ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your card number"
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1 text-left">{errors.cardNumber}</p>}
                  </div>

                  <div className="mb-4">
                    <label className="block text-left text-gray-700 mb-1">Issue Date*</label>
                    <input
                      type="month"
                      name="cardIssueDate"
                      value={formData.cardIssueDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring focus:text-gray-400 focus:outline-none ${
                        errors.cardIssueDate ? "border-red-500" : ""
                      }`}
                    />
                    {errors.cardIssueDate && <p className="text-red-500 text-sm mt-1 text-left">{errors.cardIssueDate}</p>}
                  </div>

                  <div className="mb-4">
                    <label className="block text-left text-gray-700 mb-1">Expiry Date*</label>
                    <input
                      type="month"
                      name="cardExpiryDate"
                      value={formData.cardExpiryDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring focus:text-gray-400 focus:outline-none ${
                        errors.cardExpiryDate ? "border-red-500" : ""
                      }`}
                    />
                    {errors.cardExpiryDate && <p className="text-red-500 text-sm mt-1 text-left">{errors.cardExpiryDate}</p>}
                  </div>
                </>
              )}
            </>
          )}

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-900 transition"
          >
            Place Order
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
            <p className="mb-6">Thank you for your order. We will deliver it shortly!</p>
            <button
              onClick={closeModal}
              className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
