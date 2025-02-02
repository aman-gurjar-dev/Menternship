import React from "react";
import MyImage from "../Images/logo.png";
import photo1 from "../Images/Rectangle 4.png";
import photo2 from "../Images/Rectangle 2.png";
import photo3 from "../Images/Rectangle 6.png";
import photo4 from "../Images/Rectangle 5.png";
import photo5 from "../Images/Rectangle 3.png";
import photo6 from "../Images/Rectangle 7.png";
import effect from "../Images/Ellipse 1.png";
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className=" h-screen bg-[#1A171E] text-white min-w-screen relative overflow-hidden">
        <div className=" mt-2">
          <img
            src={MyImage}
            alt=" LOGO "
            className=" max-w-[9vw] ml-15 mt-4 inline "
          />
          <ul class=" ml-[12vw] mt-[5vh] w-auto list-none inline relative z-10">
            <li class="inline-block mx-[3vw]">
              {" "}
              <NavLink
                to="/"
                className="font-bold   hover:text-xl hover:font-bold"
              >
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
                className="hover:text-xl active:font-bold "
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="mt-[12vh] relative z-10">
          <div className="mt-[7vh] ml-[14vw]">
            <h1 className="text-5xl font-bold">Guiding Ambitions,</h1>
            <h1 className="text-5xl font-bold">
              Building <p className=" text-[#3759D3] inline">Careers</p>
            </h1>
            <h1 className="text-xl mt-3">
              Where Mentorship Meets Opportunity.
            </h1>
          </div>

          <div className=" mt-[6vh] ml-[14vw]">
            <span className=" mb-[1vh] ">
              <NavLink
                to="/StartNow"
                className="bg-[#477CD6] p-1 px-16 rounded-3xl mr-5 mb-5 font-bold"
              >
                Start Today
              </NavLink>

              <NavLink
                to="/Register"
                className="bg-[#FFF5F5] text-black p-1 px-16 rounded-3xl font-bold"
              >
                Register
              </NavLink>
            </span>
            <br />
            <div className="mt-8">
              <NavLink
                to="/Explore_more"
                className="bg-[#D68F47] text-black rounded-3xl px-41 py-3 font-bold"
              >
                Explore More
              </NavLink>
            </div>
          </div>
        </div>
        <div className=" absolute right-0 top-0 min-h-full z-10 ">
          <img
            src={photo1}
            alt=" Photo 1"
            className="max-h-[54vh] relative top-[3vh] right-90"
          />
          <img
            src={photo2}
            alt=" Photo 1"
            className=" absolute -top-0 right-50 max-h-[53vh]"
          />
          <img
            src={photo3}
            alt=" Photo 1"
            className=" absolute top-[5vh] max-h-[54vh] right-10"
          />
          <img
            src={photo4}
            alt=" Photo 1"
            className="absolute bottom-0 right-90 max-h-[40vh]"
          />
          <img
            src={photo5}
            alt=" Photo 1"
            className=" absolute bottom-0 right-50 max-h-[51vh] "
          />
          <img
            src={photo6}
            alt=" Photo 1"
            className=" absolute bottom-0 max-h-[38vh] right-10"
          />
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

export default Home;
