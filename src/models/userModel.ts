import knex from '../db/knexfile';

export const findUserByEmail = async (email: string) => {
  return knex('users').where({ email }).first();
};

export const createUser = async (name: string, email: string, balance: number) => {
  return knex('users').insert({ name, email, balance });
};

export const updateUserBalance = async (userId: number, balance: number) => {
  // Ensure the balance is a non-negative number
  if (balance < 0) {
    throw new Error('Balance cannot be negative');
  }

  // Update the user's balance
  const updatedRows = await knex('users')
    .where({ id: userId })
    .update({ balance }, ['id', 'name', 'email', 'balance']); // Return updated user details

  // Check if the update was successful (at least one row updated)
  if (updatedRows.length === 0) {
    throw new Error('User not found or update failed');
  }

  // Return the updated user details
  return updatedRows[0];
};

export const getUserById = async (id: number) => {
  return knex('users').where({ id }).first();
};


export const findAllUsers = async () => {
  return knex('users'); // This fetches all users from the users table
};