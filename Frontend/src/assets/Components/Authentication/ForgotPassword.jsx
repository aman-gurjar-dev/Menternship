import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import effect from "../../Images/Ellipse 1.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`A reset link has been sent to ${email}`);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center relative z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full sm:w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto flex flex-col bg-transparent border-2 border-violet-200 rounded-2xl items-center space-y-6 sm:space-y-5 p-5 relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-3 bg-clip-text text-transparent text-center"
        >
          Forgot Password
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full flex flex-col items-center space-y-4"
        >
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-[80%] p-3 bg-gray-300 border-none rounded-2xl text-center"
            required
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type="submit"
            className="w-[80%] p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Reset Link
          </motion.button>
        </motion.form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-green-400"
          >
            {message}
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white text-sm sm:text-base"
        >
          Remembered your password?{" "}
          <NavLink to="/login" className="text-blue-400">
            Login
          </NavLink>
        </motion.p>
      </motion.div>
    </div>
  );
}
