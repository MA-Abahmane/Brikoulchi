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
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Load chat users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
      .filter(u => u.username !== user?.username)
      .map(u => ({
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        lastMessage: null,
        unreadCount: 0
      }));

    // Get last message and unread count for each user
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

    // Sort users by last message time
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
      
      // Mark messages as read
      const updatedMessages = chatMessages.map(msg => ({
        ...msg,
        read: msg.sender !== user.username ? true : msg.read
      }));
      
      localStorage.setItem(`chat_${chatId}`, JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
    }
  }, [selectedUser, user]);

  useEffect(() => {
    // Set up real-time message checking
    const interval = setInterval(() => {
      if (selectedUser) {
        const chatId = getChatId(user.username, selectedUser.username);
        const chatMessages = JSON.parse(localStorage.getItem(`chat_${chatId}`) || '[]');
        setMessages(chatMessages);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedUser, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 const scrollToBottom = () => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
};

  const getChatId = (user1, user2) => {
    return [user1, user2].sort().join('_');
  };

  const handleSendMessage = (e) => {
    e?.preventDefault(); // Prevent form submission
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

    setNewMessage('');
    setSelectedImage(null);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
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
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[80vh] flex">
        {/* Users List */}
        <div className="w-1/4 border-r border-gray-200 bg-gray-50">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
          </div>
          <div className="overflow-y-auto h-[calc(80vh-4rem)]">
            {chatUsers.map(chatUser => (
              <div
                key={chatUser.username}
                onClick={() => setSelectedUser(chatUser)}
                className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors ${
                  selectedUser?.username === chatUser.username ? 'bg-gray-200' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {chatUser.firstName[0]}{chatUser.lastName[0]}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-800">
                        {chatUser.firstName} {chatUser.lastName}
                      </p>
                      {chatUser.unreadCount > 0 && (
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                          {chatUser.unreadCount}
                        </span>
                      )}
                    </div>
                    {chatUser.lastMessage && (
                      <p className="text-sm text-gray-500 truncate">
                        {chatUser.lastMessage.content || 'Sent an image'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white" ref={chatContainerRef}>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </p>
                    <p className="text-sm text-gray-500">@{selectedUser.username}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === user.username ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === user.username
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-800'
                      }`}
                    >
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Shared"
                          className="max-w-full rounded-lg mb-2"
                        />
                      )}
                      {message.content && <p>{message.content}</p>}
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                        {message.sender === user.username && (
                          <i className={`fas fa-check-double text-xs ${message.read ? 'text-blue-300' : 'opacity-70'}`}></i>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-200">
                {selectedImage && (
                  <div className="mb-2 relative">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="max-h-32 rounded-lg"
                    />
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                )}
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <i className="fas fa-image"></i>
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
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <i className="fas fa-smile"></i>
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
                {showEmojiPicker && (
                  <div className="absolute top-80 right-4">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <i className="fas fa-comments text-6xl mb-4"></i>
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebChat;