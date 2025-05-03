import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
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
      const res = await axios.post(`${config.backendUrl}/login`, value, { headers: { "Content-Type": "application/json" } });

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
    <div className="w-full h-screen flex justify-center items-center text-black">
      <div className="w-full sm:w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto flex flex-col bg-transparent border-2 border-violet-200 rounded-2xl items-center p-5 text-black">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-3 bg-clip-text text-transparent">
            Login Now
          </h1>

          {loginError && <p className="text-red-500 text-center">{loginError}</p>}

          <div className="flex flex-col space-y-4 w-full">
            <div>
              <input
                type="email"
                name="email"
                value={value.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="py-2 px-7 bg-gray-300 rounded-2xl w-full"
                required
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={value.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="py-2 px-7 bg-gray-300 rounded-2xl w-full"
                required
              />
              {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>

            <div className="w-full text-left text-sm">
              <NavLink to="/ForgotPassword" className="text-blue-500 cursor-pointer">
                Forgot Password?
              </NavLink>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-xl py-2 px-10 rounded-4xl text-center w-full cursor-pointer"
            >
              Login
            </button>

            <div className="w-full text-left text-sm text-white">
              Don't have an account? {" "}
              <NavLink to="/Register" className="text-blue-500 cursor-pointer inline-block">
                <span className="font-arial underline">Register here</span>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;