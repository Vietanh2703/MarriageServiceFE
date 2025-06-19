import React, { useState, useRef, useEffect } from 'react';
import './ChatbotPage.css';
import Navbar from './Navbar';
import Footer from './Footer';

interface Message {
    id: number;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const ChatbotPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const [activeConversation, setActiveConversation] = useState('Tư vấn kế hoạch cưới');

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTo({
                top: messageContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    // Auto scroll when new messages are added
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Automatically scroll when typing indicator appears/disappears
    useEffect(() => {
        scrollToBottom();
    }, [isTyping]);

    const handleConversationClick = (conversation: string) => {
        setActiveConversation(conversation);
        // Thêm logic load tin nhắn của cuộc hội thoại này
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || isTyping) return;

        const newMessage: Message = {
            id: Date.now(),
            content: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botResponse: Message = {
                id: Date.now() + 1,
                content: 'Xin chào! Tôi là trợ lý AI Wedding, tôi có thể giúp gì cho bạn về kế hoạch đám cưới của bạn?',
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    const conversations = [
        'Tư vấn kế hoạch cưới',
        'Chọn địa điểm',
        'Lập ngân sách',
        'Trang trí tiệc cưới',
        'Chọn váy cưới',
        'Quay phim chụp ảnh'
    ];

    return (
        <div className="chatbot-page">
            <Navbar />
            <div className="chatbot-layout">
                <aside className="chatbot-sidebar">
                    <div className="sidebar-header">
                        <button className="new-chat-button">
                            <span className="plus-icon">+</span>
                            Cuộc trò chuyện mới
                        </button>
                    </div>
                    <div className="conversations-list">
                        {conversations.map((conversation) => (
                            <div
                                key={conversation}
                                className={`conversation-item ${activeConversation === conversation ? 'active' : ''}`}
                                onClick={() => handleConversationClick(conversation)}
                            >
                                <span className="chat-icon">💬</span>
                                {conversation}
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
                                    <h3>Chào mừng bạn đến với AI Wedding Assistant!</h3>
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
