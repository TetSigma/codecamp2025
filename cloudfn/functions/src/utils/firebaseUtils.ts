
import * as admin from 'firebase-admin';


export const getUserByEmail = async (email: string) => {
  const userRecord = await admin.auth().getUserByEmail(email);
  return userRecord;
};

export const createUserInFirestore = async (userId: string, userData: any) => {
  const userRef = admin.firestore().collection('users').doc(userId);
  await userRef.set(userData);
  return userRef;
};

export const checkIfUserExists = async (email: string) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return userRecord;
  } catch (error) {
    return null; 
  }
};
