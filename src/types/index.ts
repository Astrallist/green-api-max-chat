export interface Credentials {
  idInstance: string;
  apiTokenInstance: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: number;
  isOutgoing: boolean; // true - мы отправили, false - нам пришло
}

// Ответ от GREEN-API
export interface GreenApiNotification {
  receiptId: number;
  body: {
    typeWebhook: string;
    messageData?: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
    };
    senderData?: {
      chatId: string;
      sender: string;
    };
  };
}