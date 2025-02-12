import React from "react";
import MyImage from "../../Images/logo.png";
import effect from "../../Images/Ellipse 1.png";
import chatus from "../../Images/logo_website-removebg-preview 4.png";
import userlogo from "../../Images/face-Photoroom (1) 1.png";
import { NavLink } from "react-router-dom";

// Chat component
const Chat = () => {
  return (
    <div className="h-screen relative z-1  text-white  overflow-hidden flex flex-col">
      {/* Header section */}
      <div className="flex justify-between items-center mt-2 px-4">
        <img src={MyImage} alt="LOGO" className="max-w-[9vw] mt-4" />
      </div>
      {/* Main chat section */}
      <div className="flex flex-1 items-center relative bottom-8 sm:bottom-3 justify-center">
        <div className="w-[85vw] h-[70vh] bg-[#55566725] p-4 rounded-2xl">
          {/* Navigation links */}
          <div className="flex justify-center mb-4">
            <ul className="flex items-center justify-around w-full bg-[#CEC8C884] text-black font-semibold rounded-2xl p-2">
              <li className="hover:bg-black p-3 sm:px-5 rounded-2xl text-sm hover:text-white">
                <NavLink className="">Announcement</NavLink>
              </li>
              <li className="hover:bg-black p-3 sm:px-6 rounded-2xl text-sm hover:text-white">
                <NavLink>1:1 Mentorship</NavLink>
              </li>
              <li className="hover:bg-black p-3 sm:px-5 rounded-2xl text-sm hover:text-white">
                <NavLink>Chat Bot</NavLink>
              </li>
            </ul>
          </div>
          {/* Chat messages */}
          <div className="flex mb-4">
            <img src={chatus} alt="Menternship logo" className="h-8" />
            <p className="flex-1 bg-[#A091AC28] p-2 rounded-bl-2xl rounded-br-2xl rounded-tr-2xl ml-2"></p>
          </div>
          <div className="flex">
            <img src={userlogo} alt="User logo" className="h-8" />
            <p className="flex-1 bg-[#A091AC28] p-2 rounded-bl-2xl rounded-br-2xl rounded-tr-2xl ml-2"></p>
          </div>
        </div>
      </div>
      {/* Message input section */}
      <div className="flex justify-center mb-4">
        <textarea
          name="Message"
          placeholder="Ask anything!"
          className="w-3/4 h-10 bg-[#CEC8C8] text-black rounded-tl-2xl rounded-bl-2xl p-2"
        ></textarea>
        <button className="bg-[#477CD6] px-10 rounded-tr-2xl rounded-br-2xl text-white ">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
