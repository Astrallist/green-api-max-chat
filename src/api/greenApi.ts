import axios from 'axios';

const API_URL = 'https://api.green-api.com';

export interface Credentials {
  idInstance: string;
  apiTokenInstance: string;
}

// --- 1. Отправка сообщения ---
export const sendMessage = async (
  credentials: Credentials,
  chatId: string,
  message: string
) => {
  const { idInstance, apiTokenInstance } = credentials;
  
  try {
    const response = await axios.post(
      `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        chatId: chatId,
        message: message,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    throw error;
  }
};

// --- 2. Получение уведомления ---
export const receiveNotification = async (credentials: Credentials) => {
  const { idInstance, apiTokenInstance } = credentials;

  try {
    const response = await axios.get(
      `${API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=5`
    );
    return response.data; // Возвращает объект уведомления или null, если ничего не пришло
  } catch (error: any) {
    if (error.response && error.response.status === 408) {
      return null; 
    }
    console.error('Ошибка при получении уведомления:', error);
    throw error;
  }
};

// --- 3. Удаление уведомления из очереди ---
export const deleteNotification = async (
  credentials: Credentials,
  receiptId: number
) => {
  const { idInstance, apiTokenInstance } = credentials;

  try {
    const response = await axios.delete(
      `${API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
    );
    return response.data; // Возвращает { result: true }
  } catch (error) {
    console.error('Ошибка при удалении уведомления:', error);
    throw error;
  }
};