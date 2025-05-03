import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import config from "../../utils/config";
import { FiSend } from "react-icons/fi";
import { BsCheck2All, BsMoon, BsSun } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { io } from "socket.io-client";

dayjs.extend(relativeTime);

const ChatPage = () => {
  const [allMessages, setAllMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [userType, setUserType] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const token = localStorage.getItem("token");
  const messagesEndRef = useRef(null);
  const socket = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const ellipses = document.querySelectorAll('img[src*="Ellipse"]');
    ellipses.forEach(el => el.remove());
  }, []);

  useEffect(() => {
    const fetchUserTypeAndContacts = async () => {
      try {
        const userResponse = await axios.get(`${config.backendUrl}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { userType, _id } = userResponse.data;
        setUserType(userType);
        setCurrentUserId(_id);

        if (userType === "Mentor") {
          const response = await axios.get(`${config.backendUrl}/api/mentors/followers`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setContacts(response.data.followers || []);
        } else {
          const response = await axios.get(`${config.backendUrl}/api/students/followedMentors`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setContacts(response.data.followedMentors || []);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) fetchUserTypeAndContacts();
  }, [token]);

  // Set default selected contact when contacts change
  useEffect(() => {
    if (contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts, selectedContact]);

  useEffect(() => {
    if (!currentUserId) return;

    socket.current = io("http://localhost:3001");

    socket.current.on("receiveMessage", (message) => {
      const partnerId =
        message.sender === currentUserId ? message.receiver : message.sender;

      setAllMessages((prev) => ({
        ...prev,
        [partnerId]: [...(prev[partnerId] || []), message],
      }));
    });

    return () => {
      socket.current.disconnect();
    };
  }, [currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedContact?._id) return;

      try {
        const response = await axios.get(
          `${config.backendUrl}/api/messages/${selectedContact._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setAllMessages((prev) => ({
          ...prev,
          [selectedContact._id]: response.data || [],
        }));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (selectedContact && token) fetchMessages();
  }, [selectedContact, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, selectedContact]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedContact?._id) return;

    const tempId = `temp-${Date.now()}`;
    const tempMessage = {
      _id: tempId,
      text: newMessage,
      sender: currentUserId,
      receiver: selectedContact._id,
      createdAt: new Date().toISOString(),
      status: "sending",
    };

    setAllMessages((prev) => ({
      ...prev,
      [selectedContact._id]: [...(prev[selectedContact._id] || []), tempMessage],
    }));

    setNewMessage("");

    try {
      const response = await axios.post(
        `${config.backendUrl}/api/messages`,
        {
          text: newMessage,
          receiver: selectedContact._id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      socket.current.emit("sendMessage", response.data);

      setAllMessages((prev) => ({
        ...prev,
        [selectedContact._id]: (prev[selectedContact._id] || []).map((msg) =>
          msg._id === tempId ? response.data : msg
        ),
      }));
    } catch (error) {
      console.error("Error sending message:", error);
      setAllMessages((prev) => ({
        ...prev,
        [selectedContact._id]: (prev[selectedContact._id] || []).map((msg) =>
          msg._id === tempId ? { ...msg, status: "failed" } : msg
        ),
      }));
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (userType === "student"
      ? contact.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
      : "")
  );

  const currentMessages = selectedContact ? allMessages[selectedContact._id] || [] : [];

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div className="w-1/3 border-r overflow-y-auto bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              {userType === "Mentor" ? "My Students" : "My Mentors"}
            </h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <BsSun className="text-yellow-300" />
              ) : (
                <BsMoon className="text-gray-600" />
              )}
            </button>
          </div>
          <div className="relative mt-4">
            <input
              type="text"
              placeholder={`Search ${
                userType === "Mentor" ? "students" : "mentors"
              }...`}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoIosSearch
              className="absolute left-3 top-3 text-gray-400 dark:text-gray-300"
              size={18}
            />
          </div>
        </div>

        <div>
          {filteredContacts.map((contact) => (
            <div
              key={contact._id}
              className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700 ${
                selectedContact?._id === contact._id
                  ? "bg-blue-50 dark:bg-gray-600"
                  : ""
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <img
                src={contact.profileImage || "/default-avatar.png"}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="font-semibold dark:text-white">{contact.name}</h3>
                {userType === "student" && (
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {contact.specialization}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1 relative bg-gray-50 dark:bg-gray-900">
        {selectedContact ? (
          <>
            <div className="bg-white p-4 border-b flex items-center dark:bg-gray-800 dark:border-gray-700">
              <img
                src={selectedContact.profileImage || "/default-avatar.png"}
                alt={selectedContact.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h2 className="font-semibold dark:text-white">{selectedContact.name}</h2>
                {userType === "student" && (
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {selectedContact.specialization}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2">
              {currentMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
                  <p>No messages yet</p>
                  <p className="text-sm mt-2">
                    Start the conversation with {selectedContact.name}
                  </p>
                </div>
              ) : (
                currentMessages.map((msg) => {
                  const isSentByCurrentUser = msg.sender === currentUserId;
                  return (
                    <div
                      key={`${msg._id}-${msg.createdAt}`}
                      className={`mb-3 flex ${
                        isSentByCurrentUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                          isSentByCurrentUser
                            ? msg.status === "failed"
                              ? "bg-red-500 text-white rounded-tr-none"
                              : "bg-blue-500 text-white rounded-tr-none"
                            : "bg-white text-gray-800 rounded-tl-none shadow dark:bg-gray-700 dark:text-white"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <div
                          className={`text-xs text-right mt-1 flex items-center justify-end ${
                            isSentByCurrentUser
                              ? "text-blue-200"
                              : "text-gray-400 dark:text-gray-300"
                          }`}
                        >
                          {dayjs(msg.createdAt).fromNow()}
                          {isSentByCurrentUser && (
                            <BsCheck2All
                              className={`ml-1 ${
                                msg.status === "read" ? "text-blue-300" : ""
                              }`}
                              size={14}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-white p-3 border-t sticky bottom-0 z-10 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <textarea
                  className="flex-1 p-2 border rounded-lg resize-none focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  rows={1}
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!newMessage.trim()}
                >
                  <FiSend size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <p>Select a {userType === "Mentor" ? "student" : "mentor"} to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
