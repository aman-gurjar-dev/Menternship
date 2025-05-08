import React from "react";
import { motion } from "framer-motion";
import sideImage from "../../Images/WhatsApp_Image_2025-01-24_at_22.07.39_b8dce0b9-removebg-preview 1.png";

import dev1 from "../../Images/dev1.jpg";
import dev2 from "../../Images/dev2.jpg";
import dev3 from "../../Images/dev3.jpg";

const About_page = () => {
  return (
    <div className="px-4  md:px-12 lg:px-24 bg-gradient-to-b  min-h-screen">
      {/* Menternship Meaning */}
     <motion.div
             className="invisible md:visible"
             initial={{ opacity: 0, x: -60, y: -160 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
           >
             <span className="absolute top-4 lg:right-10 right-3 rounded-full bg-[#1a171e7b] px-12 lg:px-15 md:text-sm xl:text-xl text-center font-semibold lg:text-xl text-[#FFFFFF] z-10 p-2 m-auto">
               Menternship{" "}
               <p className="inline text-[#7A42B5] relative z-11">Means</p> <br />
               Opportunity
             </span>
           </motion.div>

      {/* About Section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-10 mt-20">
         {/* Right Side Image */}
         <motion.img
  src={sideImage}
  alt="Illustration"
  className="hidden md:block w-full md:w-[45%] max-w-sm mx-auto"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1.4 }}
  transition={{ duration: 0.6 }}
/>
  {/* Left Side Text */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="w-full md:w-1/2"
  >
    <h1 className="text-center md:text-left text-3xl lg:text-5xl font-bold text-white">
      About <span className="text-[#A24BFF]">Us</span>
    </h1>
    <p className="mt-6 text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed text-center md:text-left">
      At <strong>Menternship</strong>, we’re dedicated to helping students bridge the gap
      between <strong>education</strong> and <strong>industry</strong>.
      <br />
      <br />
      We offer a unique combination of{" "}
      <span className="text-[#A24BFF] font-semibold">
        mentorship and internship opportunities
      </span>
      , giving students hands-on experience while learning from real
      industry experts.
    </p>
  </motion.div>

 
</div>

{/* Developer Section */}
<div className="mt-24 text-center">
  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-12">
    Meet Our <span className="text-[#A24BFF]">Developers</span>
  </h2>
  <div className="flex flex-col sm:flex-row gap-12 mb-10 items-center justify-center">
    {[{ src: dev1, name: "Aman Gurjar" },
      { src: dev2, name: "Aman Makwana" },
      { src: dev3, name: "Alok Dalke" }].map((dev, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.2, duration: 0.5 }}
        className="p-6 rounded-xl shadow-xl w-64 scale-130  transition-transform duration-300"
      >
        <img
          src={dev.src}
          alt={dev.name}
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-[#A24BFF]"
        />
        <p className="text-lg font-semibold ">{dev.name}</p>
      </motion.div>
    ))}
    
  </div>

</div>

      

      
    </div>
  );
};

export default About_page;
