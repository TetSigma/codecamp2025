import { useState, useEffect } from 'react';
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
import axios from 'axios';
import { useUserStore } from "../../../stores"; // Adjust the import if needed

const colorList = [
  '#B98D50', '#E2CA95', '#AFAC82', '#49493C', '#272624',
  '#0F7267', '#EEEDD0', '#EFB452', '#F09824', '#DD1F38', '#A2CF98',
];

interface Test {
  id: string;
  title: string;
  questions: string[];
  userId: string;
}

export default function TestsIndex() {
  const [search, setSearch] = useState('');
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const fetchTests = async () => {
      if (!user?.user.uid) return;
      try {
        const response = await axios.post(
          'http://10.0.2.2:5001/codecamp2025/us-central1/getUserTests',
          { userId: user.user.uid }
        );
        setTests(response.data.tests);
      } catch (error: any) {
        console.error('Error fetching tests:', error?.response?.data || error.message);
        alert('Could not fetch tests.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTests();
    }
  }, [user]);

  const filteredTests = tests.filter((test) =>
    test.title.toLowerCase().includes(search.toLowerCase())
  );

  const getTextPreview = (questions: string[]) => {
    return questions.slice(0, 3).join(', ').trim(); // Preview the first 3 questions
  };
  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Szukaj testów..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {filteredTests.map((test, index) => (
            <TouchableOpacity
              key={test.id}
              onPress={() => router.push({
                pathname: `/dashboard/tests/${test.id}`,
                params: {
                  id: test.id
                }
              })}
            >
              <View style={[styles.testCard, { backgroundColor: colorList[index % colorList.length] }]}>
                <Text style={styles.testTitle}>{test.title}</Text>
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
  testCard: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    minHeight: 120,
    justifyContent: 'center',
  },
  testTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  testContent: {
    fontSize: 15,
    color: '#ffffffcc',
    lineHeight: 20,
  },
});
