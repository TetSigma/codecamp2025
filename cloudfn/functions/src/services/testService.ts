import * as admin from 'firebase-admin';

export const createTest = async (authorId: string, title: string, questions: any[]) => {
  try {
    const testData = {
      title,
      questions,
      authorId,
    };

    const testRef = await admin.firestore().collection('tests').add(testData);

    return { id: testRef.id, ...testData };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating test: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while creating the test');
    }
  }
};

export const getTestsByUserId = async (userId: string) => {
  const snapshot = await admin
    .firestore()
    .collection('tests')
    .where('authorId', '==', userId)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const getTestById = async (testId: string) => {
  try {
    const testDoc = await admin.firestore().collection('tests').doc(testId).get();

    if (!testDoc.exists) {
      throw new Error('Test not found');
    }

    return { id: testDoc.id, ...testDoc.data() };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving test: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while retrieving the test');
    }
  }
};
