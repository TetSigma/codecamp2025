import { useRouter } from 'expo-router';
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from "../../../stores";

const colorList = [
  '#B98D50', '#E2CA95', '#AFAC82', '#49493C', '#272624',
  '#0F7267', '#EEEDD0', '#EFB452', '#F09824', '#DD1F38', '#A2CF98',
];

interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
}

export default function NotesIndex() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user); 
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user?.user.uid) return;
      try {
        const response = await axios.post(
          'http://10.0.2.2:5001/codecamp2025/us-central1/getUserNotes',
          { userId: user.user.uid }
        );
        setNotes(response.data.notes);
      } catch (error: any) {
        console.error('Error fetching notes:', error?.response?.data || error.message);
        alert('Could not fetch notes.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [user]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  const getTextPreview = (content: string) => {
    const paragraphs = content
      .split('\n')
      .filter((p) => p.trim() !== '')
      .slice(0, 3);
    return paragraphs.join(' ').trim();
  };

  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Szukaj notatek..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {filteredNotes.map((note, index) => (
            <TouchableOpacity
              key={note.id}
              onPress={() => router.push({
                pathname: `/dashboard/notes/${note.id}`,
                params: {
                  title: note.title,
                  content: note.content,
                }
              })}
            >
              <View style={[styles.noteCard, { backgroundColor: colorList[index % colorList.length] }]}>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteContent}>{getTextPreview(note.content)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  noteCard: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    minHeight: 120,
    justifyContent: 'center',
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  noteContent: {
    fontSize: 15,
    color: '#ffffffcc',
    lineHeight: 20,
  },
});
