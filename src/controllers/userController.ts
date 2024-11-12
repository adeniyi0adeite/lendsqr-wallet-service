import { Request, Response } from 'express';
import { createUserService, fundUserService, withdrawFundsService, transferFundsService } from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, balance } = req.body;
      await createUserService(name, email, balance);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      // Assert that error is of type `Error`
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
};
  
export const fundUser = async (req: Request, res: Response) => {
    try {
      const { userId, amount } = req.body;
      await fundUserService(userId, amount);
      res.status(200).json({ message: 'Account funded successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
};
  
export const withdrawFunds = async (req: Request, res: Response) => {
    try {
      const { userId, amount } = req.body;
      await withdrawFundsService(userId, amount);
      res.status(200).json({ message: 'Funds withdrawn successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
};
  
export const transferFunds = async (req: Request, res: Response) => {
    try {
      const { senderId, recipientId, amount } = req.body;
      await transferFundsService(senderId, recipientId, amount);
      res.status(200).json({ message: 'Funds transferred successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
};
  