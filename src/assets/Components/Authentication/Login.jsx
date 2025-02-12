import React, { useState } from "react";
import effect from "../../Images/Ellipse 1.png";
import MyImage from "../../Images/logo.png";
import { NavLink } from "react-router-dom";
import Loginvalidation from "./Loginvalidation";

const Login = () => {
  const [value, setValue] = useState({
    Email: "",
    Password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  let handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      Email: email,
      Password: password,
    });

    let x = Loginvalidation(value);
    setErrors(x);
  };

  let handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  let handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="w-full h-screen  flex justify-center items-center relative z-10 overflow-hidden">
        <div className="w-full sm:w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto flex flex-col bg-transparent border-2 border-violet-200 rounded-2xl items-center space-y-6 sm:space-y-5 p-5 relative z-10">
          <img
            src={MyImage}
            alt="LOGO"
            className="lg:max-w-[9vw] mt-5 inline w-30"
          />
          <form action="" onSubmit={handleSubmit}>
            <h1 className="text-center text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-3 bg-clip-text text-transparent">
              Login Now
            </h1>

            <div className="flex flex-col space-y-4 w-full">
              <div>
                <input
                  type="text"
                  onChange={handleEmailChange}
                  placeholder="Enter User Name / Email"
                  className="py-2 px-7 bg-gray-300 rounded-2xl w-full"
                />
                {errors.Email && (
                  <spain className="text-red-200 text-sm">{errors.Email}</spain>
                )}
              </div>

              <div>
                <input
                  type="password"
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className="py-2 px-7 bg-gray-300 rounded-2xl w-full"
                />
                {errors.Password && (
                  <spain className="text-red-200">{errors.Password}</spain>
                )}
              </div>
              <NavLink
                to="/ForgotPassword"
                className="text-blue-400 text-sm sm:text-base ml-3"
              >
                Forget Password
              </NavLink>

              <button
                type="Submit"
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-xl py-2 px-10 sm:px-15 rounded-4xl text-center relative z-30"
              >
                Login
              </button>
            </div>

            <h1 className="text-white text-sm sm:text-base mt-4">
              Donot have an account?{" "}
              <NavLink to="/Register" className="text-blue-400">
                Register
              </NavLink>
            </h1>
          </form>
        </div>

        {/* Background effect images */}
      </div>
    </>
  );
};

export default Login;
