import React from "react";
import Web_dev from "../../Images/Untitled design (1) 1.png";
import ai from "../../Images/ai.png";
import ds from "../../Images/data-science-analyzing-interpreting-complex-data-projection-virtual-screen-business-technology-concept-data-science-347778743 1.png";
import { NavLink } from "react-router-dom";

const Explore = () => {
  return (
    <div>
      <main className="w-60 sm:w-auto relative z-10 mb-25 sm:mb-0 ml-10 sm:ml-0">
        <div className="h-[60vh] sm:h-auto overflow-y-auto sm:overflow-visible scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <section className="flex flex-col sm:flex-row sm:justify-evenly items-center justify-center space-y-8 py-4">
            <div className="flex flex-col relative sm:left-0">
              <img src={Web_dev} alt="Web dev" className="w-54" />
              <NavLink
                to="/Explore_web"
                className="p-2 px-7 rounded-3xl bg-[#e3a7eb17] text-center mt-5 relative z-20"
              >
                Explore More
              </NavLink>
            </div>
            <div className="flex flex-col relative sm:left-0">
              <img src={ai} alt="AI" className="w-54" />
              <NavLink
                to="/Explore_ai"
                className="p-2 px-7 rounded-3xl bg-[#e3a7eb17] text-center mt-5 relative z-20"
              >
                Explore More
              </NavLink>
            </div>
            <div className="flex flex-col relative sm:left-0 sm:bottom-4 z-20">
              <img src={ds} alt="Data Science" className="w-50" />
              <NavLink
                to="/Explore_ds"
                className="p-2 px-7 rounded-3xl bg-[#e3a7eb17] text-center mt-5"
              >
                Explore More
              </NavLink>
            </div>
          </section>
        </div>
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
    </div>
  );
};

export default Explore;
