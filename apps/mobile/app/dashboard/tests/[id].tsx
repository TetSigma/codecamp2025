import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
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
import { useUserStore } from "../../../stores"; 
import { UIMultiStepTestForm } from "../../../components/organisms/UIMultiStepTestForm";

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
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);  // Will store the transformed questions here
  const [test, setTest] = useState<Test | null>(null);    // Will store the test details here
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const { id } = useLocalSearchParams();  // Retrieve the test id from URL params

  // Fetch test data when component mounts
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setLoading(true);
        // Fetch the test by id from the backend
        const response = await axios.post(`http://10.0.2.2:5001/codecamp2025/us-central1/getTestById`, {testId:id});
        const testData = response.data.test;
        
        const transformedQuestions = testData.questions.map((questionData, index) => {
          const options = questionData.options
            .filter(option => !option.includes('Correct Answer:'))
            .map(option => option.replace(/^- \d+\.\s*/, '').trim());

          const correctAnswer = questionData.options.find(option =>
            option.includes('Correct Answer:')
          )?.replace(/.*Correct Answer:\s*/, '').replace(/\*\*/g, '').trim() || ''; // Remove asterisks

          return {
            question: questionData.question.replace(/\*\*|:/g, '').trim(),
            options,
            correctAnswer, // Ensure this is the correct option string without "Correct Answer:" label and asterisks
            name: `question_${index + 1}`,
            isLast: index === testData.questions.length - 1,
          };
        });

        // Set test data and questions
        setTest(testData);
        setQuestions(transformedQuestions);
      } catch (error) {
        console.error("Error fetching test data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTestData();  // Fetch test data when id is available
    }
  }, [id]);

  const handleSubmit = () => {
    console.log('Test submitted');
    // Add your logic here to handle form submission, e.g., saving results to a backend
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!test) {
    return (
      <SafeAreaView style={styles.SafeArea}>
        <Text style={styles.title}>Test Not Found</Text>
      </SafeAreaView>
    );
  }

  return (
    <UIMultiStepTestForm
      questions={questions}  // Pass the transformed questions into UIMultiStepTestForm
      onSubmit={handleSubmit}  // Handle the results when the test is completed
    />
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
});
