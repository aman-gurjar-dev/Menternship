import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
import axios from "axios";

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

        const res = await axios.get("http://127.0.0.1:3000/Profile", {
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
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      {/* Profile Box - Responsive */}
      <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full md:w-[80%] h-auto md:h-[80vh] rounded-2xl p-5 space-y-5 md:space-y-0 md:space-x-5 shadow-lg overflow-hidden">
        
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
