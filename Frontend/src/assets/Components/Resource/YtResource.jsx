import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaYoutube, FaPlay } from "react-icons/fa";

const API_KEY = "AIzaSyDJaoTqWe10H8hMV-9ptECVMJeDsaIAXkc"; // Replace with actual API key

const playlistData = {
  "web-development": {
    title: "Web Development",
    playlistId: "PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w",
    gradient: "from-purple-400 to-pink-500",
  },
  "aws": {
    title: "AWS",
    playlistId: "PL6XT0grm_TfgtwtwUit305qS-HhDvb4du",
    gradient: "from-yellow-400 to-orange-500",
  },
  "ai-ml": {
    title: "AI & ML",
    playlistId: "PLV8vIYTIdSnYsdt0Dh9KkD9WFEi7nVgbe",
    gradient: "from-blue-400 to-indigo-500",
  },
  "data-science": {
    title: "Data Science",
    playlistId: "PLeo1K3hjS3us_ELKYSj_Fth2tIEkdKXvV",
    gradient: "from-yellow-400 to-orange-500",
  },
  "cybersecurity": {
    title: "Cybersecurity",
    playlistId: "PLwO5-rumi8A4J7h4Fm92TEC00gfZUk7ls",
    gradient: "from-purple-400 to-pink-500",
  },
  "blockchain": {
    title: "Blockchain",
    playlistId: "PLEiEAq2VkUUKmhU6SO2P73pTdMZnHOsDB",
    gradient: "from-blue-400 to-indigo-500",
  },
};

const YtResource = () => {
  const { topic } = useParams();
  const resource = playlistData[topic];

  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideos = async (pageToken = "") => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${resource.playlistId}&maxResults=12&pageToken=${pageToken}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.error) {
        console.error("API Error:", data.error.message);
        return;
      }

      if (!data.items || data.items.length === 0) {
        console.warn("No videos found or incorrect playlist ID.");
        return;
      }

      setVideos((prevVideos) => [...prevVideos, ...data.items]);
      setNextPageToken(data.nextPageToken || "");
    } catch (error) {
      console.error("Error fetching playlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (resource) {
      setVideos([]);
      fetchVideos();
    }
  }, [resource]);

  if (!resource) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-[#0F172A] p-4"
      >
        <div className="text-center p-8 bg-[#1E293B]/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#334155]">
          <FaYoutube className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl text-white font-bold">Resource Not Found</h2>
          <p className="text-[#94A3B8] mt-2">The requested video playlist is not available.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-4 md:p-8 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#38BDF8] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#818CF8] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#F472B6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r ${resource.gradient} bg-clip-text text-transparent`}>
            {resource.title}
          </h1>
          <p className="text-[#94A3B8] text-lg md:text-xl">Curated YouTube Playlist</p>
        </motion.div>

        {/* Selected Video Player */}
        {selectedVideoId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto mb-8"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
          </motion.div>
        )}

        {/* Video List Section */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {videos.map((video, index) => {
              const videoId = video.snippet.resourceId?.videoId || "";
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedVideoId(videoId)}
                  className="group relative bg-[#1E293B]/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer border border-[#334155] hover:border-[#38BDF8] transition-all duration-300"
                >
                  <div className="relative aspect-video">
                    <img
                      src={video.snippet.thumbnails.high.url}
                      alt={video.snippet.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <FaPlay className="text-4xl text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm md:text-base font-medium text-white line-clamp-2">
                      {video.snippet.title}
                    </h3>
                    <p className="text-[#94A3B8] text-xs mt-2">
                      {new Date(video.snippet.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Load More Button */}
          {nextPageToken && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={() => fetchVideos(nextPageToken)}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Videos
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YtResource;