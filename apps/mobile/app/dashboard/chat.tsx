import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import { UITextToChat } from '../../components/molecules/UITextToChat';
import UIMessageBubble from '../../components/molecules/UIMessageBubble';

interface Message {
  id: string;
  text: string;
  fromUser: boolean;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAITalk, setIsAITalk] = useState(false);

  const handleAITalk = () => {
    setIsAITalk(!isAITalk);
  };

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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.buttonContainer}>
        <Button
          title={isAITalk ? 'Switch to Normal Chat' : 'Talk with AI'}
          onPress={handleAITalk}
        />
      </View>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Message }) => (
            <UIMessageBubble text={item.text} fromUser={item.fromUser} />
          )}
          contentContainerStyle={{ padding: 16 }}
          style={{ flex: 1 }}
        />
      </View>
      <View style={styles.inputContainer}>
        <UITextToChat onSend={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
