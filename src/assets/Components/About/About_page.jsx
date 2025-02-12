import React from "react";
import MyImage from "../../Images/logo.png"; // Importing the logo image
import effect from "../../Images/Ellipse 1.png"; // Importing the effect image
import sideImage from "../../Images/WhatsApp_Image_2025-01-24_at_22.07.39_b8dce0b9-removebg-preview 1.png"; // Importing the side image
import { NavLink } from "react-router-dom"; // Importing NavLink component from react-router-dom for navigation

const About_page = () => {
  // Defining the About_page component
  return (
    <>
      <div className="h-screen bg-[#1A171E] text-white min-w-screen relative overflow-hidden">
        {" "}
        {/* Main container with background color and text color */}
        <div className="mt-2">
          {" "}
          {/* Container for logo and navigation */}
          <img
            src={MyImage}
            alt="LOGO"
            className="lg:max-w-[9vw] ml-0 sm:ml-15 mt-4 inline w-20" // Logo image with styling
          />
          <ul className="sm:ml-[12vw] ml-[5vw] mt-[5vh] w-auto list-none inline relative z-10">
            {" "}
            {/* Navigation list */}
            <li className="inline-block mx-[3vw]">
              {" "}
              {/* Navigation item */}
              <NavLink to="/" className="hover:text-xl hover:font-bold">
                {" "}
                {/* Link to Home page */}
                Home
              </NavLink>
            </li>
            <li className="inline-block mx-[3vw]">
              {" "}
              {/* Navigation item */}
              <NavLink
                to="/About"
                className="font-bold hover:text-xl hover:font-bold"
              >
                {" "}
                {/* Link to About page */}
                About
              </NavLink>
            </li>
            <li className="inline-block mx-[3vw]">
              {" "}
              {/* Navigation item */}
              <NavLink to="/Contact" className="hover:text-xl active:font-bold">
                {" "}
                {/* Link to Contact page */}
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Menternship mean */}
        <div className="invisible md:visible">
          {" "}
          {/* Container for Menternship meaning */}
          <span className="absolute top-4 lg:right-10 right-3 rounded-full bg-[#1a171e7b] px-12 lg:px-15 md:text-sm xl:text-xl text-center font-semibold lg:text-xl text-[#FFFFFF] z-10 p-2 m-auto">
            Menternship
            <p className="inline text-[#7A42B5] relative z-11">Means</p> <br />
            Opportunity
          </span>
        </div>
        {/* Content */}
        <div className="sm:flex justify-baseline relative top-10">
          {" "}
          {/* Main content container */}
          <img
            src={sideImage}
            alt="Side Image"
            className="mr-20 relative bottom-10 w-0 sm:w-[45%]" // Side image with styling
          />
          <span className="mt-5">
            {" "}
            {/* Container for About Us text */}
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
          </span>
        </div>
        <div className="">
          {" "}
          {/* Container for effect images */}
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

export default About_page; // Exporting the About_page component
