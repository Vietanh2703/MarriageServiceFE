import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatbotPage.css';
import HomeNavbar from './HomeNavbar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

interface Message {
    id: number;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

interface ChatHistory {
    id: string;
    title: string;
    timestamp: Date;
    messages: Message[];
}

const ChatbotPage: React.FC = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTo({
                top: messageContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    // Auto-scroll when new messages are added
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Automatically scroll when the typing indicator appears/disappears
    useEffect(() => {
        scrollToBottom();
    }, [isTyping]);

    useEffect(() => {
        // Load chat history from localStorage when the component mounts
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            const parsed = JSON.parse(savedHistory);
            // Convert string timestamps back to Date objects
            const historyWithDates = parsed.map((chat: {
                id: string;
                title: string;
                timestamp: string;
                messages: {
                    id: number;
                    content: string;
                    sender: 'user' | 'bot';
                    timestamp: string;
                }[];
            }) => ({
                ...chat,
                timestamp: new Date(chat.timestamp),
                messages: chat.messages.map((msg) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }))
            }));
            setChatHistory(historyWithDates);
        }
    }, []);

    useEffect(() => {
        // Save chat history to localStorage whenever it changes
        if (chatHistory.length > 0) {
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        }
    }, [chatHistory]);
    const createNewChat = () => {
        const newChatId = Date.now().toString();
        const welcomeMessage: Message = {
            id: Date.now(),
            content: "Chào bạn! Mình là Misa. Mình có thể giúp bạn tư vấn về:\n- Kế hoạch tổ chức đám cưới\n- Chọn địa điểm\n- Trang trí tiệc cưới\n- Váy cưới và trang phục\n- Quay phim, chụp ảnh\n- Và các dịch vụ cưới khác\nBạn muốn mình tư vấn về vấn đề gì?",
            sender: 'bot',
            timestamp: new Date()
        };

        const newChat: ChatHistory = {
            id: newChatId,
            title: 'Cuộc trò chuyện mới',
            timestamp: new Date(),
            messages: [welcomeMessage]
        };

        setChatHistory(prev => [newChat, ...prev]);
        setCurrentChatId(newChatId);
        setMessages([welcomeMessage]);
    };

    const deleteChat = (chatId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
        if (currentChatId === chatId) {
            setCurrentChatId(null);
            setMessages([]);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || isTyping) return;

        if (!currentChatId) {
            createNewChat();
            return;
        }

        const newMessage: Message = {
            id: Date.now(),
            content: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Update chat history with new message
        setChatHistory(prev => prev.map(chat =>
            chat.id === currentChatId
                ? {
                    ...chat,
                    messages: [...chat.messages, newMessage],
                    title: chat.messages.length === 1 ? inputMessage.slice(0, 30) + (inputMessage.length > 30 ? '...' : '') : chat.title
                }
                : chat
        ));

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputMessage }),
            });

            const data = await response.json();

            if (response.ok) {
                const botResponse: Message = {
                    id: Date.now() + 1,
                    content: data.response,
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botResponse]);

                // Update chat history with bot response
                setChatHistory(prev => prev.map(chat =>
                    chat.id === currentChatId
                        ? { ...chat, messages: [...chat.messages, botResponse] }
                        : chat
                ));
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                id: Date.now() + 1,
                content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);

            // Update chat history with an error message
            setChatHistory(prev => prev.map(chat =>
                chat.id === currentChatId
                    ? { ...chat, messages: [...chat.messages, errorMessage] }
                    : chat
            ));
        } finally {
            setIsTyping(false);
        }
    };

    const loadChat = (chatId: string) => {
        const chat = chatHistory.find(c => c.id === chatId);
        if (chat) {
            setCurrentChatId(chatId);
            setMessages(chat.messages);
        }
    };

    const handleMisaProClick = () => {
        navigate('/misa-pro');
    };

    return (
        <div className={`chatbot-page ${isDarkMode ? 'dark' : ''}`}>
            <HomeNavbar />
            <div className="chatbot-layout">
                <aside className="chatbot-sidebar">
                    <div className="sidebar-header">
                        <button className="new-chat-button" onClick={createNewChat}>
                            <span className="plus-icon">+</span>
                            Cuộc trò chuyện mới
                        </button>
                        <button className="new-chat-button misa-pro" onClick={handleMisaProClick}>
                            <span className="misa-pro-icon">⭐</span>
                            Trải nghiệm Misa Pro
                            <span className="pro-badge">PRO</span>
                        </button>
                    </div>
                    <div className="conversations-list">
                        {chatHistory.map((chat) => (
                            <div
                                key={chat.id}
                                className={`conversation-item ${currentChatId === chat.id ? 'active' : ''}`}
                                onClick={() => loadChat(chat.id)}
                            >
                                <div className="conversation-item-content">
                                    <span className="chat-icon">💬</span>
                                    <span className="conversation-item-text">{chat.title}</span>
                                </div>
                                <button
                                    className="delete-chat-button"
                                    onClick={(e) => deleteChat(chat.id, e)}
                                    title="Xóa cuộc trò chuyện"
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="chat-container">
                    <div className="chat-header">
                        <h2>Trợ lý AI Wedding</h2>
                        <p>Hỏi đáp về kế hoạch cưới của bạn</p>
                    </div>

                    <div
                        className="messages-wrapper"
                        ref={messageContainerRef}
                        style={{
                            maxHeight: 'calc(100vh - 250px)',
                            overflowY: 'auto'
                        }}
                    >
                        <div className="messages-container">
                            {messages.length === 0 ? (
                                <div className="welcome-message">
                                    <div className="welcome-icon">👋</div>
                                    <h3>Chào bạn. Mình là Misa 🥰</h3>
                                    <p>Hãy đặt câu hỏi về kế hoạch đám cưới của bạn.</p>
                                </div>
                            ) : (
                                <>
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`message ${message.sender}`}
                                        >
                                            <div className="message-avatar">
                                                {message.sender === 'bot' ? '🤖' : '👤'}
                                            </div>
                                            <div className="message-bubble">
                                                <div className="message-content">
                                                    {message.content}
                                                </div>
                                                <div className="message-timestamp">
                                                    {message.timestamp.toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="message bot typing">
                                            <div className="message-avatar">🤖</div>
                                            <div className="message-bubble">
                                                <div className="typing-indicator">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>
                    </div>

                    <form className="message-input-container" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Nhập tin nhắn của bạn..."
                            className="message-input"
                            disabled={isTyping}
                        />
                        <button
                            type="submit"
                            className="send-button"
                            disabled={isTyping}
                        >
                            <span className="send-icon">📤</span>
                            Gửi
                        </button>
                    </form>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ChatbotPage;
