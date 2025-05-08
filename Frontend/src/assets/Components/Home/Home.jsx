import React from "react";
import MyImage from "../../Images/logo.png";
import photo1 from "../../Images/Rectangle 4.png";
import photo2 from "../../Images/Rectangle 2.png";
import photo3 from "../../Images/Rectangle 6.png";
import photo4 from "../../Images/Rectangle 5.png";
import photo5 from "../../Images/Rectangle 3.png";
import photo6 from "../../Images/Rectangle 7.png";
import {motion} from "framer-motion";
// import effect from "../../Images/Ellipse 1.png";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className=" ml-5">
      <motion.main className=" relative z-10 "
        initial={{opacity: 0, x:-300}}
        animate={{opacity: 1, x:0}}
        exit={{opacity: 0, x:-300}}
        transition={{duration: 1 , ease:"anticipate"}}
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
            <NavLink
              to="/Login"
              className="bg-[#477CD6] p-1 sm:px-16 px-7 rounded-3xl mr-5 mb-5 font-bold"
            >
              Start Today
            </NavLink>
            <NavLink
              to="/Register"
              className="bg-[#FFF5F5] text-black p-1 sm:px-16 px-7 rounded-3xl font-bold"
            >
              Register
            </NavLink>
          </div>
          <div className="mt-8">
            <NavLink
              to="/Explore_more"
              className="bg-[#D68F47] text-black rounded-3xl sm:px-41 sm:py-3 px-23 py-3 font-bold"
            >
              Explore More
            </NavLink>

            

          </div>
        </section>
      </motion.main>

      <motion.aside className="absolute right-0 top-0 min-h-full z-10 w-0 lg:w-auto"
        initial={{opacity: 0, x: 100}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0, x: 100}}
        transition={{duration: 0.5 , ease:"anticipate"}}
      >
        <motion.img
          initial={{opacity: 0, y:100}}
          animate={{opacity: 1, y:0}}
          exit={{opacity: 0, y: 100}}
          transition={{duration: 1 , ease:"anticipate"}}
          src={photo1}
          alt="Photo 1"
          className="max-h-[50vh] relative top-[5vh] right-80 xl:right-90"
        />
        <motion.img
         initial={{opacity: 0, y:100}}
         animate={{opacity: 1, y:0}}
         exit={{opacity: 0, y: 100}}
         transition={{duration: 1 , ease:"anticipate"}}
          src={photo2}
          alt="Photo 2"
          className="absolute -top-0 right-45 max-h-[53vh] xl:right-50"
        />
        <motion.img
         initial={{opacity: 0, y:100}}
         animate={{opacity: 1, y:0}}
         exit={{opacity: 0, y: 100}}
         transition={{duration: 1 , ease:"anticipate"}}
          src={photo3}
          alt="Photo 3"
          className="absolute top-[5vh] max-h-[54vh] right-10"
        />
        <motion.img
         initial={{opacity: 0, y:-50}}
         animate={{opacity: 1, y:0}}
         exit={{opacity: 0, y: -50}}
         transition={{duration: 1 , ease:"anticipate"}}
          src={photo4}
          alt="Photo 4"
          className="absolute bottom-0 right-80 max-h-[40vh] xl:right-90"
        />
        <motion.img
           initial={{opacity: 0, y:-50}}
           animate={{opacity: 1, y:0}}
           exit={{opacity: 0, y: -50}}
           transition={{duration: 1 , ease:"anticipate"}}
          src={photo5}
          alt="Photo 5"
          className="absolute bottom-0 right-45 max-h-[51vh] xl:right-50"
        />
        <motion.img 
           initial={{opacity: 0, y:-50}}
           animate={{opacity: 1, y:0}}
           exit={{opacity: 0, y: -50}}
           transition={{duration: 1 , ease:"anticipate"}} 
          src={photo6}
          alt="Photo 6"
          className="absolute bottom-0 max-h-[38vh] right-10"
        />
      </motion.aside>
    </div>
  );
};

export default Home;
