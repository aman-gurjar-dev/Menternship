import React from "react";
import effect from "../../Images/Ellipse 1.png";
import MyImage from "../../Images/logo.png";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="w-full h-screen bg-[#1A171E] flex justify-center items-center relative overflow-hidden">
        <div className="w-full sm:w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto flex flex-col bg-transparent border-2 border-violet-200 rounded-2xl items-center space-y-6 sm:space-y-5 p-5 relative z-10">
          <img
            src={MyImage}
            alt="LOGO"
            className="lg:max-w-[9vw] sm:ml-15 mt-5 inline w-30"
          />

          <h1 className="text-center text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-3 bg-clip-text text-transparent">
            Login Now
          </h1>

          <div className="flex flex-col space-y-4 w-full">
            <input
              type="text"
              placeholder="Enter User Name / Email"
              className="py-2 px-7 bg-gray-300 rounded-2xl w-full"
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="py-2 px-7 bg-gray-300 rounded-2xl w-full"
            />

            <NavLink className="text-blue-400 text-sm sm:text-base ml-3">
              Forget Password
            </NavLink>

            <NavLink
              to="/"
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-xl py-2 px-10 sm:px-15 rounded-4xl text-center"
            >
              Login
            </NavLink>
          </div>

          <h1 className="text-white text-sm sm:text-base mt-4">
            Don't have an account?{" "}
            <NavLink to="/Register" className="text-blue-400">
              Register
            </NavLink>
          </h1>
        </div>

        {/* Background effect images */}
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
    </>
  );
};

export default Login;
