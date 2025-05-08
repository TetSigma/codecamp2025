import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';

export default function NotesById() {
  const navigation = useRouter();
  const { id, title, content } = useLocalSearchParams();

  const navigateToLecture = () => {
    navigation.push({
      pathname: '/dashboard/notes/lecture',
      params: {
        title: title,
        content: content,
      },
    });
  };

  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.back()}>
          <Text style={styles.backIcon}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity style={styles.headphonesIcon} onPress={navigateToLecture}>
          <Ionicons name="headset" size={28} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentContainer}>
        <Markdown style={markdownStyles}>
          {typeof content === 'string' ? content : ''}
        </Markdown>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    fontSize: 30,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  headphonesIcon: {
    marginLeft: 10,
  },
  contentContainer: {
    padding: 16,
    flex:1
  },
});

const markdownStyles = {
  body: {
    fontSize: 18,
    lineHeight: 26,
    color: '#333',
  },
  heading1: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 12,
  },
  strong: {
    fontWeight: 'bold',
  },
  link: {
    color: '#0F7267',
    textDecorationLine: 'underline',
  },
};
