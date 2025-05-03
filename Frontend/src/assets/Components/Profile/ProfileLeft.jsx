import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import { FaUserCircle } from "react-icons/fa";

const ProfileLeft = ({ active, setActive }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [userName, setUserName] = useState("");

  // ✅ Fetch User Profile Image and Name
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${config.backendUrl}/Profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.user) {
          setUserName(res.data.user.name);
          if (res.data.user.profileImage) {
            // ✅ Append timestamp to bypass cache
            setCurrentImage(`http://127.0.0.1:3000${res.data.user.profileImage}?t=${Date.now()}`);
          }
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchUserProfile();
  }, [active]); // ✅ Re-fetch when active menu changes

  // ✅ Handle Logout with Confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      window.location.href = "/Login";
    }
  };

  return (
    <div className="w-full sm:w-64 p-4 text-white relative z-10 flex flex-col items-center space-y-4">
      {/* ✅ Profile Image Display */}
      <div className="flex flex-col items-center">
        {currentImage ? (
          <img
            src='../src/assets/Images/userlogo.png'
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-white object-cover"
          />
        ) : (
          <FaUserCircle size={80} className="text-gray-400" />
        )}

        {/* ✅ User Name Below Image */}
        <h2 className="text-lg font-bold mt-2 ">{userName || "User Name"}</h2>
      </div>

      {/* ✅ Navigation Menu */}
      <ul className="w-full space-y-2 text-center font-semibold">
        {["Account", "Password"].map((item) => (
          <li
            key={item}
            className={`p-2 cursor-pointer ${
              active === item ? "text-black bg-purple-600 rounded-md font-extrabold" : "font-semibold"
            }`}
            onClick={() => setActive(item)}
          >
            {item}
          </li>
        ))}
        {/* ✅ Logout Button */}
        <li
          className="p-2 cursor-pointer text-red-500 hover:bg-red-600 hover:text-white rounded-md"
          onClick={handleLogout}
        >
          Log out
        </li>
      </ul>
    </div>
  );
};

export default ProfileLeft;
