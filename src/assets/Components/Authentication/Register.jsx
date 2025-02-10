import React from "react";
import effect from "../../Images/Ellipse 1.png";
import MyImage from "../../Images/logo.png";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-full h-screen bg-[#1A171E] flex justify-center items-center relative overflow-hidden px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-lg xl:max-w-lg h-auto max-h-[90%] bg-transparent border-2 border-violet-200 rounded-2xl p-6 flex flex-col items-center relative z-10 overflow-y-auto">
        <img
          src={MyImage}
          alt="LOGO"
          className="w-16 sm:w-20 md:w-24 lg:w-24"
        />

        <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-2 bg-clip-text text-transparent">
          Register Now
        </h1>

        <div className="flex flex-col space-y-4 items-center w-full px-4">
          <input
            type="text"
            placeholder="User Name"
            className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center text-xs sm:text-sm md:text-base"
          />
          <input
            type="email"
            placeholder="Enter email"
            className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center text-xs sm:text-sm md:text-base"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center text-xs sm:text-sm md:text-base"
          />
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center text-xs sm:text-sm md:text-base"
          />
          <NavLink
            to="/OTP"
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm sm:text-base md:text-lg lg:text-xl py-2 px-6 rounded-2xl mt-2 w-full text-center"
          >
            Register Now
          </NavLink>
        </div>

        <h1 className="text-white text-xs sm:text-sm md:text-base">
          Have an account?{" "}
          <NavLink to="/Login" className="text-blue-400">
            Login
          </NavLink>
        </h1>
      </div>

      <div className="absolute bottom-0 left-0 z-0 w-full h-full">
        <img
          src={effect}
          alt="Effect"
          className="absolute max-w-4xl -bottom-96 -left-96 sm:-left-90 z-0"
        />
        <img
          src={effect}
          alt="Effect"
          className="absolute max-w-5xl -bottom-96 -right-96 sm:-right-90 z-0"
        />
      </div>
    </div>
  );
};

export default Register;
