import React from "react";
import MyImage from "../Images/logo.png";
import effect from "../Images/Ellipse 1.png";
import { NavLink } from "react-router-dom";

const Contact_us = () => {
  return (
    <>
      <div className="h-screen bg-[#1A171E] text-white min-w-screen relative overflow-hidden">
        <div className=" mt-2">
          <img
            src={MyImage}
            alt=" LOGO "
            className=" max-w-35 ml-15 mt-4 inline "
          />
          <ul class=" ml-70 mt-5 w-auto list-none inline relative z-10">
            <li class="inline-block mx-9">
              {" "}
              <NavLink
                to="/"
                className=" font-bold hover:text-xl hover:font-bold"
              >
                Home
              </NavLink>
            </li>
            <li class="inline-block mx-9">
              <NavLink
                to="/About"
                className=" font-bold hover:text-xl hover:font-bold"
              >
                About
              </NavLink>
            </li>
            <li class="inline-block mx-9 ">
              <NavLink to="/Contact" className=" hover:text-xl font-bold">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="">
          <img
            src={effect}
            alt="Effect"
            className="absolute max-w-4xl -bottom-96 -left-90 z-0"
          />
          <img
            src={effect}
            alt="Effect"
            className="absolute max-w-5xl -bottom-96 -right-90 z-0"
          />
        </div>
      </div>
    </>
  );
};

export default Contact_us;
