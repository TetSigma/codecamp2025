
import * as functions from 'firebase-functions';
import { createNoteController,getUserNotesController  } from '../controllers/noteController';

export const createNote = functions.https.onRequest(createNoteController);

export const getUserNotes = functions.https.onRequest(getUserNotesController);
