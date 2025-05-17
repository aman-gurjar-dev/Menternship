import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const MotionNavLink = motion(NavLink);

const Explore_now = () => {
  const location = useLocation();
  const path = location.pathname;

  const getHeading = () => {
    switch (path) {
      case "/Explore_now":
        return "Web Development";
      case "/Explore_ai":
        return "Artificial Intelligence";
      case "/Explore_ds":
        return "Data Science";
      default:
        return "Web Development";
    }
  };

  return (
    <>
      <motion.div
        className="min-h-screen relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        {/* Content */}
        <motion.div
          className="flex justify-center mt-[5vh] sm:mt-[10vh] px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-full max-w-4xl bg-[#be75bf13] shadow rounded-xl p-4 sm:p-6">
            <h1 className="text-center text-xl sm:text-2xl font-bold mt-4">
              {getHeading()}
            </h1>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mt-[3vh] sm:mt-[5vh] ml-[2vw] sm:ml-[5vw]">
              What We Provide:
            </h1>
            <ul className="ml-[2vw] sm:ml-[5vw] mt-[2vh] text-sm sm:text-base lg:text-xl space-y-2 sm:space-y-3">
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <h1 className="text-[#9755B8] inline">
                  1:1 Mentorship Support :
                </h1>
                <span>Get personalized guidance from industry experts.</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <h1 className="text-[#9755B8] inline">Interview Prep :</h1>
                <span>
                  Practice real interview questions and coding challenges.
                </span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <h1 className="text-[#9755B8] inline">
                  Internship Opportunities :
                </h1>
                <span>Gain hands-on experience with top companies.</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <h1 className="text-[#9755B8] inline">Live Project Ideas :</h1>
                <span>
                  Work on real-world projects to build your portfolio.
                </span>
              </li>
            </ul>

            <div className="flex justify-center items-center mt-8 sm:mt-12">
              <MotionNavLink
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.95, opacity: 0.8 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ transformOrigin: "center" }}
                to="/login"
                className="bg-[#e3a7eb4c] py-2 px-6 sm:px-[10vw] rounded-4xl text-lg sm:text-xl font-semibold hover:bg-[#e3a7eb60] transition-colors duration-300 cursor-pointer relative z-20"
              >
                Join us now
              </MotionNavLink>
            </div>
          </div>
        </motion.div>

        {/* Menternship means opportunity */}
        <div className="invisible md:visible">
          <span className="absolute -top-35  lg:right-10 right-3 rounded-full bg-[#1a171e7b] px-8 lg:px-15 md:text-sm xl:text-xl text-center font-semibold lg:text-xl text-[#FFFFFF] z-10 p-2 m-auto">
            Menternship{" "}
            <p className="inline text-[#7A42B5] relative z-11">Means</p> <br />{" "}
            Opportunity
          </span>
        </div>

        {/* footer */}
        <footer className="absolute bottom-0 bg-[#5f307b14] w-full text-center p-5 font-semibold text-sm">
          © 2025 MENTERNSHIP. All rights reserved.
        </footer>
      </motion.div>
    </>
  );
};

export default Explore_now;
