import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Import React Icons

const Contact = () => {
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  // Handle form submission and validate input
  const handlePlaceOrder = (e) => {
    e.preventDefault(); // Prevent page reload
    if (validateForm()) {
      setShowModal(true);
    }
  };

  // Function to validate form inputs
  const validateForm = () => {
    let formErrors = { name: "", email: "", message: "" };
    let isValid = true;

    // Validate name
    const name = document.getElementById("name").value;
    if (name === "") {
      formErrors.name = "Name is required.";
      isValid = false;
    }

    // Validate email
    const email = document.getElementById("email").value;
    if (email === "") {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid.";
      isValid = false;
    }

    // Validate message
    const message = document.getElementById("message").value;
    if (message === "") {
      formErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-gray-700 mb-6">Contact Us</h1>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Got a question, feedback, or just want to say hello? We'd love to hear from you! Reach out to us using the form below or through our contact details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Send a Message</h2>
              <form onSubmit={handlePlaceOrder}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-gray-400 focus:outline-none"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-gray-400 focus:outline-none"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-gray-400 focus:outline-none"
                    placeholder="Enter your message"
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-4">
                Feel free to contact us through the following details:
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="w-8 h-8 bg-gray-700 text-white flex items-center justify-center rounded-full mr-4">
                    <FaPhoneAlt size={20} />
                  </span>
                  <span className="text-gray-700">+923186182330</span>
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 bg-gray-700 text-white flex items-center justify-center rounded-full mr-4">
                    <FaEnvelope size={20} />
                  </span>
                  <span className="text-gray-700">support@forkndelight.com</span>
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 bg-gray-700 text-white flex items-center justify-center rounded-full mr-4">
                    <FaMapMarkerAlt size={20} />
                  </span>
                  <span className="text-gray-700">Jhang</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal for success */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Message Sent Successfully!</h2>
              <p className="mb-6">Thank you for reaching out to us. We will get back to you shortly!</p>
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
    </>
  );
};

export default Contact;
