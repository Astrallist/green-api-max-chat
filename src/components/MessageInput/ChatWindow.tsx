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
    <div style={{ 
      background: '#e5e7eb',
      padding: '15px', 
      borderRadius: '10px', 
      height: '400px', 
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {messages.length === 0 && <p style={{ textAlign: 'center', color: '#888' }}>Пока сообщений нет...</p>}
      
      {messages.map((msg) => (
        <div key={msg.id} style={{
          maxWidth: '70%',
          padding: '10px 15px',
          borderRadius: '15px',
          fontSize: '14px',
          wordWrap: 'break-word',
          alignSelf: msg.isOutgoing ? 'flex-end' : 'flex-start',
          background: msg.isOutgoing ? '#cce5ff' : '#ffffff',
          borderBottomRightRadius: msg.isOutgoing ? '2px' : '15px',
          borderBottomLeftRadius: !msg.isOutgoing ? '2px' : '15px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          {msg.text}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};