import { useState } from "react";
import { NavLink } from "react-router-dom";
import effect from "../../Images/Ellipse 1.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`A reset link has been sent to ${email}`);
  };

  return (
    <div className="w-full h-screen  flex justify-center items-center relative z-10 overflow-hidden">
      <div className="w-full sm:w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto flex flex-col bg-transparent border-2 border-violet-200 rounded-2xl items-center space-y-6 sm:space-y-5 p-5 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-3 bg-clip-text text-transparent text-center">
          Forgot Password
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center space-y-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-[80%] p-3 bg-gray-300 border-none rounded-2xl text-center"
            required
          />
          <button
            type="submit"
            className="w-[80%] p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="text-center text-green-400">{message}</p>}
        <p className="text-white text-sm sm:text-base">
          Remembered your password?{" "}
          <NavLink to="/login" className="text-blue-400">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
