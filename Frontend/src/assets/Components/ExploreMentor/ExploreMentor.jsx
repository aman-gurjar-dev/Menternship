import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MentorCard from "./MentorCard";
import axios from "axios";
import { FiSearch, FiLoader, FiAlertCircle, FiUsers, FiFilter } from "react-icons/fi";
import { RiMoonClearLine } from "react-icons/ri";

const ExploreMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [followedMentors, setFollowedMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("");
  const token = localStorage.getItem("token");

  const fetchFollowedMentors = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await axios.get("http://localhost:3000/api/followedMentors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data?.followedMentors) setFollowedMentors(data.followedMentors);
    } catch (err) {
      console.error("Error fetching followed mentors:", err);
    }
  }, [token]);

  useEffect(() => {
    let isMounted = true;
  
    const fetchMentors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/mentors");
        
        if (!Array.isArray(response.data)) throw new Error("Data is not an array");
  
        if (isMounted) setMentors(response.data);
      } catch (err) {
        console.error("Error Fetching Mentors:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    fetchMentors();
    fetchFollowedMentors();
  
    return () => {
      isMounted = false;
    };
  }, [fetchFollowedMentors]);

  // Safe filtering function
  const filteredMentors = mentors.filter(mentor => {
    try {
      const nameMatch = mentor.name?.toLowerCase?.().includes(searchTerm.toLowerCase()) || false;
      const specializationMatch = mentor.specialization?.toLowerCase?.().includes(searchTerm.toLowerCase()) || false;
      const matchesSearch = nameMatch || specializationMatch;
      
      const matchesSpecialization = filterSpecialization ? 
        String(mentor.specialization || '').toLowerCase() === filterSpecialization.toLowerCase() : true;
      
      return matchesSearch && matchesSpecialization;
    } catch (err) {
      console.error("Error filtering mentor:", mentor, err);
      return false;
    }
  });

  // Get unique specializations for filter dropdown
  const specializations = [...new Set(
    mentors
      .map(mentor => mentor.specialization)
      .filter(spec => typeof spec === 'string' && spec.trim() !== '')
  )];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="mb-4"
        >
          <FiLoader className="text-purple-500" size={32} />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-medium text-gray-300"
        >
          Loading mentors...
        </motion.h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full text-center border border-gray-700">
          <FiAlertCircle className="mx-auto text-red-400" size={48} />
          <h1 className="text-2xl font-bold text-gray-100 mt-4">Oops!</h1>
          <p className="text-red-400 mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <RiMoonClearLine className="text-purple-500 mr-2" size={24} />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-100">
              Explore Expert Mentors
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Find the perfect mentor to illuminate your path
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-800 rounded-xl shadow-md p-4 mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search mentors by name or expertise..."
                className="pl-10 pr-4 py-2 w-full bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-500" />
              </div>
              <select
                value={filterSpecialization}
                onChange={(e) => setFilterSpecialization(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-200 w-full md:w-48"
              >
                <option value="" className="bg-gray-800">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec} className="bg-gray-800">{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mentors Grid Container with Scroll */}
        <div className="max-h-[calc(100vh-220px)] overflow-y-auto pr-2 custom-scrollbar-dark">
          {/* Mentors Grid */}
          {filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 pb-4">
              <AnimatePresence>
                {filteredMentors.map((mentor) => (
                  <MentorCard
                    key={mentor._id}
                    mentor={mentor}
                    followedMentors={followedMentors}
                    setFollowedMentors={setFollowedMentors}
                    darkMode={true}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl shadow-md p-8 text-center border border-gray-700">
              <FiUsers className="mx-auto text-gray-500" size={48} />
              <h2 className="text-xl font-semibold text-gray-200 mt-4">
                No mentors found
              </h2>
              <p className="text-gray-400 mt-2">
                {searchTerm || filterSpecialization 
                  ? "Try adjusting your search criteria" 
                  : "No mentors available at the moment"}
              </p>
              {(searchTerm || filterSpecialization) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterSpecialization("");
                  }}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Custom dark scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar-dark::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-track {
          background: #2d3748;
          border-radius: 10px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb {
          background: #4a5568;
          border-radius: 10px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
      `}</style>
    </div>
  );
};

export default ExploreMentor;