import axios from 'axios';
import { findUserByEmail, createUser, updateUserBalance, getUserById, findAllUsers } from '../models/userModel';


// Mock list of blacklisted users
const blacklistedUsers = [
  { name: 'Jane Doe', email: 'jane@example.com' },
  { name: 'Bob Smith', email: 'bob@example.com' },
  { name: 'Alice Johnson', email: 'alice@example.com' }
];

export const createUserService = async (name: string, email: string, balance: number) => {
  // Check the local blacklist instead of the API
  const isBlacklisted = blacklistedUsers.some(user => user.email === email);

  if (isBlacklisted) {
    throw new Error('User is blacklisted');
  }

  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create new user
  await createUser(name, email, balance);
};



export const findAllUsersService = async () => {
  try {
    const users = await findAllUsers(); // Fetch all users from the database
    return users;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};




export const fundUserService = async (userId: number, amount: number) => {
  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');

  // Ensure the amount is a positive number
  if (amount <= 0) throw new Error('Amount must be greater than zero');

  const newBalance = parseFloat(user.balance) + amount;
  await updateUserBalance(userId, newBalance);
};

export const withdrawFundsService = async (userId: number, amount: number) => {
  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');
  if (user.balance < amount) throw new Error('Insufficient funds');

  const newBalance = parseFloat(user.balance) - amount;
  await updateUserBalance(userId, newBalance);
};

export const transferFundsService = async (senderId: number, recipientId: number, amount: number) => {
  const sender = await getUserById(senderId);
  const recipient = await getUserById(recipientId);

  if (!sender || !recipient) throw new Error('Sender or recipient not found');
  if (sender.balance < amount) throw new Error('Insufficient funds');

  await updateUserBalance(senderId, sender.balance - amount);
  await updateUserBalance(recipientId, recipient.balance + amount);
};


