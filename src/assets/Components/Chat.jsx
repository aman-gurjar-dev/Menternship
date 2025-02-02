import React from "react";
import MyImage from "../Images/logo.png";
import effect from "../Images/Ellipse 1.png";
import chatus from "../Images/logo_website-removebg-preview 4.png";
import userlogo from "../Images/face-Photoroom (1) 1.png";
import { NavLink } from "react-router-dom";

const Chat = () => {
  return (
    <>
      <div className="h-screen bg-[#1A171E] text-white min-w-screen relative overflow-hidden">
        <div className=" mt-2">
          <img
            src={MyImage}
            alt=" LOGO "
            className=" max-w-[9vw] ml-15 mt-4 inline "
          />
        </div>

        <div className=" w-[85vw] h-[70vh] bg-[#55566725] m-auto">
          <div className=" flex justify-center">
            <ul className=" flex items-center justify-around w-[70%] h-10 rounded-4xl relative bottom-[4vh] bg-[#CEC8C884] text-black font-semibold ">
              <li className=" hover:bg-black p-3 sm:px-5 rounded-4xl text-sm  hover:text-white">
                <NavLink className="">Announcement</NavLink>
              </li>
              <li className=" hover:bg-black p-3 sm:px-6 rounded-4xl text-sm  hover:text-white">
                <NavLink>1:1 Mentorship</NavLink>
              </li>
              <li className=" hover:bg-black p-3 sm:px-5 rounded-4xl text-sm  hover:text-white">
                <NavLink>Chat Bot</NavLink>
              </li>
            </ul>
          </div>

          <div className=" flex">
            <img
              src={chatus}
              alt="Menternship logo"
              className="max-h-[8vh] relative bottom-[4vh] "
            />
            <p className="max-w-[70vw] max-h-[50vh] bg-[#A091AC28] rounded-bl-4xl rounded-br-4xl rounded-tr-4xl"></p>
          </div>
          <div className=" flex relative left-2 mt-3">
            <img
              src={userlogo}
              alt="Menternship logo"
              className="max-h-[8vh] relative bottom-[4vh] "
            />
            <p className=" max-w-[70vw] max-h-[50vh] bg-[#A091AC28] rounded-bl-4xl rounded-br-4xl rounded-tr-4xl"></p>
          </div>
        </div>
        <div className="flex justify-center relative bottom-[3vh]">
          <textarea
            name="Message"
            id=""
            placeholder="Ask anything !"
            className="w-[65vw] h-[5vh] flex items-center bg-[#CEC8C8]  text-black rounded-tl-4xl rounded-bl-4xl"
          ></textarea>
          <button className="flex bg-[#477CD6] items-center px-[6vh] rounded-4xl relative right-5 text-white">
            Send
          </button>
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

export default Chat;
