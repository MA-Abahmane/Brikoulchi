import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import EmojiPicker from 'emoji-picker-react';

const WebChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserList, setShowUserList] = useState(true);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const lastMessageCountRef = useRef(0);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
      .filter(u => u.username !== user?.username)
      .map(u => ({
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        profileImage: u.profileImage,
        lastMessage: null,
        unreadCount: 0
      }));

    users.forEach(u => {
      const chatId = getChatId(user.username, u.username);
      const chatMessages = JSON.parse(localStorage.getItem(`chat_${chatId}`) || '[]');
      if (chatMessages.length > 0) {
        u.lastMessage = chatMessages[chatMessages.length - 1];
        u.unreadCount = chatMessages.filter(m => 
          m.sender !== user.username && !m.read
        ).length;
      }
    });

    users.sort((a, b) => {
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp);
    });

    setChatUsers(users);
  }, [user]);

  useEffect(() => {
    if (selectedUser) {
      const chatId = getChatId(user.username, selectedUser.username);
      const chatMessages = JSON.parse(localStorage.getItem(`chat_${chatId}`) || '[]');
      
      const updatedMessages = chatMessages.map(msg => ({
        ...msg,
        read: msg.sender !== user.username ? true : msg.read
      }));
      
      localStorage.setItem(`chat_${chatId}`, JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
      lastMessageCountRef.current = updatedMessages.length;
      setShowUserList(false);
      setShouldAutoScroll(true);
    }
  }, [selectedUser, user]);

  // Handle scroll detection
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShouldAutoScroll(isAtBottom);
    }
  };

  // Optimized message refresh without forcing scroll
  useEffect(() => {
    if (!selectedUser) return;

    const interval = setInterval(() => {
      const chatId = getChatId(user.username, selectedUser.username);
      const chatMessages = JSON.parse(localStorage.getItem(`chat_${chatId}`) || '[]');
      
      // Only update if there are new messages
      if (chatMessages.length !== lastMessageCountRef.current) {
        const wasAtBottom = shouldAutoScroll;
        setMessages(chatMessages);
        lastMessageCountRef.current = chatMessages.length;
        
        // Only auto-scroll if user was at bottom or if it's their own message
        if (wasAtBottom || (chatMessages.length > 0 && chatMessages[chatMessages.length - 1].sender === user.username)) {
          setTimeout(scrollToBottom, 100);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedUser, user, shouldAutoScroll]);

  const scrollToBottom = () => {
    if (chatContainerRef.current && shouldAutoScroll) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const getChatId = (user1, user2) => {
    return [user1, user2].sort().join('_');
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if ((!newMessage.trim() && !selectedImage) || !selectedUser) return;

    const chatId = getChatId(user.username, selectedUser.username);
    const messageObj = {
      id: Date.now(),
      sender: user.username,
      content: newMessage.trim(),
      image: selectedImage,
      timestamp: new Date().toISOString(),
      read: false
    };

    const updatedMessages = [...messages, messageObj];
    setMessages(updatedMessages);
    localStorage.setItem(`chat_${chatId}`, JSON.stringify(updatedMessages));
    lastMessageCountRef.current = updatedMessages.length;

    setNewMessage('');
    setSelectedImage(null);
    setShowEmojiPicker(false);
    setShouldAutoScroll(true);
    
    setTimeout(scrollToBottom, 100);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setNewMessage(prev => prev + emojiObject.emoji);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden h-[85vh] flex relative">
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50 px-4 py-3 border-b shadow-sm">
          {selectedUser ? (
            <div className="flex items-center">
              <button 
                onClick={() => setShowUserList(true)}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <i className="fas fa-arrow-left text-primary"></i>
              </button>
              <div className="flex items-center">
                {selectedUser.profileImage ? (
                  <img 
                    src={selectedUser.profileImage} 
                    alt={selectedUser.firstName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </div>
                )}
                <div className="ml-3">
                  <span className="font-semibold text-gray-800">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </span>
                  <div className="text-xs text-gray-500">@{selectedUser.username}</div>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-xl font-bold text-primary">Messages</h1>
          )}
        </div>

        {/* Users List */}
        <div className={`${showUserList ? 'block' : 'hidden'} md:block w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 bg-gradient-to-b from-gray-50 to-white flex-shrink-0`}>
          <div className="p-6 border-b border-gray-200 bg-white hidden md:block">
            <h2 className="text-xl font-bold text-primary">Messages</h2>
            <p className="text-sm text-gray-500 mt-1">Connect with service providers</p>
          </div>
          <div className="overflow-y-auto h-[calc(85vh-5rem)] md:h-[calc(85vh-6rem)]">
            {chatUsers.length > 0 ? (
              chatUsers.map(chatUser => (
                <div
                  key={chatUser.username}
                  onClick={() => setSelectedUser(chatUser)}
                  className={`p-4 cursor-pointer hover:bg-white/80 transition-all duration-200 border-b border-gray-100 ${
                    selectedUser?.username === chatUser.username ? 'bg-white shadow-sm border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-center">
                    {chatUser.profileImage ? (
                      <img 
                        src={chatUser.profileImage} 
                        alt={chatUser.firstName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                        {chatUser.firstName[0]}{chatUser.lastName[0]}
                      </div>
                    )}
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-800 truncate">
                          {chatUser.firstName} {chatUser.lastName}
                        </p>
                        {chatUser.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {chatUser.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-1">@{chatUser.username}</p>
                      {chatUser.lastMessage && (
                        <p className="text-sm text-gray-600 truncate">
                          {chatUser.lastMessage.content || '📷 Image'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <i className="fas fa-users text-3xl mb-3"></i>
                <p>No users to chat with yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${!showUserList ? 'block' : 'hidden'} md:block flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-white min-w-0`}>
          {selectedUser ? (
            <>
              {/* Chat Header (Desktop) */}
              <div className="p-4 border-b border-gray-200 bg-white hidden md:block flex-shrink-0 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {selectedUser.profileImage ? (
                      <img 
                        src={selectedUser.profileImage} 
                        alt={selectedUser.firstName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                        {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                      </div>
                    )}
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800 text-lg">
                        {selectedUser.firstName} {selectedUser.lastName}
                      </p>
                      <p className="text-sm text-gray-500">@{selectedUser.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-500">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 flex flex-col min-h-0">
                {/* Messages */}
                <div 
                  ref={chatContainerRef}
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                  style={{ maxHeight: selectedImage ? 'calc(85vh - 280px)' : 'calc(85vh - 180px)' }}
                >
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === user.username ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[75%] lg:max-w-[60%] rounded-2xl p-3 shadow-sm ${
                          message.sender === user.username
                            ? 'bg-gradient-to-r from-primary to-secondary text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                      >
                        {message.image && (
                          <img
                            src={message.image}
                            alt="Shared"
                            className="max-w-full rounded-xl mb-2 shadow-sm"
                            style={{ maxHeight: '300px', objectFit: 'cover' }}
                          />
                        )}
                        {message.content && <p className="leading-relaxed">{message.content}</p>}
                        <div className="flex items-center justify-end gap-2 mt-2">
                          <span className="text-xs opacity-75">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {message.sender === user.username && (
                            <i className={`fas fa-check-double text-xs ${message.read ? 'text-blue-300' : 'opacity-75'}`}></i>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area - Fixed at bottom */}
                <div className="bg-white border-t border-gray-200 flex-shrink-0 relative">
                  {/* Emoji Picker */}
                  {showEmojiPicker && (
                    <div className="absolute bottom-full right-4 mb-2 z-50 shadow-2xl rounded-lg overflow-hidden">
                      <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                  )}

                  {/* Image Preview - Fixed positioning */}
                  {selectedImage && (
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Image ready to send:</span>
                        <button
                          onClick={() => setSelectedImage(null)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                      <div className="mt-2 relative inline-block">
                        <img
                          src={selectedImage}
                          alt="Selected"
                          className="max-h-32 rounded-lg shadow-sm border border-gray-200"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Input Form */}
                  <div className="p-4">
                    <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full transition-all duration-200 flex-shrink-0"
                      >
                        <i className="fas fa-image text-lg"></i>
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="p-3 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full transition-all duration-200 flex-shrink-0"
                      >
                        <i className="fas fa-smile text-lg"></i>
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="w-full p-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gray-50 transition-all duration-200"
                        />
                        <button
                          type="submit"
                          disabled={!newMessage.trim() && !selectedImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary text-white rounded-full hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
                        >
                          <i className="fas fa-paper-plane text-sm"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-comments text-4xl text-primary"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Start a Conversation</h3>
                <p className="text-gray-500">Select a user from the list to begin chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebChat;