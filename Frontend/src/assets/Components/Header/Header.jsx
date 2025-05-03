import React from "react";
import { motion } from "framer-motion";

const Header = ({ username }) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="bg-gray-800 text-white p-4 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Menternship</h1>
        </div>
        <div className="hidden md:block">
          <p className="text-lg">
            Welcome, <span className="font-bold">{username}</span>
          </p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 