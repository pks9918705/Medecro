import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register({ accountAddress }) {
  // Initial form state
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    accountAddress: "", // Initially empty, will be set via useEffect
    userType: "patient", // Default value
    dateOfBirth: "",
    contactInfo: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  // Effect to update accountAddress in formData when the prop changes
  useEffect(() => {
    console.log("accAdd in reg",accountAddress)
    if (accountAddress) {
      setFormData((prevData) => ({
        ...prevData,
        accountAddress: accountAddress,
      }));
    }
  }, [accountAddress]);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      // Post data to server
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      const data = response.data;

      if (response.status === 201) {
        // Display success toast notification
        toast.success("Registration successful!", {
          duration: 3000,
          position: "top-center",
        });

        // Store user information in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect based on userType
        if (formData.userType === "patient") {
          navigate("/patient"); // Redirect to Patient component
        } else if (formData.userType === "doctor") {
          navigate("/doctor"); // Redirect to Doctor component
        }
      } else {
        // Display error toast notification for unsuccessful registration
        toast.error(data.message || "Something went wrong", {
          duration: 3000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      // Display error toast notification for failed registration
      toast.error("Registration failed. Please try again later.", {
        duration: 3000,
        position: "top-center",
      });
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Create Account</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left Side Fields */}
          <div className="space-y-6">
            {/* Full Name Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Account Address Field (Read-Only) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Account Address</label>
              <input
                type="text"
                name="accountAddress"
                value={formData.accountAddress}
                onChange={handleChange}
                className="p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out"
                readOnly
              />
            </div>
          </div>

          {/* Right Side Fields */}
          <div className="space-y-6">
            {/* User Type Selection */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">User Type</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            {/* Date of Birth Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out"
                required
              />
            </div>

            {/* Contact Info Field */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Contact Information</label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="+1234567890"
                required
              />
            </div>
          </div>

          {/* Register Button (Centered) */}
          <div className="col-span-1 sm:col-span-2 flex justify-center mt-8">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-200 ease-in-out"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>



  );
}
