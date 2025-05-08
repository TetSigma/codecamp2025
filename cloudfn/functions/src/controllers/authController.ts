import { Request, Response } from 'express';
import { signupUser } from '../services/authService';
import { loginUser } from '../services/authService';

export const signupController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name,surname, educationLevel } = req.body;
    console.log(req.body)
    if (!email || !password || !name || !surname || !educationLevel) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const userRecord = await signupUser(email, password, name, surname, educationLevel);

    res.status(201).json({
      message: 'User successfully created',
      user: userRecord,
    });
  } catch (error: unknown) {
    console.error('Error during signup:', error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Missing email or password' });
      return;
    }

    const userRecord = await loginUser(email, password);

    res.status(200).json({
      message: 'User successfully logged in',
      user: userRecord,
    });
  } catch (error: unknown) {
    console.error('Error during login:', error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
