// Header.js
import React from "react";
import { motion } from "framer-motion";

const Header = ({ userData, handleLogout }) => {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-white p-6 flex justify-between items-center shadow-md"
    >
      <h2 className="text-2xl font-bold">
        Welcome,<br />
        <span className="font-extrabold text-black">{userData?.name || "User"}</span>
      </h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-800 cursor-pointer"
      >
        Logout
      </button>
    </motion.header>
  );
};

export default Header;