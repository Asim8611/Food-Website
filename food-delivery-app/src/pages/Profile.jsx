import React, { useState, useEffect, useRef } from "react";
import { FaPen } from "react-icons/fa";
import toast from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState(null); // User data
  const [profilePic, setProfilePic] = useState(null); // Profile picture
  const [isEditing, setIsEditing] = useState(false); // Edit mode toggle
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  }); // Form data
  const [showPicOptions, setShowPicOptions] = useState(false); // Profile picture options toggle
  const picOptionsRef = useRef(null); // Reference for the popup menu

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (userData) {
      setUser(userData);
      setProfilePic(userData.profilePic || "https://via.placeholder.com/150");
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        address: userData.address || "",
      });
    }
  }, []);

  // Close profile picture options when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showPicOptions &&
        picOptionsRef.current &&
        !picOptionsRef.current.contains(event.target)
      ) {
        setShowPicOptions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPicOptions]);

  const handleProfileUpdate = () => {
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...formData, profilePic }; // Ensure profilePic is included
    try {
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      setShowPicOptions(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        try {
          const updatedUser = { ...user, profilePic: fileReader.result };
          setProfilePic(fileReader.result); // Update profile pic state
          localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
          setUser(updatedUser);
          toast.success("Profile picture updated successfully!");
        } catch (error) {
          toast.error("Failed to upload profile picture. Please try again.");
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleDeleteProfilePicture = () => {
    try {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user) {
        delete user.profilePic; // Remove profile picture key
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // Update localStorage
        setProfilePic(null); // Immediately update state
        toast.success("Profile picture deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete profile picture. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Your Profile
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-600 mb-4"
              />
              <button
                className="absolute bottom-5 right-2 bg-white p-1 rounded-full text-gray-700 border-2 border-gray-600"
                onClick={() => setShowPicOptions(!showPicOptions)}
              >
                <FaPen />
              </button>
              {showPicOptions && (
                <div
                  ref={picOptionsRef} // Attach the ref to the popup menu
                  className="absolute bottom-10 right-0 bg-white shadow-md rounded-md py-2 w-40"
                >
                  <label className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Update Profile Pic
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePicUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleDeleteProfilePicture}
                  >
                    Delete Profile Pic
                  </button>
                </div>
              )}
            </div>
          </div>

          {user ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Profile Details
              </h2>
              {!isEditing ? (
                <>
                  <p className="text-gray-700 mb-2">
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Address:</strong> {user.address}
                  </p>
                  <p className="text-gray-700">
                    <strong>Member Since:</strong>{" "}
                    {user.memberSince || "Not available"}
                  </p>
                  <button
                    className="mt-4 text-green-600 hover:text-green-800 transition ml-80"
                    onClick={handleProfileUpdate}
                  >
                    Update Profile
                  </button>
                </>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <p className="text-gray-700">No profile data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
