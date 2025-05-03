import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";

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
    return <h2 className="text-center text-red-500 mt-10">PDF Not Found</h2>;
  }

  if (pdfError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-white rounded-lg border border-red-500 max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-2">
            Error Loading PDF
          </h2>
          <p className="text-gray-600">
            {pdfError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black relative z-10">
      <h2 className="text-5xl font-extrabold mb-8 capitalize">{topic.replace("-", " ")}</h2>
      <div className="w-[1000px] h-[500px] border-2 border-gray-500 rounded-lg bg-white shadow-lg p-4">
        <Viewer 
          fileUrl={`${process.env.PUBLIC_URL || ''}/Roadmap/${selectedPdf}`}
          plugins={[pdfLayoutPluginInstance]}
          onError={handlePdfError}
        />
      </div>
    </div>
  );
};

export default RoadmapResources;
