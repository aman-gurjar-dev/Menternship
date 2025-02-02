import React from "react";
import MyImage from "../Images/logo.png";
import effect from "../Images/Ellipse 1.png";
import Web_dev from "../Images/Untitled design (1) 1.png";
import ai from "../Images/ai.png";
import ds from "../Images/data-science-analyzing-interpreting-complex-data-projection-virtual-screen-business-technology-concept-data-science-347778743 1.png";
// import { NavLink } from "react-router-dom";

import { NavLink } from "react-router-dom";

const Explore = () => {
  return (
    <>
      <div className="h-screen bg-[#1A171E] text-white min-w-screen relative overflow-hidden">
        <div className=" mt-2">
          <img
            src={MyImage}
            alt=" LOGO "
            className=" max-w-[9vw] ml-15 mt-4 inline "
          />
          <ul class=" ml-[12vw] mt-[5vh] w-auto list-none inline relative z-10">
            <li class="inline-block mx-[3vw]">
              {" "}
              <NavLink to="/" className="  hover:text-xl hover:font-bold">
                Home
              </NavLink>
            </li>
            <li class="inline-block mx-[3vw]">
              <NavLink to="/About" className="hover:text-xl hover:font-bold">
                About
              </NavLink>
            </li>
            <li class="inline-block mx-[3vw] ">
              <NavLink
                to="/Contact"
                className=" hover:text-xl active:font-bold "
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className=" flex justify-evenly mt-10 relative z-10">
          <span className=" flex flex-col">
            <img src={Web_dev} alt=" Web dev" />
            <NavLink
              to="/Explore_web"
              className=" p-2 px-7 rounded-3xl bg-[#e3a7eb17] text-center mt-5"
            >
              {"Explore More"}
            </NavLink>
          </span>
          <span className=" flex flex-col">
            <img src={ai} alt=" Web dev" />
            <NavLink
              to="/Explore_ai"
              className=" p-2 px-7 rounded-3xl bg-[#e3a7eb17] text-center mt-5 "
            >
              {"Explore More"}
            </NavLink>
          </span>
          <span className=" flex flex-col">
            <img src={ds} alt=" Web dev" />
            <NavLink
              to="/Explore_ds"
              className=" p-2 px-7 rounded-3xl bg-[#e3a7eb17] text-center mt-5"
            >
              {"Explore More"}
            </NavLink>
          </span>
        </div>
        <span className=" absolute top-7 right-10 rounded-full bg-[#1a171e7b] w-[25vw] h-[15vh]  text-center font-semibold text-3xl text-[#FFFFFF] z-10  p-2 m-auto ">
          Menternship{" "}
          <p className="inline text-[#7A42B5] relative z-11"> Means</p> <br />{" "}
          Opportunity
        </span>
        <footer className=" absolute bottom-0 bg-[#5f307b14] w-[100vw] text-center p-5 text-xl font-semibold ">
          © 2025 MENTERNSHIP. All rights reserved.
        </footer>

        <div className="">
          <img
            src={effect}
            alt="Effect"
            className="absolute max-w-4xl -top-90 -right-90 z-0"
          />
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

export default Explore;
