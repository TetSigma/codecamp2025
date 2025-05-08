import * as admin from 'firebase-admin';

export const createNote = async (authorId: string, title: string, content: string) => {
  try {
    const noteData = {
      title,
      content,
      authorId,
    };

    const noteRef = await admin.firestore().collection('notes').add(noteData);

    return { id: noteRef.id, ...noteData };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating note: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while creating the note');
    }
  }
};

export const getNotesByUserId = async (userId: string) => {
  const snapshot = await admin
    .firestore()
    .collection('notes')
    .where('authorId', '==', userId)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
