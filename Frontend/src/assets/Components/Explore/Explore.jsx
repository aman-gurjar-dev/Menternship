import React from "react";
import Web_dev from "../../Images/Untitled design (1) 1.png";
import ai from "../../Images/ai.png";
import ds from "../../Images/data-science-analyzing-interpreting-complex-data-projection-virtual-screen-business-technology-concept-data-science-347778743 1.png";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Explore = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#1A171E] to-[#2a1f2e]">
      <motion.main
        className="w-full px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-6 pt-6"
          initial={{ opacity: 0, scale: 0.5, x: -100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: 100 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore Our Programs
        </motion.h1>

        <div className="h-[80vh] sm:h-auto overflow-y-auto sm:overflow-visible px-2 py-4 sm:px-0 rounded-lg backdrop-blur-md scrollbar-thin scrollbar-thumb-[#9b59b6] scrollbar-track-transparent">
          <section className="flex flex-col sm:flex-row sm:justify-evenly items-center justify-center gap-12">
            {/* Web Development */}
            <motion.div
              className="flex flex-col items-center w-full sm:w-auto max-w-xs transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{
                duration: 0.3,
                type: "spring",
                delay: 0.1,
                ease: "easeInOut",
              }}
            >
              <div className="bg-[#2a1f2e] p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={Web_dev}
                  alt="Web dev"
                  className="w-full sm:w-64 rounded-lg"
                />
                <div className="mt-4 text-center">
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    Web Development
                  </h2>
                  <NavLink
                    to="/Explore_now"
                    className="inline-block p-2 px-7 rounded-3xl bg-[#e3a7eb17] hover:bg-[#e3a7eb30] text-white transition-colors duration-300"
                  >
                    Explore More
                  </NavLink>
                </div>
              </div>
            </motion.div>

            {/* Artificial Intelligence */}
            <motion.div
              className="flex flex-col items-center w-full sm:w-auto max-w-xs transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{
                duration: 0.3,
                delay: 0.3,
                type: "spring",
                ease: "easeInOut",
              }}
            >
              <div className="bg-[#2a1f2e] p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src={ai} alt="AI" className="w-full sm:w-64 rounded-lg" />
                <div className="mt-4 text-center">
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    Artificial Intelligence
                  </h2>
                  <NavLink
                    to="/Explore_ai"
                    className="inline-block p-2 px-7 rounded-3xl bg-[#e3a7eb17] hover:bg-[#e3a7eb30] text-white transition-colors duration-300"
                  >
                    Explore More
                  </NavLink>
                </div>
              </div>
            </motion.div>

            {/* Data Science */}
            <motion.div
              className="flex flex-col items-center w-full sm:w-auto max-w-xs transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 0.95, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{
                duration: 0.3,
                delay: 0.5,
                type: "spring",
                ease: "easeInOut",
              }}
            >
              <div className="bg-[#2a1f2e] p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={ds}
                  alt="Data Science"
                  className="w-full sm:w-64 rounded-lg"
                />
                <div className="mt-4 text-center">
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    Data Science
                  </h2>
                  <NavLink
                    to="/Explore_ds"
                    className="inline-block p-2 px-7 rounded-3xl bg-[#e3a7eb17] hover:bg-[#e3a7eb30] text-white transition-colors duration-300"
                  >
                    Explore More
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </motion.main>

      {/* Mentorship Means Opportunity */}
      <motion.aside className="invisible md:visible">
        <motion.div
          className="absolute -top-10 lg:right-10 right-3 rounded-full bg-[#1a171e7b] px-6 lg:px-15 text-sm xl:text-xl text-center font-semibold text-[#FFFFFF] z-10 p-2 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.5, x: -100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: 100 }}
          transition={{ duration: 0.5 }}
        >
          Menternship <span className="inline text-[#7A42B8]">Means</span>{" "}
          <br /> Opportunity
        </motion.div>
      </motion.aside>

      {/* Footer */}
      <footer className="absolute bottom-0 bg-[#5f307b14] w-full text-center p-5 text-sm font-semibold backdrop-blur-sm">
        © 2025 MENTERNSHIP. All rights reserved.
      </footer>
    </div>
  );
};

export default Explore;
