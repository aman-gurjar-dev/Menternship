import React from "react";
import MyImage from "../../Images/logo.png";

import { NavLink } from "react-router-dom";
export const Navbar = () => {
  return (
    <>
      <div className=" mt-2">
        <img
          src={MyImage}
          alt=" LOGO "
          className=" lg:max-w-[9vw] ml-0 sm:ml-15 mt-4 inline w-20"
        />
        <ul className=" sm:ml-[12vw] ml-[5vw] mt-[5vh] w-auto list-none inline relative z-100">
          <li className="inline-block mx-[3vw]">
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
          </li>
          <li className="inline-block mx-[3vw]">
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
          </li>

          <li className="inline-block mx-[3vw] ">
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
          </li>
        </ul>
      </div>
    </>
  );
};
