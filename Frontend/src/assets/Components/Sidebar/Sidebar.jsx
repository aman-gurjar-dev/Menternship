
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ routeMap, activeTab, setActiveTab }) => {
  return (
    <motion.aside 
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="w-64 text-black font-bold p-6 space-y-6 shadow-lg h-screen fixed"
    >
      <nav>
        <ul className="space-y-4">
          {Object.entries(routeMap).map(([name, path]) => (
            <motion.li key={name} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <NavLink
                to={path}
                onClick={() => setActiveTab(path)}
                className={`block py-2 px-4 rounded-md hover:bg-red-600 transition-all ${
                  activeTab === path ? "bg-red-700 text-white font-extrabold" : ""
                }`}
              >
                {name}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;