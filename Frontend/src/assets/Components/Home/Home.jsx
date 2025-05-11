import React from "react";
import MyImage from "../../Images/logo.png";
import photo1 from "../../Images/Rectangle 4.png";
import photo2 from "../../Images/Rectangle 2.png";
import photo3 from "../../Images/Rectangle 6.png";
import photo4 from "../../Images/Rectangle 5.png";
import photo5 from "../../Images/Rectangle 3.png";
import photo6 from "../../Images/Rectangle 7.png";
import { motion } from "framer-motion";
// import effect from "../../Images/Ellipse 1.png";
import { NavLink } from "react-router-dom";

const MotionNavLink = motion(NavLink);
const Home = () => {
  return (
    <div className=" ml-5">
      <motion.main
        className=" relative z-10 "
        initial={{ opacity: 0, x: -300, scale: 0.5 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -300, scale: 0.5 }}
        transition={{ duration: 1, ease: "anticipate" }}
      >
        <section className="mt-[7vh] sm:ml-[10vw] ml-3">
          <h1 className="text-2xl sm:text-5xl font-bold">Guiding Ambitions,</h1>
          <h1 className="text-2xl sm:text-5xl font-bold">
            Building <span className="text-[#3759D3]">Careers</span>
          </h1>
          <h2 className="sm:text-xl mt-3">
            Where Mentorship Meets Opportunity.
          </h2>
        </section>

        <section className="mt-[6vh] sm:ml-[10vw] ml-3">
          <div className="mb-[1vh]">
            <MotionNavLink
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95, opacity: 0.8 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => handleClick("/Login")}
              to="/Login"
              className="bg-[#477CD6] p-1 sm:px-16 px-7 rounded-3xl mr-5 mb-5 font-bold"
            >
              Start Today
            </MotionNavLink>

            <MotionNavLink
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95, opacity: 0.8 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              onClick={() => handleClick("/Login")}
              to="/Register"
              className="bg-[#FFF5F5] text-black p-1 sm:px-16 px-7 rounded-3xl font-bold"
            >
              Register
            </MotionNavLink>
          </div>

          <div className="mt-8">
            <MotionNavLink
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95, opacity: 0.8 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              onClick={() => handleClick("/Login")}
              to="/Explore_more"
              className="bg-[#D68F47] text-black rounded-3xl sm:px-41 sm:py-3 px-23 py-3 font-bold"
            >
              Explore More
            </MotionNavLink>
          </div>
        </section>
      </motion.main>

      <motion.aside
        className="absolute right-0 top-0 min-h-full z-10 w-0 lg:w-auto"
        initial={{ opacity: 0, x: 100, scale: 0.5 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.5 }}
        transition={{ duration: 0.5, ease: "anticipate" }}
      >
        <motion.img
          initial={{ opacity: 0, y: 100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.5 }}
          transition={{ duration: 0.5, delay: 0, ease: "anticipate" }}
          src={photo1}
          alt="Photo 1"
          className="max-h-[50vh] relative top-[5vh] right-80 xl:right-90"
        />
        <motion.img
          initial={{ opacity: 0, y: 100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "anticipate" }}
          src={photo2}
          alt="Photo 2"
          className="absolute -top-0 right-45 max-h-[53vh] xl:right-50"
        />
        <motion.img
          initial={{ opacity: 0, y: 100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "anticipate" }}
          src={photo3}
          alt="Photo 3"
          className="absolute top-[5vh] max-h-[54vh] right-10"
        />
        <motion.img
          initial={{ opacity: 0, y: -100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.5 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "anticipate" }}
          src={photo4}
          alt="Photo 4"
          className="absolute bottom-0 right-80 max-h-[40vh] xl:right-90"
        />
        <motion.img
          initial={{ opacity: 0, y: -100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.5 }}
          transition={{ duration: 0.9, delay: 0.7, ease: "anticipate" }}
          src={photo5}
          alt="Photo 5"
          className="absolute bottom-0 right-45 max-h-[51vh] xl:right-50"
        />
        <motion.img
          initial={{ opacity: 0, y: -100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.5 }}
          transition={{ duration: 1, delay: 0.8, ease: "anticipate" }}
          src={photo6}
          alt="Photo 6"
          className="absolute bottom-0 max-h-[38vh] right-10"
        />
      </motion.aside>
    </div>
  );
};
export default Home;
