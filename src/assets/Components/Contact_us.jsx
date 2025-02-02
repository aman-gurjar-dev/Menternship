import React from "react";
import MyImage from "../Images/logo.png";
import effect from "../Images/Ellipse 1.png";
import phone from "../Images/Phone Ringing.png";
import location from "../Images/Location Pin.png";
import mail from "../Images/mail.png";
import { NavLink } from "react-router-dom";

const Contact_us = () => {
  return (
    <>
      <div className="h-screen bg-[#1A171E] text-white min-w-screen relative overflow-hidden">
        <div className=" mt-2">
          <img
            src={MyImage}
            alt=" LOGO "
            className=" max-w-[9vw] ml-15 mt-4 inline "
          />
          <ul class=" ml-[12vw] mt-[5vh] w-auto list-none inline relative z-10">
            <li class="inline-block mx-[3vw]">
              {" "}
              <NavLink to="/" className="  hover:text-xl hover:font-bold">
                Home
              </NavLink>
            </li>
            <li class="inline-block mx-[3vw]">
              <NavLink to="/About" className="hover:text-xl hover:font-bold">
                About
              </NavLink>
            </li>
            <li class="inline-block mx-[3vw] ">
              <NavLink
                to="/Contact"
                className="font-bold hover:text-xl active:font-bold "
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <span className=" absolute top-7 right-10 rounded-full bg-[#1a171e7b] w-[25vw] h-[15vh]  text-center font-semibold text-3xl text-[#FFFFFF] z-10  p-2 m-auto ">
          Menternship{" "}
          <p className="inline text-[#7A42B5] relative z-11"> Means</p> <br />{" "}
          Opportunity
        </span>

        <div>
          <div className=" w-[80vw] h-[70vh] flex justify-center items-center mx-[10vw] mt-[3vh]">
            <div className="w-[30vw] h-[70vh] bg-[#A488DB] ">
              <div className=" mt-[4vh]">
                <h1 className="text-4xl text-center text-black font-bold">
                  Contact <span className=" text-[#F86B00]">Us</span>
                </h1>
                <h1 className="text-center text-xl font-semibold">
                  We are here to help you
                </h1>
              </div>
              <div className=" flex justify-center">
                <img src={phone} alt="Phone" className=" inline" />
                <p className="inline">
                  Phone - <br />
                  +91 1234567890
                </p>
              </div>
              <div>
                <img src={mail} alt="Phone" />
              </div>
              <div>
                <img src={location} alt="Phone" />
              </div>
            </div>
            <div className=" bg-[#2E103B] w-[50vw] h-[70vh] "></div>
          </div>
        </div>

        <div className="">
          <img
            src={effect}
            alt="Effect"
            className="absolute max-w-3xl -top-90 -right-90 z-0"
          />
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

export default Contact_us;
