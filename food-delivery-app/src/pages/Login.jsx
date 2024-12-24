import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Import toast from react-hot-toast

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      toast.success('Logged in successfully! Redirecting to home...');
      setFormData({ email: '', password: '' });
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store logged in user data

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      toast.error('Invalid email or password!');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">Login</h2>
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
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Login
        </button>
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
