import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Mic, Smile, ChevronDown, Search, Circle, CheckCircle } from 'react-feather';
import { Avatar, Badge } from '../components/ui';
import { useGetMentorConversations } from '../hooks/useMentorChat';

const MentorChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const { conversations, loading, error } = useGetMentorConversations();

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conv => 
    conv.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage?.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;
    
    // Send message logic here
    console.log(`Sending to ${activeChat.student.name}: ${message}`);
    
    // Clear input after sending
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Conversation List */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
          <div className="mt-3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search conversations"
              className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-red-500 text-sm">{error}</div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${activeChat?.id === conversation.id ? 'bg-blue-50' : ''}`}
                onClick={() => setActiveChat(conversation)}
              >
                <div className="relative">
                  <Avatar 
                    src={conversation.student.avatar} 
                    alt={conversation.student.name}
                    size="md"
                  />
                  <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${conversation.student.online ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.student.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(conversation.lastMessage?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage?.content || 'No messages yet'}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <Badge count={conversation.unreadCount} />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <Avatar 
                    src={activeChat.student.avatar} 
                    alt={activeChat.student.name}
                    size="md"
                  />
                  <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${activeChat.student.online ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {activeChat.student.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {activeChat.student.online ? 'Online' : 'Offline'}
                    {activeChat.student.course && ` • ${activeChat.student.course}`}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {activeChat.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'mentor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${msg.sender === 'mentor' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <div className={`flex items-center mt-1 text-xs ${msg.sender === 'mentor' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {msg.sender === 'mentor' && (
                          <span className="ml-1">
                            {msg.read ? (
                              <CheckCircle className="h-3 w-3 inline" />
                            ) : (
                              <Circle className="h-3 w-3 inline" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Paperclip className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Smile className="h-5 w-5" />
                </button>
                <div className="flex-1 mx-2">
                  <textarea
                    rows="1"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <button
                  className={`p-2 rounded-full ${message.trim() ? 'text-blue-500 hover:text-blue-600' : 'text-gray-400'}`}
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  {message.trim() ? (
                    <Send className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
            <div className="text-center p-6 max-w-md">
              <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
              <p className="text-gray-500 text-sm">
                Choose a conversation from the sidebar or start a new one with a student
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorChatPage;