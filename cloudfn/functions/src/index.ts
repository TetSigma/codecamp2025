import * as admin from 'firebase-admin';
import { signup, login, createNote, getUserNotes, getUserTests, createTest, getTestById } from './endpoints';
admin.initializeApp();

const db = admin.firestore();

const testUser = {
  name: "Jan",
  surname: "Kowalski",
  email: "jan.kowalski@test.com",
  educationLevel: "High School",
};

const noteAboutPolishRevolution = {
  title: "Polish Revolution",
  content: `The Polish Revolution refers to a series of uprisings and protests that occurred 
  throughout Polish history. One of the most notable was the 1794 Kościuszko Uprising, which 
  was a military rebellion against the Russian Empire's influence in Poland.`,
  authorId: "",
};

const mockTestAboutPolishRevolution = {
  title: "Polish Revolution Mock Test",
  questions: [
    {
      question: "When did the Kościuszko Uprising occur?",
      options: ["1794", "1863", "1905", "1918"],
      correctAnswer: "1794",
    },
    {
      question: "Who was the leader of the 1794 Kościuszko Uprising?",
      options: ["Tadeusz Kościuszko", "Józef Piłsudski", "Lech Wałęsa", "Andrzej Duda"],
      correctAnswer: "Tadeusz Kościuszko",
    },
  ],
  authorId: "", // Placeholder, will be replaced with the user ID
};

// Function to populate the database
const populateDatabase = async () => {
  try {
    // 1. Add a new user to the "users" collection
    const userRef = await db.collection('users').add(testUser);
    const userId = userRef.id;
    console.log("Test user created with ID:", userId);

    // 2. Add a note about the Polish Revolution for the test user
    noteAboutPolishRevolution.authorId = userId;
    const noteRef = await db.collection('notes').add(noteAboutPolishRevolution);
    console.log("Polish Revolution note added with ID:", noteRef.id);

    // 3. Add a mock test about the Polish Revolution for the test user
    mockTestAboutPolishRevolution.authorId = userId;
    const mockTestRef = await db.collection('mockTests').add(mockTestAboutPolishRevolution);
    console.log("Polish Revolution mock test added with ID:", mockTestRef.id);

    console.log("Database population completed successfully!");
  } catch (error) {
    console.error("Error populating the database:", error);
  }
};

// Run the population script
populateDatabase();


export {signup, login, createNote, getUserNotes, getUserTests, createTest, getTestById}