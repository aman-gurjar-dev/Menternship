import React from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Contact_us = () => {
  return (
    <>
      <motion.div
        className="invisible md:visible"
        initial={{ opacity: 0, x: -60, y: -90 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="absolute top-4 lg:right-10 right-3 rounded-full bg-[#1a171e7b] px-12 lg:px-15 md:text-sm xl:text-xl text-center font-semibold lg:text-xl text-[#FFFFFF] z-10 p-2 m-auto">
          Menternship{" "}
          <p className="inline text-[#7A42B5] relative z-11">Means</p> <br />
          Opportunity
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center justify-center w-full"
      >
        {/* Contact Form Section */}
        <div className="w-[80vw] h-[70vh] flex justify-center items-center mx-[10vw] mt-[3vh]">
          {/* Contact Details */}
          <motion.div
            className="sm:w-[30vw] h-[70vh] bg-[#A488DB] invisible sm:visible w-0 flex flex-col justify-center items-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl text-center text-black font-bold">
              Contact <span className="text-[#F86B00]">Us</span>
            </h1>
            <h1 className="text-center text-xl font-semibold">
              We are here to help you
            </h1>

            <div>
              {[
                { icon: <FiPhone />, text: "Phone - +91 9131164828" },
                { icon: <FiMail />, text: "Email - amangurjar160@gmail.com" },
                {
                  icon: <FiMapPin />,
                  text: "Location - Indore, MP.......",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center justify-center my-[4vh] ${
                    index !== 1 ? "relative right-9" : ""
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <span className="text-3xl mx-[1vw]">{item.icon}</span>
                  <p className="text-black">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-[#2E103B] w-[80vw] sm:w-[50vw] h-[70vh] flex flex-col justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="flex flex-col w-[80%] sm:w-[60%] items-center">
              <h1 className="sm:text-4xl font-bold text-2xl text-white">
                Let’s Talk
              </h1>
              <h1 className="sm:text-xl text-blue-400">
                Feel free to contact us below
              </h1>

              {/* Inputs */}
              {["Your Name...", "Email Id...", "Phone Number"].map(
                (placeholder, index) => (
                  <motion.input
                    key={index}
                    type="text"
                    className="w-full h-[5vh] bg-white text-black text-center rounded-lg block my-4"
                    placeholder={placeholder}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  />
                )
              )}

              <motion.textarea
                className="w-full h-[10vh] text-black bg-white text-center rounded-lg my-4"
                placeholder="Message..."
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              ></motion.textarea>

              {/* Submit Button */}
              <motion.button
                className="rounded-full bg-[#477CD6] px-8 py-2 text-white text-lg mt-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
              >
                SUBMIT
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Contact_us;
