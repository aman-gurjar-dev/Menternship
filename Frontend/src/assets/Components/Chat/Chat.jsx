import React, { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import MyImage from "../../Images/logo.png";
import axios from "axios";
import config from "../../utils/config";

const Chat = () => {
  useEffect(() => {
    const ellipses = document.querySelectorAll('img[src*="Ellipse"]');
    ellipses.forEach(el => el.remove());
  }, []);

  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Menternship AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [activeTab, setActiveTab] = useState("1:1 Mentorship");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const knowledgeBase = {
    "hello": "Hello there! I can help with career advice, technical skills, and professional development. What would you like to discuss?",
    "hi": "Hi! Welcome to Menternship. I specialize in mentorship topics - ask me anything about career growth or skill development.",
    "help": "I can assist with:\n- Finding suitable mentors\n- Career path guidance\n- Technical skill development\n- Interview preparation\n- Professional networking\nWhat do you need help with?",
    "mentor": "To connect with mentors:\n1. Visit 'Explore Mentors'\n2. Search by skills or industry\n3. Follow mentors you're interested in\n4. Message them after they accept your request",
    "career": "For career advice, consider:\n- Identifying your strengths\n- Researching growth industries\n- Setting short/long-term goals\n- Developing both technical and soft skills\nWhat specific career questions do you have?",
    "interview": "Interview preparation tips:\n1. Research the company thoroughly\n2. Practice common technical questions\n3. Prepare examples of your work\n4. Develop thoughtful questions to ask\n5. Do mock interviews with peers\nWould you like practice questions?",
    "skills": "For skill development:\n1. Identify in-demand skills in your field\n2. Set clear learning goals\n3. Use online courses and projects\n4. Get feedback from mentors\n5. Apply skills in real-world scenarios\nWhich skills are you working on?",
    "default": "I specialize in mentorship topics. Try asking about:\n- Finding mentors\n- Career advancement\n- Skill development\n- Interview preparation\n- Professional growth strategies"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getLocalAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    for (const key in knowledgeBase) {
      if (lowerInput.includes(key)) {
        return knowledgeBase[key];
      }
    }
    return knowledgeBase.default;
  };

  // ✅ HuggingFace API Integration
  const sendToHuggingFace = async (message) => {
    const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY; // Fetch API key from .env file
  
    if (!API_KEY) {
      console.warn("Missing Hugging Face API key.");
      return "AI configuration is missing. Please try again later.";
    }
  
    const API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";
  
    const headers = {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    };
  
    try {
      const response = await axios.post(
        `${config.backendUrl}/api/messages`,
        { inputs: message },
        { headers }
      );
  
      const generatedText = response.data?.[0]?.generated_text;
      const reply = generatedText?.replace(message, "").trim();
      return reply || "No response from AI.";
    } catch (error) {
      console.error("HuggingFace API error:", error);
      return "Sorry, Hugging Face AI is currently unavailable.";
    }
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    const localResponse = getLocalAIResponse(inputMessage);

    if (localResponse !== knowledgeBase.default) {
      setMessages(prev => [...prev, {
        text: localResponse,
        sender: "bot",
        timestamp: new Date()
      }]);
      setIsLoading(false);
      return;
    }

    const botResponse = await sendToHuggingFace(inputMessage);
    setMessages(prev => [...prev, {
      text: botResponse,
      sender: "bot",
      timestamp: new Date()
    }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1A171E] text-white overflow-hidden relative z-10">
      <div className="p-4">
        <img src={MyImage} alt="LOGO" className="h-12" />
      </div>

      <div className="flex-1 flex flex-col p-4 max-w-4xl w-full mx-auto">
        <div className="bg-[#CEC8C884] rounded-2xl p-1 mb-4">
          <div className="flex">
            {["Announcement", "1:1 Mentorship", "Chat Bot"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "text-black hover:bg-blue-200 hover:bg-opacity-20"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4" style={{ maxHeight: "calc(100vh - 200px)" }}>
          {activeTab === "Chat Bot" ? (
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-[#477CD6] text-white rounded-br-none"
                      : "bg-[#2D2D3A] text-white rounded-bl-none"
                  }`}>
                    {message.sender === "bot" && (
                      <div className="flex items-center mb-1">
                        <BsRobot className="mr-2 text-purple-400" />
                        <span className="text-xs text-gray-300">Menternship AI</span>
                      </div>
                    )}
                    <p className="whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#2D2D3A] text-white p-3 rounded-2xl rounded-bl-none max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>Connect with mentors through the Explore page</p>
            </div>
          )}
        </div>

        {activeTab === "Chat Bot" && (
          <div className="w-full px-4 py-3 bg-[#1A171E] border-t border-gray-700">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 p-2 rounded-md text-white bg-[#2D2D3A]"
                placeholder="Type your message..."
              />
              <button type="submit" className="bg-blue-500 px-4 py-2 rounded-md">
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
