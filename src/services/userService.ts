import axios from 'axios';
import knex from '../db/knexfile'; // Import knex to handle the transaction
import { findUserByEmail, createUser, updateUserBalance, getUserById, findAllUsers, } from '../models/userModel';


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



export const deleteUserService = async (userId: number) => {
  const user = await knex('users').where({ id: userId }).first();
  if (!user) {
      throw new Error('User not found');
  }

  await knex('users').where({ id: userId }).del();
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
  // Ensure the transfer amount is positive
  if (amount <= 0) throw new Error('Transfer amount must be greater than zero');
  
  // Ensure the sender and recipient are not the same user
  if (senderId === recipientId) {
    throw new Error('Sender and recipient cannot be the same user');
  }

  // Start a transaction to ensure atomicity
  return knex.transaction(async trx => {
    const sender = await knex('users').where({ id: senderId }).first().transacting(trx);
    const recipient = await knex('users').where({ id: recipientId }).first().transacting(trx);

    if (!sender) throw new Error('Sender not found');
    if (!recipient) throw new Error('Recipient not found');

    // Check if the sender has enough balance
    if (parseFloat(sender.balance) < amount) {
      throw new Error('Insufficient funds');
    }

    // Update sender's balance
    const newSenderBalance = parseFloat(sender.balance) - amount;
    await knex('users').where({ id: senderId }).update({ balance: newSenderBalance }).transacting(trx);

    // Update recipient's balance
    const newRecipientBalance = parseFloat(recipient.balance) + amount;
    await knex('users').where({ id: recipientId }).update({ balance: newRecipientBalance }).transacting(trx);

    // Commit the transaction and return updated balances
    return {
      sender: {
        id: senderId,
        balance: newSenderBalance,
      },
      recipient: {
        id: recipientId,
        balance: newRecipientBalance,
      },
    };
  });
};