import { useState } from "react";
import MyImage from "./assets/Dextop1/logo.png";
import photo1 from "./assets/Dextop1/Rectangle 4.png";
import photo2 from "./assets/Dextop1/Rectangle 2.png";
import photo3 from "./assets/Dextop1/Rectangle 6.png";
import photo4 from "./assets/Dextop1/Rectangle 5.png";
import photo5 from "./assets/Dextop1/Rectangle 3.png";
import photo6 from "./assets/Dextop1/Rectangle 7.png";
import effect from "./assets/Dextop1/Ellipse 1.png";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className=" h-screen bg-[#1A171E] text-white min-w-screen ">
        <img
          src={MyImage}
          alt=" LOGO "
          className=" max-w-35 ml-5 mt-4 inline "
        />
        <ul class=" ml-80 mt-5 w-auto list-none inline relative z-10">
          <li class="inline-block mx-9">
            {" "}
            <a href="" className=" hover:text-xl hover:font-bold">
              Home
            </a>
          </li>
          <li class="inline-block mx-9">
            <a href="" className=" hover:text-xl hover:font-bold">
              About
            </a>
          </li>
          <li class="inline-block mx-9 ">
            <a href="" className=" hover:text-xl hover:font-bold">
              Contact
            </a>
          </li>
        </ul>

        <div className="mt-14 ml-50">
          <h1 className="text-5xl font-bold">Guiding Ambitions,</h1>
          <h1 className="text-5xl font-bold">
            Building <p className=" text-[#3759D3] inline">Careers</p>
          </h1>
          <h1 className="text-xl mt-3">Where Mentorship Meets Opportunity.</h1>
        </div>

        <div className=" mt-10 ml-50">
          <span className=" mb-1.5 ">
            <button className="bg-[#477CD6] p-1 px-16 rounded-3xl mr-5 mb-5 font-bold">
              Start Today
            </button>
            <button className="bg-[#FFF5F5] text-black p-1 px-16 rounded-3xl font-bold">
              Register
            </button>
          </span>
          <br />
          <button className="bg-[#D68F47] text-black rounded-3xl px-41 py-3 font-bold">
            Explore More
          </button>
        </div>

        <div className=" absolute right-0 top-0 min-h-full z-10">
          <img
            src={photo1}
            alt=" Photo 1"
            className="absolute top-10 right-90 max-w-32"
          />
          <img
            src={photo2}
            alt=" Photo 1"
            className=" absolute top-0 right-50 max-w-32"
          />
          <img
            src={photo3}
            alt=" Photo 1"
            className=" absolute top-10 max-w-32 right-10"
          />
          <img
            src={photo4}
            alt=" Photo 1"
            className="absolute bottom-0 right-90 max-w-32"
          />
          <img
            src={photo5}
            alt=" Photo 1"
            className=" absolute bottom-0 right-50 max-w-32 "
          />
          <img
            src={photo6}
            alt=" Photo 1"
            className=" absolute bottom-0 max-w-32 right-10"
          />
        </div>

        <div className="">
          {/* <img
            src={effect}
            alt="Effect"
            className="absolute max-w-5xl -bottom-90 -left-90"
          /> */}
          <img
            src={effect}
            alt="Effect"
            className="absolute max-w-5xl bottom-20 right-20 z-0"
          />
        </div>
      </div>
    </>
  );
}

export default App;
