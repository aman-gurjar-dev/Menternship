import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import config from "../../utils/config";
import Header from "./Header";
import Sidebar from "../Sidebar/Sidebar";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center text-white bg-gray-800">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-lg">Loading your dashboard...</p>
    </div>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center text-white bg-gray-800">
    <div className="bg-red-500 p-6 rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl font-bold mb-2">Error</h2>
      <p className="mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

const WelcomeSection = ({ userData }) => (
  <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
    <h1 className="text-2xl font-bold mb-2">Welcome back, {userData.name}!</h1>
    <p className="text-gray-300">Here's an overview of your mentoring journey</p>
  </div>
);

const QuickStats = ({ userData }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Goals Progress</h3>
      <p className="text-2xl font-bold text-blue-400">0%</p>
    </div>
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
      <p className="text-2xl font-bold text-green-400">0</p>
    </div>
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Resources</h3>
      <p className="text-2xl font-bold text-purple-400">0</p>
    </div>
  </div>
);

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("/UserDashboard");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (token === null) {
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
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchUserData} />;
  }

  if (!userData) {
    return null;
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
          className="flex-1 overflow-y-scroll h-screen ml-0 md:ml-64 text-white p-6"
        >
          {location.pathname === "/UserDashboard" && (
            <>
              <WelcomeSection userData={userData} />
              <QuickStats userData={userData} />
            </>
          )}
          <Outlet context={{ userData }} />
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
