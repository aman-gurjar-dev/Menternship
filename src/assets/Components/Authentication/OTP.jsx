import React, { useState } from "react";
import effect from "../../Images/Ellipse 1.png";
import MyImage from "../../Images/logo.png";
import { NavLink } from "react-router-dom";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(0, 1); // Allow only 1 character per input
    setOtp(updatedOtp);

    // Move focus to the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
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

          <h1 className="text-center text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-3 bg-clip-text text-transparent">
            Enter OTP
          </h1>

          <div className="flex space-x-4 w-full justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-300 rounded-2xl"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <div className="flex flex-col items-center space-y-4 mt-6">
            <NavLink
              to="/"
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-xl py-2 px-10 sm:px-15 rounded-4xl"
            >
              Verify OTP
            </NavLink>
          </div>

          <h1 className="text-white text-sm sm:text-base mt-4">
            Didn’t receive OTP?{" "}
            <NavLink to="/Resend" className="text-blue-400">
              Resend OTP
            </NavLink>
          </h1>
        </div>

        {/* Background effect images */}
      </div>
    </>
  );
};

export default OTP;
