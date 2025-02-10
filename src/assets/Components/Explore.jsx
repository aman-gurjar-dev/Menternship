import React from "react";
import MyImage from "../Images/logo.png";
import effect from "../Images/Ellipse 1.png";
import Web_dev from "../Images/Untitled design (1) 1.png";
import ai from "../Images/ai.png";
import ds from "../Images/data-science-analyzing-interpreting-complex-data-projection-virtual-screen-business-technology-concept-data-science-347778743 1.png";
import { NavLink } from "react-router-dom";

const Explore = () => {
  return (
    <div className="h-auto sm:h-screen bg-[#1A171E] text-white min-w-screen relative overflow-hidden">
      {/* Navbar */}
      <header className="mt-2 flex items-center">
        <img
          src={MyImage}
          alt="LOGO"
          className="lg:max-w-[9vw] ml-0 sm:ml-15 mt-4 w-20"
        />
        <nav className="sm:ml-[12vw] ml-[5vw] mt-[5vh] w-auto relative z-10">
          <ul className="list-none inline">
            <li className="inline-block mx-[3vw]">
              <NavLink to="/" className="hover:text-xl hover:font-bold">
                Home
              </NavLink>
            </li>
            <li className="inline-block mx-[3vw]">
              <NavLink to="/About" className="hover:text-xl hover:font-bold">
                About
              </NavLink>
            </li>
            <li className="inline-block mx-[3vw]">
              <NavLink to="/Contact" className="hover:text-xl active:font-bold">
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Content */}
      <main className="w-60 sm:w-auto mt-10 relative z-10 mb-25 sm:mb-0">
        <section className="flex flex-col sm:flex-row sm:justify-evenly items-center justify-center space-y-8">
          <div className="flex flex-col relative left-[17vw] sm:left-0 ">
            <img src={Web_dev} alt="Web dev" className="w-54" />
            <NavLink
              to="/Explore_web"
              className="p-2 px-7 rounded-3xl bg-[#e3a7eb17] text-center mt-5 relative z-20"
            >
              Explore More
            </NavLink>
          </div>
          <div className="flex flex-col relative left-[17vw] sm:left-0">
            <img src={ai} alt="AI" className="w-54" />
            <NavLink
              to="/Explore_ai"
              className="p-2 px-7 rounded-3xl bg-[#e3a7eb17] text-center mt-5 relative z-20"
            >
              Explore More
            </NavLink>
          </div>
          <div className="flex flex-col relative left-[17vw] sm:left-0 sm:bottom-4 z-20">
            <img src={ds} alt="Data Science" className="w-50" />
            <NavLink
              to="/Explore_ds"
              className="p-2 px-7 rounded-3xl bg-[#e3a7eb17] text-center mt-5"
            >
              Explore More
            </NavLink>
          </div>
        </section>
      </main>

      {/* Mentorship Means Opportunity */}
      <aside className="invisible md:visible">
        <div className="absolute top-4 lg:right-10 right-3 rounded-full bg-[#1a171e7b] px-12 lg:px-15 md:text-sm xl:text-xl text-center font-semibold lg:text-xl text-[#FFFFFF] z-10 p-2 m-auto">
          Menternship{" "}
          <span className="inline text-[#7A42B5] relative z-11">Means</span>{" "}
          <br /> Opportunity
        </div>
      </aside>

      {/* Footer */}
      <footer className="absolute bottom-0 bg-[#5f307b14] w-[100vw] text-center p-5 text-sm font-semibold">
        © 2025 MENTERNSHIP. All rights reserved.
      </footer>

      <div className="absolute max-w-4xl -top-90 -right-90 z-0">
        <img src={effect} alt="Effect" />
        <img
          src={effect}
          alt="Effect"
          className="absolute max-w-4xl -bottom-96 -left-90"
        />
        <img
          src={effect}
          alt="Effect"
          className="absolute max-w-5xl -bottom-96 -right-90"
        />
      </div>
    </div>
  );
};

export default Explore;
