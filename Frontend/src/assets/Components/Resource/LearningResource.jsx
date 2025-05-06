import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    icon: "🎥",
    bgColor: "bg-[#477CD6]",
    path: "ytResource"
  },
  {
    name: "Ebooks",
    icon: "📚",
    bgColor: "bg-[#477CD6]",
    path: "Ebook"
  },
  {
    name: "PDFs",
    icon: "📄",
    bgColor: "bg-[#477CD6]",
    path: "pdf"
  },
  {
    name: "Roadmaps",
    icon: "🗺️",
    bgColor: "bg-[#477CD6]",
    path: "roadmap"
  },
  {
    name: "Articles",
    icon: "📝",
    bgColor: "bg-[#477CD6]",
    path: "articles"
  },
  {
    name: "Courses",
    icon: "🎓",
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
    <div className="w-full h-full overflow-auto bg-[#1A171E] p-10">
      <h1 className="text-4xl font-bold text-black text-center mb-10">Explore {mode} Content</h1>

      <div className="grid md:grid-cols-3 gap-8 place-items-center relative z-10">
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
      <div
        key={index}
        className={`shadow-lg rounded-lg overflow-hidden w-[350px] transition-transform transform hover:scale-105 ${resource.bgColor}`}
      >
        <div className="h-56 w-full overflow-hidden">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 text-center text-white">
          <h2 className="text-2xl font-semibold">{resource.title}</h2>
          <p className="mt-2">{resource.description}</p>
          <button
            onClick={() => navigate(targetRoute)}
            className="mt-4 bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
          >
            Explore Now
          </button>
        </div>
      </div>
    );
  })}
      </div>

    </div>
  );
};

export default LearningResource;
