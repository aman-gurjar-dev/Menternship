import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isMentor, setIsMentor] = useState(false);

  // Check email domain when email changes
  useEffect(() => {
    if (formData.email.includes("@menternship.com")) {
      setIsMentor(true);
    } else {
      setIsMentor(false);
    }
  }, [formData.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setAlreadyRegistered(false);
    setSuccessMessage("");
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match! Please enter the same password.");
      return;
    }

    try {
      // Determine the registration endpoint based on email domain
      const endpoint = isMentor 
        ? "http://localhost:3000/api/mentors/register" 
        : "http://localhost:3000/api/students/register";

      const res = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "application/json" }
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", isMentor ? "mentor" : "student");
      
      setSuccessMessage(`Registration successful! Redirecting to ${isMentor ? "mentor" : "student"} dashboard...`);

      setTimeout(() => {
        navigate(isMentor ? "/mentor-dashboard" : "/UserDashboard");
      }, 2000);
      
    } catch (err) {
      console.error("Registration Failed:", err.response ? err.response.data : err.message);

      if (err.response?.status === 400 && err.response.data.error === "Email already exists") {
        setAlreadyRegistered(true);
      } else {
        alert(`Registration failed! ${err.response?.data?.error || "Check console for details."}`);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center relative overflow-hidden px-4 text-black">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-lg xl:max-w-lg h-auto bg-transparent border-2 border-violet-200 rounded-2xl p-6 flex flex-col items-center relative z-10">
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-2 bg-clip-text text-transparent">
          Register Now
        </h1>

        {isMentor && (
          <p className="text-purple-500 mb-2">Registering as a Mentor</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center w-full px-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="username"
            type="text"
            placeholder="User Name"
            className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Enter email"
            className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          {alreadyRegistered && (
            <p className="text-red-500 text-xs sm:text-sm">
              User is already registered! <NavLink to="/Login" className="text-blue-400">Login here</NavLink>
            </p>
          )}

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm sm:text-base md:text-lg lg:text-xl py-2 px-6 rounded-2xl mt-2 w-full text-center"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;