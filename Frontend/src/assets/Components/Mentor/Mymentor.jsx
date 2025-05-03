import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLoader, FiAlertTriangle, FiUserPlus, FiUserX, FiMessageSquare } from "react-icons/fi";
import { IoCheckmarkDone, IoWarning } from "react-icons/io5";
import axios from "axios";
import config from "../../utils/config";

const MyMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [unfollowingId, setUnfollowingId] = useState(null);
  const token = localStorage.getItem("token");

  const showMessage = (text, type = "success", duration = 3000) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), duration);
  };

  const fetchFollowedMentors = async () => {
    if (!token) {
      setError("Please login to view your mentors");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${config.backendUrl}/api/followedMentors`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.followedMentors) {
        setMentors(response.data.followedMentors);
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
      setError(error.response?.data?.message || "Failed to load mentors");
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (mentorId) => {
    if (!token) {
      showMessage("Please login to manage mentors", "error");
      return;
    }

    setUnfollowingId(mentorId);
    try {
      const response = await axios.post(
        `${config.backendUrl}/api/unfollowMentor/${mentorId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setMentors(prev => prev.filter(mentor => mentor._id !== mentorId));
        showMessage("Mentor unfollowed successfully", "success");
      } else {
        throw new Error(response.data.message || "Failed to unfollow");
      }
    } catch (error) {
      console.error("Error unfollowing mentor:", error);
      showMessage(error.response?.data?.message || "Failed to unfollow mentor", "error");
      // Refresh the list if there was an error to ensure consistency
      fetchFollowedMentors();
    } finally {
      setUnfollowingId(null);
    }
  };

  useEffect(() => {
    fetchFollowedMentors();
  }, [token]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Message Notification */}
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                message.type === "success" 
                  ? "bg-green-900 text-green-100" 
                  : "bg-red-900 text-red-100"
              }`}
            >
              {message.type === "success" ? <IoCheckmarkDone size={20} /> : <IoWarning size={20} />}
              <span>{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Mentors</h1>
          <div className="text-gray-400">
            {mentors.length > 0 && `${mentors.length} mentor${mentors.length !== 1 ? 's' : ''}`}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="mb-4"
            >
              <FiLoader className="text-blue-400" size={32} />
            </motion.div>
            <p className="text-gray-400">Loading your mentors...</p>
          </div>
        ) : error ? (
          <div className="bg-gray-800 rounded-xl p-6 max-w-md mx-auto text-center">
            <FiAlertTriangle className="mx-auto text-yellow-400" size={48} />
            <h2 className="text-xl font-semibold text-white mt-4">Oops!</h2>
            <p className="text-gray-300 mt-2">{error}</p>
            {!token && (
              <button
                onClick={() => window.location.href = '/login'}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Go to Login
              </button>
            )}
          </div>
        ) : mentors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {mentors.map((mentor) => (
                <motion.div
                  key={mentor._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative mb-4">
                      <img
                        src={mentor.profileImage || "/default-avatar.png"}
                        alt={mentor.name || "Mentor"}
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
                        onError={(e) => {
                          e.target.src = "/default-avatar.png";
                        }}
                      />
                      {mentor.online && (
                        <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-white text-center">
                      {mentor.name || "Mentor Name"}
                    </h2>
                    <p className="text-sm text-gray-400 text-center mt-1">
                      {mentor.degree || "Mentor Degree"}
                    </p>
                    <p className="text-blue-400 text-sm font-medium mt-2">
                      {mentor.specialization || "General"}
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {(mentor.skills || []).slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 w-full flex flex-col gap-2">
                      <button 
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                        onClick={() => window.location.href = `/mentordashboard/${mentor._id}`}
                      >
                        <FiUser size={16} />
                        View Profile
                      </button>
                      <button 
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                        onClick={() => window.location.href = `/UserDashboard/message?mentorId=${mentor._id}`}
                      >
                        <FiMessageSquare size={16} />
                        Message
                      </button>
                      <button
                        onClick={() => handleUnfollow(mentor._id)}
                        disabled={unfollowingId === mentor._id}
                        className={`px-4 py-2 ${
                          unfollowingId === mentor._id 
                            ? "bg-gray-600 cursor-not-allowed" 
                            : "bg-red-500 hover:bg-red-600"
                        } text-white rounded-lg transition-colors flex items-center justify-center gap-2`}
                      >
                        {unfollowingId === mentor._id ? (
                          <FiLoader className="animate-spin" size={16} />
                        ) : (
                          <FiUserX size={16} />
                        )}
                        Unfollow
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-8 max-w-md mx-auto text-center">
            <FiUserPlus className="mx-auto text-gray-400" size={48} />
            <h2 className="text-xl font-semibold text-white mt-4">No Mentors Yet</h2>
            <p className="text-gray-400 mt-2">
              You haven't followed any mentors yet. Explore mentors to get started!
            </p>
            <button
              onClick={() => window.location.href = '/#/explorementor'}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Explore Mentors
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default MyMentor;