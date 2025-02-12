import React, { useState } from "react";
import effect from "../../Images/Ellipse 1.png";
import MyImage from "../../Images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import RegisterValidation from "./RegisterValidation";

const Register = () => {
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPass, setConfirmPass] = useState(""); // Fixed spelling
  const [Errors, setErrors] = useState({}); // Ensured Errors is an object
  const navigate = useNavigate();
  let handleSubmit = (event) => {
    event.preventDefault();
    let form = {
      Name: Name,
      Email: Email,
      Password: Password,
      ConfirmPass: ConfirmPass, // Fixed spelling
    };

    let x = RegisterValidation(form);
    setErrors(x || {}); // Ensures Errors is always an object

    if (Object.keys(Errors).length === 0) {
      navigate("/OTP");
    }
  };

  return (
    <div className="w-full h-screen  flex justify-center items-center relative z-10 overflow-hidden px-4">
      <div className="w-full max-w-lg h-auto max-h-[90%] bg-transparent border-2 border-violet-200 rounded-2xl p-6 flex flex-col items-center relative z-10 overflow-y-auto">
        <img src={MyImage} alt="LOGO" className="w-24" />

        <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-2 bg-clip-text text-transparent">
          Register Now
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4 text-black items-center w-full px-4">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="User Name"
              className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center text-sm"
            />
            {Errors?.Name && (
              <span className="text-red-200">{Errors.Name}</span>
            )}{" "}
            {/* Fixed error handling */}
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center text-sm"
            />
            {Errors?.Email && (
              <span className="text-red-200">{Errors.Email}</span>
            )}{" "}
            {/* Fixed error handling */}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center text-sm"
            />
            {Errors?.Password && (
              <span className="text-red-200">{Errors.Password}</span>
            )}{" "}
            {/* Fixed error handling */}
            <input
              type="password"
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm your password"
              className="w-full py-2 px-4 bg-gray-300 rounded-2xl text-center text-sm"
            />
            {Errors?.ConfirmPass && (
              <span className="text-red-200">{Errors.ConfirmPass}</span>
            )}{" "}
            {/* Fixed spelling */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg py-2 px-6 rounded-2xl mt-2 w-full text-center"
            >
              Register Now
            </button>
          </div>

          <h1 className="text-white text-sm">
            Have an account?{" "}
            <NavLink to="/Login" className="text-blue-400">
              Login
            </NavLink>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Register;
