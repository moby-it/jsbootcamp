import pg from 'pg';

const InitializeUsersTable = `
create table if not exists Users (
  ID SERIAL PRIMARY KEY ,
  Username varchar(50) NOT NULL UNIQUE ,
  Password varchar(255) NOT NULL ,
  Salt varchar(50) NOT NULL
)
`;

/**
 * @type {pg.Pool}
 */
let pool;

export async function createDbPool() {
  pool = new pg.Pool();
  console.log("connecting to database");
  const client = await pool.connect();
  console.log("Succesfully connected to database");
  client.release();
}
export async function seedDatabase() {
  const client = await pool.connect();
  await client.query(InitializeUsersTable);
}

export async function getDbClient() {
  const client = await pool.connect();
  if (!client) throw new Error("client is not connected to db");
  return client;
}