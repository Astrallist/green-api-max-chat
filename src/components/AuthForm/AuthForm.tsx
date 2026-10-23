import { useState } from 'react';
import type { Credentials } from '../../api/greenApi';

interface Props {
  onLogin: (credentials: Credentials) => void;
}

export const AuthForm = ({ onLogin }: Props) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idInstance.trim() && apiTokenInstance.trim()) {
      onLogin({ idInstance, apiTokenInstance });
    } else {
      alert('Заполните все поля');
    }
  };

  return (
    <div className="auth-container">
      <h2>Вход в GREEN-API</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="idInstance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="apiTokenInstance"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Войти
        </button>
      </form>
    </div>
  );
};