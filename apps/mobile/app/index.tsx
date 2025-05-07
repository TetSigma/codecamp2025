import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { UITextToChat } from '../components/molecules/UITextToChat';
import UIMessageBubble from '../components/molecules/UIMessageBubble';

type Message = {
  id: string;
  text: string;
  fromUser: boolean;
};

export default function HomeScreen() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (text: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      fromUser: true,
    };

    setMessages((prev) => [...prev, newUserMessage]);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `AI: odpowiedź na "${text}"`,
        fromUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UIMessageBubble text={item.text} fromUser={item.fromUser} />
        )}
        contentContainerStyle={{ padding: 16 }}
        style={{ flex: 1 }}
      />
      <UITextToChat onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}
