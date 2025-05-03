import React from "react";
import MyImage from "../../Images/logo.png";
import effect from "../../Images/Ellipse 1.png";
import phone from "../../Images/Phone Ringing.png";
import location from "../../Images/Location Pin.png";
import mail from "../../Images/mail.png";
import { NavLink } from "react-router-dom";

const Contact_us = () => {
  return (
    <>
      <div className="">
        {/* Menternship mean */}
        <div className="invisible md:visible">
          <span className=" absolute top-4 lg:right-10 right-3 rounded-full bg-[#1a171e7b] px-12   lg:px-15 md:text-sm xl:text-xl text-center  font-semibold lg:text-xl text-[#FFFFFF] z-10  p-2 m-auto ">
            Menternship{" "}
            <p className="inline text-[#7A42B5] relative z-11"> Means</p> <br />{" "}
            Opportunity
          </span>
        </div>

        {/* Content */}

        <div className="">
          <div className=" w-[80vw] h-[70vh] flex justify-center items-center mx-[10vw] mt-[3vh] ">
            <div className="sm:w-[30vw] h-[70vh] bg-[#A488DB] invisible sm:visible w-0 ">
              <div className=" mt-[4vh] ">
                <h1 className="text-4xl text-center text-black font-bold">
                  Contact <span className=" text-[#F86B00]">Us</span>
                </h1>
                <h1 className="text-center text-xl font-semibold">
                  We are here to help you
                </h1>
              </div>

              <div className=" mt-[7vh] font-bold ">
                <div className=" flex justify-center my-[4vh]">
                  <img
                    src={phone}
                    alt="Phone"
                    className=" inline max-w-16 mx-[2vw] "
                  />
                  <p className="inline text-black">
                    Phone - <br />
                    +91 1234567890
                  </p>
                </div>
                <div className=" flex justify-center my-[4vh] ">
                  <img
                    src={mail}
                    alt="Phone"
                    className=" inline max-w-16 mx-[2vw] "
                  />
                  <p className="inline text-black">
                    Phone - <br />
                    +91 1234567890
                  </p>
                </div>
                <div className=" flex justify-center  my-[4vh] ">
                  <img
                    src={location}
                    alt="Phone"
                    className=" inline max-w-16 mx-[2vw]"
                  />
                  <p className="inline text-black">
                    Phone - <br />
                    +91 1234567890
                  </p>
                </div>
              </div>
            </div>
            <div className=" bg-[#2E103B] w-[80vw] sm:w-[50vw] h-[70vh]  ">
              <div className=" relative left-[5vw] top-[5vh] flex-col">
                <h1 className=" sm:text-4xl font-bold text-2xl">Let’s Talk</h1>
                <h1 className=" sm:text-xl text-blue-400">
                  Feel free to contact us below
                </h1>
                <input
                  type="text"
                  className=" w-[60vw] sm:w-[25vw] h-[5vh] bg-white text-black block my-4"
                  placeholder="Your Name..."
                />
                <input
                  type="text"
                  className=" w-[60vw] sm:w-[25vw]  h-[5vh] text-black bg-white block my-4"
                  placeholder="Email Id..."
                />
                <input
                  type="text"
                  className=" w-[60vw] sm:w-[25vw]  h-[5vh] text-black bg-white block my-4"
                  placeholder="Phone Number"
                />
                <textarea
                  name=""
                  id=""
                  className="w-[60vw] sm:w-[25vw] h-[10vh] text-black bg-white my-4"
                  placeholder="Message.."
                ></textarea>
                <div>
                  <button className=" rounded-4xl bg-[#477CD6] px-[5vw] relative z-10 py-[1vh] items-center">
                    {" "}
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact_us;
