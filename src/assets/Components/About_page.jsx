import React from "react";
import MyImage from "../Images/logo.png";
import effect from "../Images/Ellipse 1.png";
import sideImage from "../Images/WhatsApp_Image_2025-01-24_at_22.07.39_b8dce0b9-removebg-preview 1.png";
import { NavLink } from "react-router-dom";

const About_page = () => {
  return (
    <>
      <div className="h-screen bg-[#1A171E] text-white min-w-screen relative overflow-hidden">
        <div className=" mt-2">
          <img
            src={MyImage}
            alt=" LOGO "
            className=" lg:max-w-[9vw] ml-0 sm:ml-15 mt-4 inline w-20"
          />
          <ul class=" sm:ml-[12vw] ml-[5vw] mt-[5vh] w-auto list-none inline relative z-10">
            <li class="inline-block mx-[3vw]">
              {" "}
              <NavLink to="/" className="  hover:text-xl hover:font-bold">
                Home
              </NavLink>
            </li>
            <li class="inline-block mx-[3vw]">
              <NavLink
                to="/About"
                className="font-bold hover:text-xl hover:font-bold"
              >
                About
              </NavLink>
            </li>
            <li class="inline-block mx-[3vw] ">
              <NavLink
                to="/Contact"
                className="hover:text-xl active:font-bold "
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Menternship mean */}
        <div className="invisible md:visible">
          <span className=" absolute top-4 lg:right-10 right-3 rounded-full bg-[#1a171e7b] px-12   lg:px-15 md:text-sm xl:text-xl text-center  font-semibold lg:text-xl text-[#FFFFFF] z-10  p-2 m-auto ">
            Menternship{" "}
            <p className="inline text-[#7A42B5] relative z-11"> Means</p> <br />{" "}
            Opportunity
          </span>
        </div>
        {/* Content */}
        <div className=" sm:flex justify-baseline relative top-10">
          <img
            src={sideImage}
            alt="Side Image"
            className="  mr-20 relative bottom-10 w-0 sm:w-[45%]"
          />
          <span className=" mt-5">
            <h1 className=" text-center relative sm:right-20 right-0 text-xl lg:text-3xl font-bold">
              About <p className=" inline text-[#A24BFF] ">US</p>
            </h1>
            <p className=" text-sm md:text-xl lg:text-2xl mt-4 sm:max-w-[80%] w-auto">
              At Menternship, we’re dedicated to helping students bridge the gap
              between education and industry. <br /> <br /> We offer a unique
              combination of{" "}
              <p className=" text-[#A24BFF] inline">
                mentorship and internship opportunities,
              </p>
              giving students hands-on experience while learning from real
              industry experts.
            </p>
          </span>
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

export default About_page;
