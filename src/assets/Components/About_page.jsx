import React from "react";
import MyImage from "../Images/logo.png";
import effect from "../Images/Ellipse 1.png";
import sideImage from "../Images/WhatsApp_Image_2025-01-24_at_22.07.39_b8dce0b9-removebg-preview 1.png";
import { NavLink } from "react-router-dom";

const About_page = () => {
  return (
    <>
      <div className="h-screen bg-[#1A171E] text-white min-w-screen relative overflow-hidden">
        <div className=" mt-2">
          <img
            src={MyImage}
            alt=" LOGO "
            className=" max-w-35 ml-15 mt-4 inline "
          />
          <ul class=" ml-70 mt-5 w-auto list-none inline relative z-10">
            <li class="inline-block mx-9">
              {" "}
              <NavLink to="/" className=" hover:text-xl hover:font-bold">
                Home
              </NavLink>
            </li>
            <li class="inline-block mx-9">
              <NavLink
                to="/About"
                className=" font-bold hover:text-xl active:font-bold "
              >
                About
              </NavLink>
            </li>
            <li class="inline-block mx-9 ">
              <NavLink to="/Contact" className=" hover:text-xl ">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className=" flex justify-baseline">
          <img
            src={sideImage}
            alt="Side Image"
            className=" max-w-[45vw] mr-20 relative bottom-20"
          />
          <span className=" mt-5">
            <h1 className=" text-center text-3xl font-bold">
              About <p className=" inline text-[#A24BFF]">US</p>
            </h1>
            <p className=" text-2xl mt-4">
              At Menternship, we’re dedicated to helping <br /> students bridge
              the gap between <br />
              education and industry. <br /> <br /> We offer a unique
              combination of
              <p className=" text-[#A24BFF]">
                mentorship and internship opportunities,
              </p>
              giving students hands-on experience while <br />
              learning from real industry experts.
            </p>
          </span>
        </div>

        <div className="">
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

export default About_page;
