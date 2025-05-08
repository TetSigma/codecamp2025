
import { Request, Response } from 'express';
import { createNote } from '../services/noteService';
import { getNotesByUserId } from '../services/noteService';


export const createNoteController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { authorId, title, content } = req.body;

    if (!authorId|| !title || !content) {
      res.status(400).json({ message: 'Missing required fields: userId, title, or content' });
      return;
    }

    const note = await createNote(authorId, title, content);

    res.status(201).json({
      message: 'Note successfully created',
      note,
    });
  } catch (error: unknown) {
    console.error('Error creating note:', error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred while creating the note' });
    }
  }
};

export const getUserNotesController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: 'Missing userId in query' });
      return;
    }

    const notes = await getNotesByUserId(userId);
    res.status(200).json({ notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
