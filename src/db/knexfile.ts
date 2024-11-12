import knex from 'knex';
import knexConfig from '../../knexfile'; // Import the config from the root

const environment = process.env.NODE_ENV || 'development';
const connection = knex(knexConfig[environment]);

export default connection;
