import React from "react";
import MyImage from "../../Images/logo.png";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <motion.div
        className="mt-2"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.img
          animate={{ opacity: 1, rotate: 360 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.5 }}
          src={MyImage}
          alt="LOGO"
          className="lg:max-w-[9vw] ml-0 sm:ml-15 mt-4 inline w-20"
        />
        <ul className="sm:ml-[12vw] ml-[5vw] mt-[5vh] w-auto list-none inline relative z-100">
          {["Home", "About", "Contact"].map((item, index) => (
            <motion.li
              key={item}
              className="inline-block mx-[3vw]"
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: "easeInOut",
                  delay: index * 0.2,
                },
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              whileHover={{
                scale: 1.2,
                color: "#60A5FA",
                transition: { duration: 0.2, delay: 0.1 },
              }}
              whileTap={{
                scale: 0.9,
                transition: { duration: 0.2, delay: 0.1 },
              }}
            >
              <NavLink
                to={`/${item === "Home" ? "" : item}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-200 font-bold border-b-2 border-blue-200"
                    : "text-white"
                }
              >
                {item}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};
