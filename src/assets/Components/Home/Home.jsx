import React from "react";
import MyImage from "../../Images/logo.png";
import photo1 from "../../Images/Rectangle 4.png";
import photo2 from "../../Images/Rectangle 2.png";
import photo3 from "../../Images/Rectangle 6.png";
import photo4 from "../../Images/Rectangle 5.png";
import photo5 from "../../Images/Rectangle 3.png";
import photo6 from "../../Images/Rectangle 7.png";
import effect from "../../Images/Ellipse 1.png";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen bg-[#1A171E] text-white min-w-screen relative overflow-hidden">
      <header className="mt-2 flex items-center">
        <img
          src={MyImage}
          alt="LOGO"
          className="lg:max-w-[9vw] ml-0 sm:ml-15 mt-4 w-20"
        />
        <nav className="sm:ml-[12vw] ml-[5vw] mt-[5vh] w-auto relative z-10">
          <ul className="list-none inline">
            <li className="inline-block mx-[3vw]">
              <NavLink
                to="/"
                className="font-bold hover:text-xl hover:font-bold"
              >
                Home
              </NavLink>
            </li>
            <li className="inline-block mx-[3vw]">
              <NavLink to="/About" className="hover:text-xl hover:font-bold">
                About
              </NavLink>
            </li>
            <li className="inline-block mx-[3vw]">
              <NavLink to="/Contact" className="hover:text-xl active:font-bold">
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="sm:mt-[15vh] mt-10 relative z-10">
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
      </main>

      <aside className="absolute right-0 top-0 min-h-full z-10 w-0 lg:w-auto">
        <img
          src={photo1}
          alt="Photo 1"
          className="max-h-[50vh] relative top-[5vh] right-80 xl:right-90"
        />
        <img
          src={photo2}
          alt="Photo 2"
          className="absolute -top-0 right-45 max-h-[53vh] xl:right-50"
        />
        <img
          src={photo3}
          alt="Photo 3"
          className="absolute top-[5vh] max-h-[54vh] right-10"
        />
        <img
          src={photo4}
          alt="Photo 4"
          className="absolute bottom-0 right-80 max-h-[40vh] xl:right-90"
        />
        <img
          src={photo5}
          alt="Photo 5"
          className="absolute bottom-0 right-45 max-h-[51vh] xl:right-50"
        />
        <img
          src={photo6}
          alt="Photo 6"
          className="absolute bottom-0 max-h-[38vh] right-10"
        />
      </aside>

      <div className="absolute max-w-4xl -bottom-96 -left-90 z-0">
        <img src={effect} alt="Effect" />
        <img
          src={effect}
          alt="Effect"
          className="max-w-5xl -bottom-96 -right-90"
        />
      </div>
    </div>
  );
};

export default Home;
