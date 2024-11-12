import knex from '../db/knexfile';

export const findUserByEmail = async (email: string) => {
  return knex('users').where({ email }).first();
};

export const createUser = async (name: string, email: string, balance: number) => {
  return knex('users').insert({ name, email, balance });
};

export const updateUserBalance = async (userId: number, balance: number) => {
  return knex('users').where({ id: userId }).update({ balance });
};

export const getUserById = async (id: number) => {
  return knex('users').where({ id }).first();
};


export const findAllUsers = async () => {
  return knex('users'); // This fetches all users from the users table
};