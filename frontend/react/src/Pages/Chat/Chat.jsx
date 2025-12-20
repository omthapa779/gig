import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';


const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const [searchParams] = useSearchParams();
    const initialRecipientId = searchParams.get('new');
    const [currentUser, setCurrentUser] = useState(null); // To know who "I" am (for styling)

    // Fetch conversations
    useEffect(() => {
        fetchConversations();
        fetchCurrentUser(); // We need to know who we are to verify auth
    }, []);

    const fetchCurrentUser = async () => {
        // A simple endpoint to get ME would be good, but we can rely on role/context in real app
        // For now we might guess based on who we are logged in as.
        // Actually the messages endpoint tells us sender/recipient. 
        // We'll rely on styling logic: if (msg.sender === myId) -> right.
        // But we need myId. 
        // Let's assume hitting /api/company/me or /api/freelancer/me works or decode token.
        // For MVP, lets just fetch conversations first.
    };

    const fetchConversations = async () => {
        try {
            const res = await fetch('/api/messages/conversations');
            if (res.ok) {
                const data = await res.json();
                setConversations(data);

                // If we have an initialRecipientId, try to find them or select them
                if (initialRecipientId) {
                    // Check if they are in list
                    const existing = data.find(c => c.user._id === initialRecipientId);
                    if (existing) {
                        setSelectedUser(existing.user);
                    } else {
                        // If not in list, we might need to fetch their details to create a "fake" entry
                        // or just wait for first message.
                        // For now, assume they might need to be "started". 
                        // We'll handle "New Conversation" logic if needed, but usually 
                        // the "Message" button should pass partial user data to initialize.
                    }
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (userId) => {
        try {
            const res = await fetch(`/api/messages/${userId}`);
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
                scrollToBottom();
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (selectedUser) {
            fetchMessages(selectedUser._id);
            // Poll for new messages every 3s
            const interval = setInterval(() => fetchMessages(selectedUser._id), 3000);
            return () => clearInterval(interval);
        }
    }, [selectedUser]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipientId: selectedUser._id,
                    content: newMessage
                })
            });

            if (res.ok) {
                const msg = await res.json();
                setMessages([...messages, msg]);
                setNewMessage('');
                scrollToBottom();
                // Also update conversation preview
                fetchConversations();
            } else {
                // Handle restriction error
                const err = await res.json();
                alert(err.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // If initialRecipientId is passed but not in conversation list,
    // we might want to allow "Starting" a chat.
    // We can pass ?name=...&avatar=... in URL or fetch profile.
    useEffect(() => {
        if (initialRecipientId && !selectedUser && !loading) {
            // Logic to create a temporary selectedUser state so we can send message
            // This requires passing name/avatar via URL or fetching it.
            const name = searchParams.get('name') || 'User';
            const avatar = searchParams.get('avatar'); // might be url encoded

            setSelectedUser({
                _id: initialRecipientId,
                name: name,
                avatar: avatar
            });
        }
    }, [initialRecipientId, loading, selectedUser]);


    return (
        <div className="h-[calc(100vh-180px)] w-full mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full flex overflow-hidden">

                {/* Sidebar */}
                <div className="w-1/3 border-r border-gray-100 flex flex-col">
                    <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                        <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-center text-gray-400">Loading...</div>
                        ) : conversations.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 text-sm">
                                No conversations yet.
                            </div>
                        ) : (
                            conversations.map((conv) => (
                                <div
                                    key={conv.user._id}
                                    onClick={() => setSelectedUser(conv.user)}
                                    className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors ${selectedUser?._id === conv.user._id ? 'bg-blue-50/60 border-blue-100' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={conv.user.avatar || 'https://via.placeholder.com/40'}
                                            alt={conv.user.name}
                                            className="w-10 h-10 rounded-full object-cover border border-gray-100"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-0.5">
                                                <h4 className={`text-sm font-bold truncate ${!conv.read ? 'text-black' : 'text-gray-900'}`}>{conv.user.name}</h4>
                                                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                                    {new Date(conv.time).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <p className={`text-xs truncate ${!conv.read ? 'font-bold text-black' : 'text-gray-500'}`}>
                                                {conv.lastMessage}
                                            </p>
                                        </div>
                                        {!conv.read && (
                                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="flex-1 flex flex-col bg-white">
                    {selectedUser ? (
                        <>
                            {/* Header */}
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={selectedUser.avatar || 'https://via.placeholder.com/40'}
                                        alt={selectedUser.name}
                                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                                    />
                                    <div>
                                        <h3 className="font-bold text-gray-900">{selectedUser.name}</h3>
                                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Active
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
                                {messages.map((msg, idx) => {
                                    const isReceived = msg.sender === selectedUser._id;

                                    return (
                                        <div key={idx} className={`flex ${!isReceived ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm ${!isReceived
                                                ? 'bg-black text-white rounded-br-none'
                                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                                }`}>
                                                <p>{msg.content}</p>
                                                <span className={`text-[10px] block mt-1 opacity-70 ${!isReceived ? 'text-gray-300 text-right' : 'text-gray-400'}`}>
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-gray-200 rounded-xl outline-none transition-all placeholder:text-gray-400"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim()}
                                        className="px-6 py-3 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-colors flex items-center gap-2"
                                    >
                                        <span>Send</span>
                                        <i className="fa-regular fa-paper-plane"></i>
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
                            <i className="fa-regular fa-comments text-6xl mb-4 opacity-50"></i>
                            <p className="font-medium text-gray-500">Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Chat;
