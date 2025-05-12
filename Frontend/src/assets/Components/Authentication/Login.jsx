import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import config from "../../utils/config";
import Loginvalidation from "./Loginvalidation";

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = Loginvalidation(value);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await axios.post(`${config.backendUrl}/login`, value, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        // Check if email contains @menternship.com
        const isMentor = value.email.includes("@menternship.com");

        // Store user role in localStorage
        localStorage.setItem("userRole", isMentor ? "mentor" : "student");

        alert("Login successful!");

        // Redirect based on user role
        navigate(isMentor ? "/mentor-dashboard" : "/UserDashboard");
      } else {
        setLoginError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login Failed:", err.response?.data || err.message);
      setLoginError(err.response?.data?.error || "Invalid email or password.");
    }
  };

  return (
    <motion.div
      className="w-full h-screen flex justify-center items-center text-black"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full sm:w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto flex flex-col bg-transparent border-2 border-violet-200 rounded-2xl items-center p-5 text-black">
        <form onSubmit={handleSubmit} className="w-full">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 pb-2 via-purple-500 to-pink-500 pb-2 bg-clip-text text-transparent"
          >
            Login Now
          </motion.h1>

          {loginError && (
            <p className="text-red-500 text-center">{loginError}</p>
          )}

          <div className="flex flex-col mt-3 space-y-4 w-full">
            <div>
              <motion.input
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  transition: {
                    delay: 0, // delay before hover animation
                    duration: 0.2,
                  },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: {
                    delay: 0, // delay before hover animation
                    duration: 0.2,
                  },
                }}
                transition={{ type: "spring", stiffness: 300 }}
                type="email"
                name="email"
                value={value.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="py-2 px-7 bg-gray-300 rounded-2xl w-full"
                required
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div>
              <motion.input
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  transition: {
                    delay: 0, // delay before hover animation
                    duration: 0.2,
                  },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: {
                    delay: 0, // delay before hover animation
                    duration: 0.2,
                  },
                }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                type="password"
                name="password"
                value={value.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="py-2 px-7 bg-gray-300 rounded-2xl w-full"
                required
              />
              {errors.password && (
                <span className="text-red-500">{errors.password}</span>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                transition: {
                  delay: 0, // delay before hover animation
                  duration: 0.2,
                },
              }}
              whileTap={{
                scale: 0.95,
                transition: {
                  delay: 0, // delay before hover animation
                  duration: 0.2,
                },
              }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              className="w-full text-left ml-2 text-sm"
            >
              <NavLink
                to="/ForgotPassword"
                className="text-blue-500 cursor-pointer"
              >
                Forgot Password?
              </NavLink>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                transition: {
                  delay: 0, // delay before hover animation
                  duration: 0.2,
                },
              }}
              whileTap={{
                scale: 0.95,
                transition: {
                  delay: 0, // delay before hover animation
                  duration: 0.2,
                },
              }}
              transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
              type="submit"
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-xl py-2 px-10 rounded-4xl text-center w-full cursor-pointer"
            >
              Login
            </motion.button>

            <motion.div
              className="w-full text-left text-sm ml-2 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
            >
              Don't have an account?{" "}
              <NavLink
                to="/Register"
                className="text-blue-500 cursor-pointer inline-block"
              >
                <span className="font-arial underline">Register here</span>
              </NavLink>
            </motion.div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
