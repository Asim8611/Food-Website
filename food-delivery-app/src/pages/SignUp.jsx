import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import Toaster and toast

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.email === formData.email);

    if (userExists) {
      toast.error('User with this email already exists!'); // Show error toast
    } else {
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      toast.success('Account created successfully!'); // Show success toast

      setFormData({ name: '', email: '', password: '', address: '' });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
        onSubmit={handleSignup}
      >
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-300 focus:outline-none"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-300 focus:outline-none"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-300 focus:outline-none"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-300 focus:outline-none"
            placeholder="Enter your address"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Sign Up
        </button>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-red-500 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
