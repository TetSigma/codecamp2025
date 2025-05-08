import { Request, Response } from 'express';
import { createTest } from '../services/testService';
import { getTestsByUserId } from '../services/testService';
import { getTestById } from '../services/testService';




export const createTestController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { authorId, title, questions } = req.body;

    if (!authorId || !title || !questions) {
      res.status(400).json({ message: 'Missing required fields: authorId, title, or questions' });
      return;
    }

    const test = await createTest(authorId, title, questions);

    res.status(201).json({
      message: 'Test successfully created',
      test,
    });
  } catch (error: unknown) {
    console.error('Error creating test:', error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred while creating the test' });
    }
  }
};

export const getUserTestsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: 'Missing userId in query' });
      return;
    }

    const tests = await getTestsByUserId(userId);
    res.status(200).json({ tests });
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTestByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { testId } = req.body;  // Retrieve testId from request body
  
      if (!testId) {
        res.status(400).json({ message: 'Missing testId in body' });
        return;
      }
  
      // Fetch the test using the provided testId
      const test = await getTestById(testId);
  
      // If the test is not found
      if (!test) {
        res.status(404).json({ message: 'Test not found' });
        return;
      }
  
      res.status(200).json({ test });
    } catch (error: unknown) {
      console.error('Error fetching test:', error);
  
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred while fetching the test' });
      }
    }
  };