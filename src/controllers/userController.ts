import { Request, Response } from 'express';
import { createUserService, fundUserService, withdrawFundsService, transferFundsService, findAllUsersService, deleteUserService } from '../services/userService';

export const createUser = async (req: Request, res: Response): Promise<void> => {
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


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params;
      await deleteUserService(parseInt(id));
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      if (error instanceof Error) {
          res.status(400).json({ error: error.message });
      } else {
          res.status(400).json({ error: 'An unknown error occurred' });
      }
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await findAllUsersService(); // Fetch all users
    res.status(200).json(users); // Send users as the response
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' });
  }
};



  
export const fundUser = async (req: Request, res: Response): Promise<void> => {
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
  
export const withdrawFunds = async (req: Request, res: Response): Promise<void> => {
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
  
export const transferFunds = async (req: Request, res: Response): Promise<void> => {
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
  