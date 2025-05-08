import { useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../../stores';

export interface Message {
  id: string;
  text: string;
  fromUser: boolean;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore((state) => state.user); 

  const handleSend = async (text: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      fromUser: true,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://10.0.2.2:8000/chat', {
        userId: user.user.uid,
        message: text,
      });

      let responseText = '';

      // Check if the response contains both 'message' and 'test' fields
      if (response.data.response && response.data.response.message && response.data.response.test) {
        responseText = 'Saved your new test to the system!';
      } else {
        // If the response contains 'note', treat it as a note response
        const isNoteResponse =
          typeof response.data.response === 'object' && 'note' in response.data.response;

        if (isNoteResponse) {
          responseText = 'Note was saved to your system!';
        } else {
          // Otherwise, fallback to using the response as it is
          responseText = response.data.response;
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        fromUser: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    handleSend,
  };
};
