import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
import axios from "axios";
import config from "../../utils/config";

const Profile = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Account");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in!");
          navigate("/Login");
          return;
        }

        const res = await axios.get(`${config.backendUrl}/Profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(res.data.user);
      } catch (err) {
        console.error("Error fetching user data:", err);
        alert("Failed to fetch user data. Try again.");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#1A171E] p-2 sm:p-4 text-white">
      {/* Profile Box - Responsive */}
      <div className="flex flex-col md:flex-row bg-[#1A171E] w-full md:w-[80%] h-auto md:h-[80vh] rounded-2xl p-3 sm:p-5 space-y-3 sm:space-y-5 md:space-y-0 md:space-x-5 shadow-lg overflow-hidden">
        
        {/* Left Profile Section (Fixed Size) */}
        <div className="w-full md:w-[30%] h-auto md:h-full border-2 border-black">
          <ProfileLeft active={active} setActive={setActive} userData={userData} />
        </div>

        {/* Right Profile Section (Scrollable on Small Screens) */}
        <div className="w-full md:w-[70%] h-auto md:h-full overflow-y-auto border-2 border-black">
          <ProfileRight active={active} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
