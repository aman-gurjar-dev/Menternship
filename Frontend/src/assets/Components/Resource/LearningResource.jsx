import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMap, FaYoutube, FaFilePdf, FaBook, FaNewspaper, FaGraduationCap } from "react-icons/fa";

const learningResources = [
  {
    title: "Web Development",
    description: "Learn HTML, CSS, JavaScript, React, and more.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    key: "web-development",
    bgColor: "bg-gradient-to-r from-purple-400 to-pink-500",
  },
  {
    title: "AWS",
    description: "Master AWS cloud services and cloud computing.",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop",
    key: "aws",
    bgColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
  {
    title: "AI/ML",
    description: "Deep dive into Artificial Intelligence & Machine Learning.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    key: "ai-ml",
    bgColor: "bg-gradient-to-r from-blue-400 to-indigo-500",
  },
  {
    title: "Data Science",
    description: "Learn Python, statistics, and data visualization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    key: "data-science",
    bgColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
  {
    title: "Cybersecurity",
    description: "Understand ethical hacking, security analysis & more.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    key: "cybersecurity",
    bgColor: "bg-gradient-to-r from-purple-400 to-pink-500",
  },
  {
    title: "Blockchain",
    description: "Explore blockchain technology and smart contracts.",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2072&auto=format&fit=crop",
    key: "blockchain",
    bgColor: "bg-gradient-to-r from-blue-400 to-indigo-500",
  },
];

const resourceTypes = [
  {
    name: "YouTube Videos",
    icon: <FaYoutube className="text-2xl" />,
    bgColor: "bg-[#477CD6]",
    path: "ytResource"
  },
  {
    name: "Ebooks",
    icon: <FaBook className="text-2xl" />,
    bgColor: "bg-[#477CD6]",
    path: "Ebook"
  },
  {
    name: "PDFs",
    icon: <FaFilePdf className="text-2xl" />,
    bgColor: "bg-[#477CD6]",
    path: "pdf"
  },
  {
    name: "Roadmaps",
    icon: <FaMap className="text-2xl" />,
    bgColor: "bg-[#477CD6]",
    path: "roadmap"
  },
  {
    name: "Articles",
    icon: <FaNewspaper className="text-2xl" />,
    bgColor: "bg-[#477CD6]",
    path: "articles"
  },
  {
    name: "Courses",
    icon: <FaGraduationCap className="text-2xl" />,
    bgColor: "bg-[#477CD6]",
    path: "courses"
  }
];

const LearningResource = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine mode based on the current route
  let mode = "Youtube"; // Default mode
  if (location.pathname.includes("Ebook")) {
    mode = "ebook";
  } else if (location.pathname.includes("pdf")) {
    mode = "pdf";
  } else if (location.pathname.includes("roadmap")) {
    mode = "roadmap";
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-4 md:p-8">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#38BDF8] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#818CF8] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#F472B6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 md:mb-12"
        >
          Explore {mode} Content
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {learningResources.map((resource, index) => {
            let targetRoute = `/learningResources/ytResource/${resource.key}`; // Default: YouTube

            if (mode === "ebook") {
              targetRoute = `/learningResources/Ebook/${resource.key}`;
            } else if (mode === "pdf") {
              targetRoute = `/learningResources/pdf/${resource.key}`;
            } else if (mode === "roadmap") {
              targetRoute = `/learningResources/roadmap/${resource.key}`;
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ${resource.bgColor}`}
              >
                <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 md:p-6 text-white">
                  <h2 className="text-xl md:text-2xl font-semibold mb-2">{resource.title}</h2>
                  <p className="text-white/80 text-sm md:text-base mb-4">{resource.description}</p>
                  <button
                    onClick={() => navigate(targetRoute)}
                    className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Explore Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningResource;
