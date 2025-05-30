import React, { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import MyImage from "../../Images/logo.png";
import { motion } from "framer-motion";

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
    "web development": "For web development, I recommend:\n1. Start with HTML, CSS, and JavaScript\n2. Learn a framework like React or Angular\n3. Practice with real projects\n4. Build a portfolio\n5. Contribute to open source\nWould you like specific learning resources?",
    "aws": "For AWS learning path:\n1. Start with AWS Cloud Practitioner\n2. Learn core services (EC2, S3, Lambda)\n3. Practice with hands-on labs\n4. Consider AWS Solutions Architect\n5. Get certified\nNeed specific AWS resources?",
    "ai": "For AI/ML learning:\n1. Master Python and math fundamentals\n2. Learn ML libraries (TensorFlow, PyTorch)\n3. Study algorithms and data structures\n4. Work on AI projects\n5. Join AI communities\nWant specific AI learning resources?",
    "data science": "For data science:\n1. Learn Python and R\n2. Master statistics and math\n3. Study data visualization\n4. Practice with real datasets\n5. Learn ML algorithms\nNeed data science resources?",
    "cybersecurity": "For cybersecurity:\n1. Learn networking basics\n2. Study security fundamentals\n3. Practice ethical hacking\n4. Get security certifications\n5. Join security communities\nWant cybersecurity resources?",
    "blockchain": "For blockchain development:\n1. Learn cryptography basics\n2. Study blockchain architecture\n3. Master Solidity for smart contracts\n4. Practice with test networks\n5. Build DApps\nNeed blockchain resources?",
    "default": "I specialize in mentorship topics. Try asking about:\n- Finding mentors\n- Career advancement\n- Skill development\n- Interview preparation\n- Professional growth strategies"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Check for exact matches first
    for (const key in knowledgeBase) {
      if (lowerInput === key) {
        return knowledgeBase[key];
      }
    }
    
    // Check for partial matches with context
    const contextMatches = [];
    for (const key in knowledgeBase) {
      if (lowerInput.includes(key)) {
        contextMatches.push(key);
      }
    }

    if (contextMatches.length > 0) {
      // If multiple matches, provide a combined response
      if (contextMatches.length > 1) {
        return `I notice you're interested in multiple topics. Let me help you with each:\n\n${contextMatches.map(topic => knowledgeBase[topic]).join('\n\n')}`;
      }
      return knowledgeBase[contextMatches[0]];
    }

    // Handle special cases
    if (lowerInput.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    if (lowerInput.includes("bye") || lowerInput.includes("goodbye")) {
      return "Goodbye! Feel free to return anytime you need mentorship advice.";
    }

    // If no matches found, provide a contextual response with suggestions
    return "I understand you're asking about something specific. While I can help with general mentorship topics, for more detailed guidance, I recommend:\n\n1. Using the 'Explore Mentors' feature to connect with experienced professionals\n2. Checking our resources section for detailed guides\n3. Asking specific questions about career development, skill building, or mentorship\n\nWhat would you like to know more about?";
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

    // Simulate a small delay for more natural interaction
    setTimeout(() => {
      const botResponse = getAIResponse(inputMessage);
      setMessages(prev => [...prev, {
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }, 500);
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
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
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#2D2D3A] text-white p-3 rounded-2xl rounded-bl-none max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </motion.div>
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
                onKeyPress={handleKeyPress}
                className="flex-1 p-2 rounded-md text-white bg-[#2D2D3A] focus:outline-none focus:ring-2 focus:ring-[#477CD6]"
                placeholder="Type your message..."
              />
              <button 
                type="submit" 
                className="bg-[#477CD6] px-4 py-2 rounded-md hover:bg-[#3B6BC4] transition-colors"
                disabled={isLoading}
              >
                <FiSend />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
