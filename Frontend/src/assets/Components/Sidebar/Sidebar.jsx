import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = ({ routeMap, activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md text-white"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: isMobile ? -300 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isMobile ? -300 : 0, opacity: 0 }}
            transition={{ duration: 0.3 , ease:"anticipate"}}
            className={`w-64 text-white font-bold p-6 space-y-6 shadow-lg h-screen fixed bg-gray-800 z-50 ${
              isMobile ? "top-0 left-0" : ""
            }`}
          >
            <nav>
              <ul className="space-y-4">
                {Object.entries(routeMap).map(([name, path]) => (
                  <motion.li key={name} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 , ease:"anticipate"}}>
                    <NavLink
                      to={path}
                      onClick={() => {
                        setActiveTab(path);
                        if (isMobile) {
                          setIsOpen(false);
                        }
                      }}
                      className={`block py-2 px-4 rounded-md hover:bg-gray-700 transition-all ${
                        activeTab === path ? "bg-gray-900 text-white font-extrabold" : ""
                      }`}
                    >
                      {name}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;