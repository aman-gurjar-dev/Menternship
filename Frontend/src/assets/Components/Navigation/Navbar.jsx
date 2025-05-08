import React from "react";
import MyImage from "../../Images/logo.png";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
export const Navbar = () => {
  return (
    <>
      <motion.div className=" mt-2" 
        initial={{opacity: 0, y: -50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5 , ease:"anticipate"}}
      >
        <motion.img
          
          animate={{opacity: 1, rotate: 360 }}
          transition={{duration: 1 , ease:"anticipate", delay: 0.5}}
          src={MyImage}
          alt=" LOGO "
          className=" lg:max-w-[9vw] ml-0 sm:ml-15 mt-4 inline w-20"
        />
        <ul className=" sm:ml-[12vw] ml-[5vw] mt-[5vh] w-auto list-none inline relative z-100">
          <motion.li className="inline-block mx-[3vw]" 
          initial={{scale:0.5}}
          animate={{scale:1}}
          transition={{duration: 0.3 , ease:"anticipate", delay: 0.5}}
          >
            {" "}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-200 font-bold border-b-2 border-blue-200"
                  : "text-white"
              }
            >
              Home
            </NavLink>
          </motion.li>
          <motion.li className="inline-block mx-[3vw]" initial={{scale:0.5}}
          animate={{scale:1}}
          transition={{duration: 0.3 , ease:"anticipate", delay: 0.5}}>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-200 font-bold border-b-2 border-blue-200"
                  : "text-white"
              }
            >
              About
            </NavLink>
          </motion.li>

          <motion.li className="inline-block mx-[3vw] "
          initial={{scale:0.5}}
          animate={{scale:1}}
          transition={{duration: 0.3 , ease:"anticipate", delay: 0.5}}>
            <NavLink
              to="/Contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-200 font-bold border-b-2 border-blue-200"
                  : "text-white"
              }
            >
              Contact
            </NavLink>
          </motion.li>
        </ul>
      </motion.div>
    </>
  );
};
