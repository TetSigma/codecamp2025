import * as admin from 'firebase-admin';
import { createUserInFirestore, checkIfUserExists } from '../utils/firebaseUtils';

export const signupUser = async (email: string, password: string, name: string, surname: string, educationLevel: string) => {
    try {
      const existingUser = await checkIfUserExists(email);
      if (existingUser) {
        throw new Error('User already exists');
      }
  
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: name,
      });
  
      const userData = {
        name,
        surname,
        email,
        educationLevel,
      };
  
      await createUserInFirestore(userRecord.uid, userData);
  
      return userRecord; 
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error during signup: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred during signup');
      }
    }
  };
  

export const loginUser = async (email: string, password: string) => {
    try {
      const user = await checkIfUserExists(email);
      if (!user) {
        throw new Error('User does not exist');
      }
  
      const userDataRef = admin.firestore().collection('users').doc(user.uid);
      const userDataDoc = await userDataRef.get();
  
      if (!userDataDoc.exists) {
        throw new Error('User data not found in Firestore');
      }
  
      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        educationLevel: userDataDoc.data()?.educationLevel,
        createdAt: userDataDoc.data()?.createdAt,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error during login: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred during login');
      }
    }
  };
  
  