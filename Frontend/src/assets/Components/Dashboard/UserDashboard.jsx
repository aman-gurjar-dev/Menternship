import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import config from "../../utils/config";
import Header from "./Header";
import Sidebar from "../Sidebar/Sidebar";

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("/UserDashboard");

  const routeMap = {
    Home: "/UserDashboard",
    Profile: "/UserDashboard/profile",
    Messages: "/UserDashboard/message",
    MyMentor: "/UserDashboard/mymentor",
    ExploreMentor: "/UserDashboard/explorementor",
    MentorDashboard: (id) => `/mentordashboard/${id}`,
    Goals: "/UserDashboard/usergoals",
    Resource: "/UserDashboard/resource",
    Community: "/UserDashboard/forums",
    Chat: "/chat_now",
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in!");
          navigate("/Login");
          return;
        }

        const res = await axios.get(`${config.backendUrl}/profile`, {
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

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const handleLogout = useCallback(() => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/Login");
    }
  }, [navigate]);

  const hideHeaderRoutes = [];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-800">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-white font-sans bg-gray-800">
      {!shouldHideHeader && (
        <Header userData={userData} handleLogout={handleLogout} />
      )}
      <div className="flex flex-grow">
        <Sidebar
          routeMap={routeMap}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userId={userData._id}
        />
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="flex-1 overflow-y-scroll h-screen ml-0 md:ml-64 text-white"
        >
          <Outlet context={{ userData }} />
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
