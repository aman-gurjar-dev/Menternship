import React from "react";
import { motion } from "framer-motion"; // Importing motion from Framer Motion
import sideImage from "../../Images/WhatsApp_Image_2025-01-24_at_22.07.39_b8dce0b9-removebg-preview 1.png";

const About_page = () => {
  return (
    <>
      <div>
        {/* Menternship meaning */}
        <motion.div
          className="invisible md:visible"
          initial={{ opacity: 0, x: -60 ,y: -90 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="absolute top-4 lg:right-10 right-3 rounded-full bg-[#1a171e7b] px-12 lg:px-15 md:text-sm xl:text-xl text-center font-semibold lg:text-xl text-[#FFFFFF] z-10 p-2 m-auto">
            Menternship{" "}
            <p className="inline text-[#7A42B5] relative z-11">Means</p> <br />
            Opportunity
          </span>
        </motion.div>

        {/* Content with animation */}
        <div className="sm:flex justify-baseline relative">
          <motion.img
            src={sideImage}
            alt="Side Image"
            className="mr-20 relative bottom-10 w-0 sm:w-[45%]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.span
            className="mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-center relative sm:right-20 right-0 text-xl lg:text-3xl font-bold">
              About <p className="inline text-[#A24BFF]">US</p>
            </h1>
            <p className="text-sm md:text-xl lg:text-2xl mt-4 sm:max-w-[80%] w-auto">
              At Menternship, we’re dedicated to helping students bridge the gap
              between education and industry. <br /> <br /> We offer a unique
              combination of
              <p className="text-[#A24BFF] inline">
                mentorship and internship opportunities,
              </p>
              giving students hands-on experience while learning from real
              industry experts.
            </p>
          </motion.span>
        </div>
      </div>
    </>
  );
};

export default About_page;