import * as functions from 'firebase-functions';
import { signupController, loginController } from '../controllers/authController';

export const signup = functions.https.onRequest(signupController);
export const login = functions.https.onRequest(loginController);
