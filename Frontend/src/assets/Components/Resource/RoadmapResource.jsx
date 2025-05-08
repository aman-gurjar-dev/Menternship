import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";

// Set correct worker source for Vercel
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const RoadmapResource = {
  "web-development": "webdev.pdf",
  "aws": "aws.pdf",
  "ai-ml": "AiMl.pdf",
  "data-science": "dataScience.pdf",
  "cybersecurity": "cyber.pdf",
  "blockchain": "blockchain.pdf",
};

const RoadmapResources = () => {
  const { topic } = useParams();
  const [pdfError, setPdfError] = useState(null);

  const pdfLayoutPluginInstance = defaultLayoutPlugin();
  const selectedPdf = RoadmapResource[topic];

  const handlePdfError = (error) => {
    console.error('PDF Error:', error);
    setPdfError(error.message || 'Failed to load PDF');
  };

  if (!selectedPdf) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-[#0F172A] p-4"
      >
        <div className="text-center p-8 bg-[#1E293B]/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#334155]">
          <FaFilePdf className="text-6xl text-[#38BDF8] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl text-white font-bold">PDF Not Found</h2>
          <p className="text-[#94A3B8] mt-2">The requested roadmap is not available.</p>
        </div>
      </motion.div>
    );
  }

  if (pdfError) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-[#0F172A] p-4"
      >
        <div className="text-center p-6 md:p-8 bg-[#1E293B]/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#334155] max-w-[90%] md:max-w-md">
          <FaFilePdf className="text-6xl text-[#F87171] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Error Loading PDF
          </h2>
          <p className="text-[#94A3B8] text-sm md:text-base">
            {pdfError}
          </p>
        </div>
      </motion.div>
    );
  }

  // Construct the PDF URL based on the environment
  const pdfUrl = import.meta.env.DEV 
    ? `/Roadmap/${selectedPdf}`  // Development environment
    : `${process.env.PUBLIC_URL || ''}/Roadmap/${selectedPdf}`; // Production environment

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-white relative z-10 p-4"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#38BDF8] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#818CF8] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#F472B6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-center mb-8"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 capitalize bg-clip-text text-transparent bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#F472B6]">
          {topic.replace("-", " ")}
        </h2>
        <p className="text-[#94A3B8] text-lg md:text-xl">Your Learning Roadmap</p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-[1000px] h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl bg-[#1E293B]/50 backdrop-blur-lg shadow-2xl border border-[#334155] p-2 md:p-4 relative z-10"
      >
        <Viewer 
          fileUrl={pdfUrl}
          plugins={[pdfLayoutPluginInstance]}
          onError={handlePdfError}
        />
      </motion.div>
    </motion.div>
  );
};

export default RoadmapResources;
