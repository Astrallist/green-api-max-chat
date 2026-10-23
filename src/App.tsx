import { useState, useCallback } from 'react';
import { sendMessage, type Credentials } from './api/greenApi';
import { useChatPolling } from './hooks/useChatPolling';
import { ChatWindow, type ChatMessage } from './components/ChatWindow/ChatWindow';
import { MessageInput } from './components/MessageInput/MessageInput';
import { AuthForm } from './components/AuthForm/AuthForm';
import { NewChatForm } from './components/NewChatForm/NewChatForm';
import './App.css';

function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleIncomingMessage = useCallback((text: string) => {
    setMessages((prev) => {
      const lastMsg = prev[prev.length - 1];
      if (lastMsg && !lastMsg.isOutgoing && lastMsg.text === text) return prev;
      return [...prev, { id: `in-${Date.now()}-${Math.random()}`, text, isOutgoing: false }];
    });
  }, []);

  useChatPolling(
    credentials || { idInstance: '', apiTokenInstance: '' }, 
    handleIncomingMessage, 
    !!credentials
  );

  const handleSend = async (text: string) => {
    if (!credentials || !activeChatId) return;
    
    setIsLoading(true);
    try {
      const result = await sendMessage(credentials, activeChatId, text);
      setMessages((prev) => [
        ...prev,
        { id: result.idMessage || Date.now().toString(), text, isOutgoing: true }
      ]);
    } catch (error: any) {
      alert(error.message || 'Ошибка отправки'); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setCredentials(null);
    setActiveChatId(null);
    setMessages([]);
  };

  if (!credentials) {
    return <AuthForm onLogin={(creds) => setCredentials(creds)} />;
  }

  if (!activeChatId) {
    return <NewChatForm onStartChat={(id) => setActiveChatId(id)} />;
  }

  return (
    <div className="chat-layout">
      <div className="chat-header">
        <h2>Чат с {activeChatId}</h2>
        <div className="chat-header-actions">
          <button className="btn-secondary" onClick={() => setActiveChatId(null)}>
            К списку
          </button>
          <button className="btn-danger" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>
      
      <ChatWindow messages={messages} />
      
      <MessageInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

export default App;