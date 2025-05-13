import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import config from "../../utils/config";

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

  useEffect(() => {
    setIsMentor(formData.email.includes("@menternship.com"));
  }, [formData.email]);

  useEffect(() => {
    setAlreadyRegistered(false);
    setSuccessMessage("");
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const registerUrl = isMentor
        ? `${config.backendUrl}/api/mentors/register`
        : `${config.backendUrl}/api/students/register`;

      const res = await axios.post(registerUrl, formData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", isMentor ? "mentor" : "student");

      setSuccessMessage(
        `Registration successful! Redirecting to ${
          isMentor ? "mentor" : "student"
        } dashboard...`
      );

      setTimeout(() => {
        navigate(isMentor ? "/mentor-dashboard" : "/UserDashboard");
      }, 2000);
    } catch (err) {
      console.error("Registration Failed:", err.response || err.message);
      if (
        err.response?.status === 400 &&
        err.response.data.error === "Email already exists"
      ) {
        setAlreadyRegistered(true);
      } else {
        alert(err.response?.data?.error || "Registration failed!");
      }
    }
  };

  const fields = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "username", type: "text", placeholder: "User Name" },
    { name: "email", type: "email", placeholder: "Enter email" },
    { name: "password", type: "password", placeholder: "Enter your password" },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
    },
  ];

  return (
    <motion.div
      className="w-full h-screen flex justify-center items-center relative overflow-hidden px-4 text-black"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-lg xl:max-w-lg h-auto bg-transparent border-2 border-violet-200 rounded-2xl p-6 flex flex-col items-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-2 bg-clip-text text-transparent"
        >
          Register Now
        </motion.h1>

        {isMentor && (
          <p className="text-purple-500 mb-2">Registering as a Mentor</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4  mt-3 items-center w-full px-4"
        >
          {fields.map((field, index) => (
            <motion.span
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                delay: index * 0.1,
              }}
            >
              <motion.input
                key={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center"
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
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
                required
              />
            </motion.span>
          ))}

          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}

          {alreadyRegistered && (
            <p className="text-red-500 text-xs sm:text-sm">
              User is already registered!{" "}
              <NavLink to="/Login" className="text-blue-400">
                Login here
              </NavLink>
            </p>
          )}

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              delay: fields.length * 0.1,
            }}
          >
            <motion.button
              type="submit"
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
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm sm:text-base md:text-lg lg:text-xl py-2 px-6 rounded-2xl mt-2 w-full text-center"
            >
              Register Now
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
