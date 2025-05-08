import * as functions from 'firebase-functions';
import { createTestController, getUserTestsController } from '../controllers/testController';
import { getTestByIdController } from '../controllers/testController';


export const createTest = functions.https.onRequest(createTestController);

export const getUserTests = functions.https.onRequest(getUserTestsController);

export const getTestById = functions.https.onRequest(getTestByIdController);