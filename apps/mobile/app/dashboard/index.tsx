import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import axios from 'axios';
import { UITextToChat } from '../../components/molecules/UITextToChat';
import UIMessageBubble from '../../components/molecules/UIMessageBubble';
import Markdown from 'react-native-markdown-display';
import { UILoadingMessage } from '@/components/atoms/UILoadingMessage';
import Animated from 'react-native-reanimated';
import { useChat } from '../../api/hooks';
import { useUserStore } from '@/stores';
import { TouchableOpacity } from 'react-native';

interface Message {
  id: string;
  text: string;
  fromUser: boolean;
}

import React, { memo } from 'react';

const MessageItem = memo(({ item }: { item: Message }) => {
  return (
    <UIMessageBubble
      text={
        item.fromUser ? (
          item.text
        ) : (
          <Animated.View>
            <Markdown style={{
                    body: {
                      fontSize: 16,
                      lineHeight: 24,
                      flexWrap:"wrap",
                      flexShrink:1
                    },
                    paragraph: {
                      marginBottom: 10,
                    },
                    text: {
                      fontSize: 16,
                    },
                    strong: {
                      fontSize: 16,
                      fontWeight: 'bold',
                    },
                    heading1: {
                      fontSize: 22,
                      fontWeight: 'bold',
                    },
                    heading2: {
                      fontSize: 20,
                      fontWeight: 'bold',
                    },
                    hr: {
                      marginVertical: 20,
                      borderBottomWidth: 1,
                      borderColor: '#ccc',
                    },
                  }}>
              {item.text}
            </Markdown>
          </Animated.View>
        )
      }
      fromUser={item.fromUser}
    />
  );
});

export default function ChatScreen() {
  const { messages, isLoading, handleSend } = useChat();

  const renderItem = ({ item }: { item: Message }) => (
    <MessageItem item={item} />
  );
  const logOffUser = () => {
    useUserStore.getState().clearUser();  // This will clear the user state from the store and AsyncStorage
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* <TouchableOpacity onPress={logOffUser}>
            <Text>Log Out</Text>
          </TouchableOpacity> */}

      
      <View style={styles.chatContainer}>
        {messages.length === 0 && (
          <View style={styles.welcomeMessageContainer}>
            <Text style={styles.welcomeText}>Welcome to Cramly!</Text>
            <Text style={styles.welcomeSubText}>You can:</Text>
            <Text style={styles.welcomeSubText}>- Create notes</Text>
            <Text style={styles.welcomeSubText}>- Create voiceovers</Text>
            <Text style={styles.welcomeSubText}>- And create custom tests</Text>
            <Text style={styles.welcomeSubText}>Try it out!</Text>
          </View>
        )}

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          style={{ flex: 1 }}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
          removeClippedSubviews={true}
        />
        {isLoading && <UILoadingMessage />}
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
    paddingBottom: 20,
    backgroundColor: "white",

  },
  chatContainer: {
    flex: 1,
  },
  welcomeMessageContainer: {
    flex: 1, // This ensures the container fills the available space
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left', // Left-align the text inside the block
    marginBottom: 10,
  },
  welcomeSubText: {
    fontSize: 16,
    textAlign: 'left', // Left-align the text inside the block
    marginBottom: 5,
  },
  inputContainer: {
    borderTopWidth: 1,
  },
});
