import React, { useState } from "react";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
import effect from "../../Images/Ellipse 1.png";

const Profile = () => {
  const [active, setActive] = useState("Settings");

  return (
    <div className="w-[100%] h-screen bg-[#1A171E] relative overflow-hidden">
      <div className="w-[100%] flex justify-center items-center h-screen relative z-10">
        <div className="flex flex-row bg-gray-900 w-[80%] justify-center items-center rounded-2xl space-x-[10%]">
          <ProfileLeft active={active} setActive={setActive} />
          <ProfileRight active={active} />
        </div>
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
  );
};

export default Profile;
