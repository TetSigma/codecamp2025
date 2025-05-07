import { useRouter } from 'expo-router';
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { useState } from 'react';


const notes = [
  { id: 1, title: 'Notatka 1', content: 'Treść pierwszej notatki', subject: 'Matematyka' },
  { id: 2, title: 'Notatka 2', content: 'Treść drugiej notatki', subject: 'Fizyka' },
  { id: 3, title: 'Notatka 3', content: 'Treść trzeciej notatki', subject: 'Chemia' },
  { id: 4, title: 'Notatka 4', content: 'Treść czwartej notatki', subject: 'Biologia' },
  { id: 5, title: 'Notatka 5', content: 'Treść piątej notatki', subject: 'Geografia' },
  { id: 6, title: 'Notatka 6', content: 'Treść szóstej notatki', subject: 'Historia' },
  { id: 7, title: 'Notatka 7', content: 'Treść siódmej notatki', subject: 'Język polski' },
  { id: 8, title: 'Notatka 8', content: 'Treść ósmej notatki', subject: 'Język angielski' },
  { id: 9, title: 'Notatka 9', content: 'Treść dziewiątej notatki', subject: 'WOS' },
  { id: 10, title: 'Notatka 10', content: 'Treść dziesiątej notatki', subject: 'Informatyka' },
  { id: 11, title: 'Notatka 11', content: 'Treść jedenastej notatki', subject: 'HiT' },


];

const subjectColors: Record<string, string> = {
    Matematyka: '#B98D50',
    Fizyka: '#E2CA95',
    Chemia: '#AFAC82',
    Biologia: '#49493C',
    Geografia: '#272624',
    Historia: '#0F7267',
    'Język polski': '#EEEDD0',
    'Język angielski': '#EFB452',
    WOS: '#F09824',
    Informatyka: '#DD1F38',
    HiT: '#A2CF98',


    // colors for other subjects: #80b1d3, #fdb462, #b3de69, #fccde5, #d9d9d9, #bc80bd, #ccebc5, #ffed6f
  };
  

export default function Notes() {
  const [search, setSearch] = useState('');

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase()) || 
    note.subject.toLowerCase().includes(search.toLowerCase())
  );

  const router = useRouter();

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

      <ScrollView contentContainerStyle={styles.scrollContainer}> 
        {filteredNotes.map((note) => (
          <TouchableOpacity
            key={note.id}
            onPress={() => router.push(`/dashboard/notes/${note.id}`)}
          >
            <View style={[styles.noteCard, { backgroundColor: subjectColors[note.subject] || '#fff' }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.noteTitle}>{note.title}</Text>
                    {/* <Text>ID: {note.id}</Text> */}
                </View>
                <Text style={styles.noteContent}>{note.content}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  SafeArea: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    minHeight: 200,
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  noteContent: {
    fontSize: 18,
    marginTop: 5,
    color: '#fff',
  },
});
