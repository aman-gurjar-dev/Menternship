import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "AIzaSyDJaoTqWe10H8hMV-9ptECVMJeDsaIAXkc"; // Replace with actual API key

const playlistData = {
  "web-development": {
    title: "Web Development",
    playlistId: "PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w",
  },
  "aws": {
    title: "AWS",
    playlistId: "PL6XT0grm_TfgtwtwUit305qS-HhDvb4du",
  },
  "ai-ml": {
    title: "AI & ML",
    playlistId: "PLV8vIYTIdSnYsdt0Dh9KkD9WFEi7nVgbe",
  },
  "data-science": {
    title: "Data Science",
    playlistId: "PLeo1K3hjS3us_ELKYSj_Fth2tIEkdKXvV",
  },
  "cybersecurity": {
    title: "Cybersecurity",
    playlistId: "PLwO5-rumi8A4J7h4Fm92TEC00gfZUk7ls",
  },
  "blockchain": {
    title: "Blockchain",
    playlistId: "PLEiEAq2VkUUKmhU6SO2P73pTdMZnHOsDB",
  },
};

const YtResource = () => {
  const { topic } = useParams();
  const resource = playlistData[topic];

  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const fetchVideos = async (pageToken = "") => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${resource.playlistId}&maxResults=12&pageToken=${pageToken}&key=${API_KEY}`
      );
      const data = await response.json();

      console.log("Fetched Data:", data);

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
    }
  };

  useEffect(() => {
    if (resource) {
      setVideos([]);
      fetchVideos();
    }
  }, [resource]);

  if (!resource) {
    return <h1 className="text-center text-3xl font-semibold mt-20 text-red-500">Resource Not Found</h1>;
  }

  return (
    <div className="h-screen flex flex-col items-center bg-gray-900 text-white p-10 overflow-y-auto w-full relative z-10">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">{resource.title}</h1>

      {/* Selected Video Player */}
      {selectedVideoId && (
        <div className="w-full flex justify-center mb-6">
          <iframe
            width="800"
            height="450"
            src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
            title="YouTube Video"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      )}

      {/* Video List Section - Fixed Height & Scrollable */}
      <div className="flex-1 h-[50vh] md:h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-4 border border-gray-700 rounded-lg">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => {
            const videoId = video.snippet.resourceId?.videoId || "";
            return (
              <div
                key={index}
                onClick={() => setSelectedVideoId(videoId)}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform border border-gray-700 shadow-md"
              >
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-200">{video.snippet.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Load More Button */}
      {nextPageToken && (
        <button
          className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-lg hover:bg-blue-600 transition font-bold cursor-pointer"
          onClick={() => fetchVideos(nextPageToken)}
        >
          Load More Videos
        </button>
      )}
    </div>
  );
};

export default YtResource;