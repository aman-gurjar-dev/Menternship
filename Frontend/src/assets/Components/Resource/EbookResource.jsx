import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import { RiMoonClearLine } from "react-icons/ri";

// Set correct worker source for Vercel
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const pdfResources = {
  "web-development": "webDev.pdf",
  "aws": "Ml.pdf",
  "ai-ml": "AiMl.pdf",
  "data-science": "DataScience.pdf",
  "cybersecurity": "cyber.pdf",
  "blockchain": "blockChain.pdf",
};

const EbookResource = () => {
  const { topic } = useParams();
  const selectedPdf = pdfResources[topic];
  const pdfLayoutPlugin = defaultLayoutPlugin();
  const [pdfError, setPdfError] = useState(null);

  // Function to handle PDF loading errors
  const handlePdfError = (error) => {
    console.error('PDF Error:', error);
    setPdfError(error.message || 'Failed to load PDF');
  };

  if (!selectedPdf) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center p-6 bg-gray-800 rounded-lg border border-red-500 max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-2">
            PDF Resource Not Found
          </h2>
          <p className="text-gray-300">
            The requested ebook for "{topic.replace("-", " ")}" is not available.
          </p>
        </div>
      </div>
    );
  }

  if (pdfError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center p-6 bg-gray-800 rounded-lg border border-red-500 max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-2">
            Error Loading PDF
          </h2>
          <p className="text-gray-300">
            {pdfError}
          </p>
        </div>
      </div>
    );
  }

  // Format topic for display (capitalize and replace hyphens)
  const formattedTopic = topic
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with moon icon */}
        <div className="flex items-center justify-center mb-6 md:mb-10">
          <RiMoonClearLine className="text-purple-500 mr-3" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold">
            {formattedTopic} E-Book
          </h1>
        </div>

        {/* PDF Viewer Container */}
        <div className="w-full h-[80vh] rounded-xl overflow-hidden border border-gray-700 bg-gray-800 shadow-xl">
          <Viewer 
            fileUrl={`${process.env.PUBLIC_URL || ''}/Ebook/${selectedPdf}`}
            plugins={[pdfLayoutPlugin]}
            onError={handlePdfError}
            theme={{
              theme: 'dark',
              colors: {
                primary: '#8b5cf6', // purple-500
                primaryContent: '#ffffff',
                secondary: '#1f2937', // gray-800
                secondaryContent: '#f3f4f6', // gray-100
                background: '#111827', // gray-900
                border: '#374151', // gray-700
              }
            }}
          />
        </div>

        {/* Background decorative elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-900 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-900 rounded-full filter blur-3xl opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default EbookResource;