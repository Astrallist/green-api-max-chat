import { useEffect, useRef } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  isOutgoing: boolean;
}

interface Props {
  messages: ChatMessage[];
}

export const ChatWindow = ({ messages }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-messages-area">
      {messages.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
          Пока сообщений нет...
        </p>
      )}
      
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className={`message-bubble ${msg.isOutgoing ? 'outgoing' : 'incoming'}`}
        >
          {msg.text}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};