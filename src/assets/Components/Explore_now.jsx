import React from "react";
import MyImage from "../Images/logo.png";
import effect from "../Images/Ellipse 1.png";
import { NavLink } from "react-router-dom";

const Explore_now = () => {
  return (
    <>
      <div className="min-h-screen sm:h-screen bg-[#1A171E] text-white min-w-screen relative overflow-hidden">
        {/* Navbar */}
        <div className=" mt-2">
          <img
            src={MyImage}
            alt=" LOGO "
            className=" lg:max-w-[9vw] ml-0 sm:ml-15 mt-4 inline w-20"
          />
          <ul className=" sm:ml-[12vw] ml-[5vw] mt-[5vh] w-auto list-none inline relative z-10">
            <li className="inline-block mx-[3vw]">
              {" "}
              <NavLink to="/" className=" hover:text-xl hover:font-bold">
                Home
              </NavLink>
            </li>
            <li className="inline-block mx-[3vw]">
              <NavLink to="/About" className="hover:text-xl hover:font-bold">
                About
              </NavLink>
            </li>
            <li className="inline-block mx-[3vw] ">
              <NavLink
                to="/Contact"
                className="hover:text-xl active:font-bold "
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Content */}
        <div className="flex justify-center mt-[10vh] ">
          <div className=" w-[80vw] md:h-[50vh] h-auto bg-[#be75bf13] shadow rounded-xl">
            <h1 className="text-center text-xl font-bold mt-4">
              Web Development
            </h1>

            <h1 className="md:text-2xl lg:text-3xl text-xl font-semibold mt-[5vh] ml-[5vw] ">
              What We Provide:
            </h1>
            <ul className="ml-[5vw] mt-[2vh] lg:text-xl text-sm">
              <li>
                <h1 className="text-[#9755B8] inline">
                  1:1 Mentorship Support :
                </h1>{" "}
                Get personalized guidance from industry experts.
              </li>
              <li>
                <h1 className="text-[#9755B8] inline">Interview Prep :</h1>{" "}
                Practice real interview questions and coding challenges.
              </li>
              <li>
                <h1 className="text-[#9755B8] inline">
                  Internship Opportunities :
                </h1>{" "}
                Gain hands-on experience with top companies.
              </li>
              <li>
                <h1 className="text-[#9755B8] inline">Live Project Ideas :</h1>{" "}
                Work on real-world projects to build your portfolio.
              </li>
            </ul>

            <div className=" flex justify-center items-center">
              <NavLink
                to="/Chat_now"
                className="bg-[#e3a7eb4c] py-2 rounded-4xl text-xl font-semibold sm:mt-[6vh] my-20 px-[10vw] cursor-pointer relative z-20"
              >
                Join us now
              </NavLink>
            </div>
          </div>
        </div>
        {/* Menternship means opportunity */}
        <div className="invisible md:visible">
          <span className=" absolute top-4 lg:right-10 right-3 rounded-full bg-[#1a171e7b] px-12   lg:px-15 md:text-sm xl:text-xl text-center  font-semibold lg:text-xl text-[#FFFFFF] z-10  p-2 m-auto ">
            Menternship{" "}
            <p className="inline text-[#7A42B5] relative z-11"> Means</p> <br />{" "}
            Opportunity
          </span>
        </div>

        {/* footer  */}
        <footer className=" absolute bottom-0 bg-[#5f307b14] w-[100vw] text-center p-5  font-semibold text-sm ">
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

export default Explore_now;
