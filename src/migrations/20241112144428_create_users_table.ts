import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.decimal('balance', 15, 2).defaultTo(0.0);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    table.decimal('amount', 15, 2).notNullable();
    table.string('type').notNullable(); // deposit, withdraw, transfer
    table.integer('recipient_id').unsigned().references('id').inTable('users'); // for transfers
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('transactions');
  await knex.schema.dropTableIfExists('users');
}
