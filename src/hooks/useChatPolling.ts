import { useEffect, useRef } from 'react';
import { receiveNotification, deleteNotification, type Credentials } from '../api/greenApi';

type OnMessageReceived = (text: string, chatId: string, isOutgoing: boolean) => void;

export const useChatPolling = (
  credentials: Credentials,
  onMessageReceived: OnMessageReceived,
  isPollingActive: boolean = true
) => {
  const isMounted = useRef(true);
  const isPollingStarted = useRef(false); 

  useEffect(() => {
    isMounted.current = true;
    
    if (!isPollingActive || isPollingStarted.current) return;
    isPollingStarted.current = true;

    let timeoutId: ReturnType<typeof setTimeout>;

    const poll = async () => {
      if (!isMounted.current) return;

      try {
        const notification = await receiveNotification(credentials);

        if (notification && notification.receiptId) {
          await deleteNotification(credentials, notification.receiptId);
          const { typeWebhook, messageData, senderData } = notification.body;

          if (typeWebhook === 'incomingMessageReceived') {
            const text = messageData?.textMessageData?.textMessage || '';
            const chatId = senderData?.chatId || '';
            if (text) {
              onMessageReceived(text, chatId, false);
            }
          }
        }
      } catch (error) {
        console.error('Ошибка в цикле polling:', error);
      } finally {
        if (isMounted.current) {
          timeoutId = setTimeout(poll, 1000);
        }
      }
    };

    poll();

    return () => {
      isMounted.current = false;
      isPollingStarted.current = false;
      clearTimeout(timeoutId);
    };
  }, [credentials, onMessageReceived, isPollingActive]);
};