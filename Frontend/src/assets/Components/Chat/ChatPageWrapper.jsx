import React from "react";
import { useParams } from "react-router-dom";
import ChatPage from "./ChatPage";

const ChatPageWrapper = () => {
  const { id } = useParams(); // Grab mentor ID from URL
  const token = localStorage.getItem("token"); // Get token from local storage

  return <ChatPage mentorId={id} token={token} />;
};

export default ChatPageWrapper;
