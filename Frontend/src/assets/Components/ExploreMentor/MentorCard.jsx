import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FiMessageSquare,
  FiUserPlus,
  FiUserMinus,
  FiExternalLink,
  FiLoader,
} from "react-icons/fi";
import { IoCheckmarkDone, IoWarning } from "react-icons/io5";
import { RiMoonClearLine } from "react-icons/ri";

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [followedMentors, setFollowedMentors] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showFullBio, setShowFullBio] = useState(false);
  const timeoutRef = useRef(null);

  const showMessage = (msg, duration = 3000) => {
    setMessage(msg);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMessage(""), duration);
  };

  const bioText = mentor?.bio || "No biography available";
  const displayBio = showFullBio
    ? bioText
    : `${bioText.substring(0, 100)}${bioText.length > 100 ? "..." : ""}`;

  const fetchFollowedMentors = useCallback(async () => {
    if (!token || !mentor?._id) return;

    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/followedMentors",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const mentors = data?.followedMentors || [];
      setFollowedMentors(mentors);
      const followed = mentors.some((m) => m._id === mentor._id);
      setIsFollowed(followed);
    } catch (err) {
      console.error("Error fetching followed mentors:", err);
    }
  }, [token, mentor?._id]);

  useEffect(() => {
    fetchFollowedMentors();
    return () => clearTimeout(timeoutRef.current);
  }, [fetchFollowedMentors]);

  const handleFollowToggle = async () => {
    if (!token) {
      showMessage("Please login to follow mentors");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:3000/api/followMentor/${mentor._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedFollow = !isFollowed;
      setIsFollowed(updatedFollow);

      setFollowedMentors((prev) =>
        updatedFollow
          ? [...prev, mentor]
          : prev.filter((m) => m._id !== mentor._id)
      );

      showMessage(updatedFollow ? "Mentor followed!" : "Mentor unfollowed");
    } catch (error) {
      console.error("Error updating follow status:", error.response?.data || error.message);
      showMessage("Failed to update follow status");
    } finally {
      setLoading(false);
    }
  };

  const handleChatClick = () => {
    if (isFollowed) {
      localStorage.setItem("chatMentorId", mentor._id);
      navigate("/UserDashboard/message");
    } else {
      showMessage("Follow the mentor first to start chatting");
    }
  };

  const handleExplore = () => navigate(`/mentordashboard/${mentor._id}`);

  if (!mentor?._id) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl transition-shadow relative z-10"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-4 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-700 shadow-md"
          >
            <img
              src={mentor.profileImage || "/default-avatar.png"}
              alt={`${mentor.name}`}
              className="w-full h-full object-cover"
            />
            {mentor.online && (
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-700"></div>
            )}
          </motion.div>
        </div>

        <div className="w-full md:w-2/3 p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <RiMoonClearLine className="text-purple-500 mr-2" size={18} />
                <h2 className="text-xl font-bold text-gray-100">{mentor.name || "Unknown Mentor"}</h2>
              </div>
              <p className="text-gray-400 font-medium">{mentor.expertise?.join(', ') || "No expertise specified"}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  mentor.online
                    ? "bg-green-900 text-green-300"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {mentor.online ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-gray-300 text-sm">
              {displayBio}
              {bioText.length > 100 && (
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="ml-1 text-purple-400 hover:underline text-sm"
                >
                  {showFullBio ? "Show less" : "Read more"}
                </button>
              )}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(mentor.skills || []).slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              onClick={handleFollowToggle}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isFollowed
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-purple-900 text-purple-100 hover:bg-purple-800"
              } ${loading ? "opacity-70" : ""}`}
            >
              {loading ? (
                <FiLoader className="animate-spin" />
              ) : isFollowed ? (
                <>
                  <FiUserMinus /> Unfollow
                </>
              ) : (
                <>
                  <FiUserPlus /> Follow
                </>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleChatClick}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium ${
                isFollowed
                  ? "bg-green-900 text-green-100 hover:bg-green-800"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <FiMessageSquare /> Chat
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleExplore}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-900 text-blue-100 rounded-lg font-medium hover:bg-blue-800"
            >
              <FiExternalLink /> Profile
            </motion.button>
          </div>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`mt-3 px-3 py-2 text-sm rounded-md flex items-center gap-2 ${
                  message.includes("Follow") || message.includes("unfollowed")
                    ? "bg-blue-900 text-blue-100"
                    : message.includes("chat")
                    ? "bg-yellow-900 text-yellow-100"
                    : "bg-red-900 text-red-100"
                }`}
              >
                {message.includes("Failed") ? <IoWarning /> : <IoCheckmarkDone />}
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default MentorCard;