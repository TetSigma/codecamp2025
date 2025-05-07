import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

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

export default function NotesById() {
    const { id } = useLocalSearchParams();
    
    const filteredNote = notes.find(note => note.id === parseInt(id as string, 10));
    if (!filteredNote) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={{ fontSize: 25}}>&lt;</Text>
            </TouchableOpacity>
                <Text>Nie znaleziono notatki o tym ID</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={{ fontSize: 25}}>&lt;</Text>
            </TouchableOpacity>
                <View style={styles.box}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.title}>{filteredNote.subject}: </Text>
                        <Text style={styles.title}>{filteredNote.title}</Text>
                    </View>
                    <ScrollView>
                        <Text style={styles.content}>{filteredNote.content}</Text>
                    </ScrollView>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    SafeArea: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 2,
        marginRight: 2,
        marginTop: 0,
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
        marginTop: 20,
    },
    subject: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginRight: 20,
    },
    box: {
        padding: 20,
        paddingTop: 0,
        flex: 1,
        borderRadius: 10,
        margin: 20,
        marginTop: 0,
        backgroundColor: '#fff',
    },
    backButton: {
        width: 45,
        height: 45,
        borderRadius: 10,
        padding: 10,
        margin: 8,
        marginBottom: 0,
        backgroundColor: '#fff',
        textAlign: 'center',
        marginVertical: 10,
    },
});