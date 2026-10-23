import { useState } from 'react';

interface Props {
  onStartChat: (chatId: string) => void;
}

export const NewChatForm = ({ onStartChat }: Props) => {
  const [chatId, setChatId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatId.trim()) {
      onStartChat(chatId.trim());
    }
  };

  return (
    <div className="newchat-container">
      <h2>Новый чат</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="Номер телефона или chatId"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Создать чат
        </button>
      </form>
    </div>
  );
};