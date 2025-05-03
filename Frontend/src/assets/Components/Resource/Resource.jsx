import React from "react";
import { motion } from "framer-motion"; // Added this import
import { FaYoutube, FaFilePdf, FaBook, FaMap } from "react-icons/fa";
import { RiMoonClearLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const resources = [
    {
        title: "Roadmap",
        description: "Follow step-by-step guides to master new skills.",
        icon: <FaMap className="text-purple-400 text-5xl" />,
        link: "/learningResources/roadmap",
        bgColor: "bg-gradient-to-br from-purple-900/80 to-purple-700/80",
        borderColor: "border-purple-500",
    },
    {
        title: "YouTube Resources",
        description: "Access a curated list of YouTube videos for learning.",
        icon: <FaYoutube className="text-red-400 text-5xl" />,
        link: "/learningResources/Youtube",
        bgColor: "bg-gradient-to-br from-red-900/80 to-red-700/80",
        borderColor: "border-red-500",
    },
    {
        title: "PDF Resources",
        description: "Download and read high-quality educational PDFs.",
        icon: <FaFilePdf className="text-blue-400 text-5xl" />,
        link: "/learningResources/pdf",
        bgColor: "bg-gradient-to-br from-blue-900/80 to-blue-700/80",
        borderColor: "border-blue-500",
    },
    {
        title: "E-Books",
        description: "A collection of ebooks to enhance your learning.",
        icon: <FaBook className="text-green-400 text-5xl" />,
        link: "/learningResources/Ebook",
        bgColor: "bg-gradient-to-br from-green-900/80 to-green-700/80",
        borderColor: "border-green-500",
    },
];

const Resources = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header with moon icon */}
        <div className="flex items-center justify-center mb-10">
          <RiMoonClearLine className="text-purple-500 mr-3" size={36} />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 text-center">
            Learning Resources
          </h1>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`h-full min-h-[300px] rounded-xl shadow-lg border ${resource.borderColor} ${resource.bgColor} overflow-hidden flex flex-col p-6 transition-all duration-300 hover:shadow-xl`}
            >
              <div className="flex justify-center mb-6">
                {resource.icon}
              </div>
              <h2 className="text-2xl font-semibold text-gray-100 text-center mb-3">
                {resource.title}
              </h2>
              <p className="text-gray-300 text-center mb-8 flex-grow">
                {resource.description}
              </p>
              <button
                onClick={() => navigate(resource.link)}
                className={`w-full py-3 px-4 rounded-lg font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2`}
              >
                Explore Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-900 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-900 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-green-900 rounded-full filter blur-3xl opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default Resources;