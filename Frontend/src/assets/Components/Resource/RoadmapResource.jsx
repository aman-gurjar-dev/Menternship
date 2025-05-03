import React from "react";
import { useParams } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";

// ✅ Set the correct worker source
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const RoadmapResource = {
  "web-development": "/Roadmap/webdev.pdf",
  "aws": "/Roadmap/aws.pdf",
  "ai-ml": "/Roadmap/AiMl.pdf",
  "data-science": "/Roadmap/dataScience.pdf",
  "cybersecurity": "/Roadmap/cyber.pdf",
  "blockchain": "/Roadmap/blockchain.pdf",
};

const RoadmapResources = () => {
  const { topic } = useParams();

  // ✅ Always initialize the hook at the top level
  const pdfLayoutPluginInstance = defaultLayoutPlugin();

  const selectedPdf = RoadmapResource[topic];

  if (!selectedPdf) {
    return <h2 className="text-center text-red-500 mt-10">PDF Not Found</h2>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black relative z-10">
      <h2 className="text-5xl font-extrabold mb-8 capitalize">{topic.replace("-", " ")}</h2>
      <div className="w-[1000px] h-[500px] border-2 border-gray-500 rounded-lg bg-white shadow-lg p-4">
        <Viewer fileUrl={selectedPdf} plugins={[pdfLayoutPluginInstance]} />
      </div>
    </div>
  );
};

export default RoadmapResources;
