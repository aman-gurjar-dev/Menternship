import React from "react";
import MyImage from "./logo.png";
import effect from "./Ellipse 1.png";

const Contact_us = () => {
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
              <a href="" className=" font-bold hover:text-xl hover:font-bold">
                Home
              </a>
            </li>
            <li class="inline-block mx-9">
              <a href="" className=" font-bold hover:text-xl hover:font-bold">
                About
              </a>
            </li>
            <li class="inline-block mx-9 ">
              <a href="" className=" hover:text-xl font-bold">
                Contact
              </a>
            </li>
          </ul>
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

export default Contact_us;
