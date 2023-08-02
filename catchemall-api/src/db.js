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
 * @type {pg.Client}
 */
let client;

export async function connectToDb() {
  const connectionString = process.env['CONNECTION_STRING'];
  if (!connectionString) throw new Error("cannot initialize app without a connection string");
  client = new pg.Client(connectionString);
  console.log("connecting to database");
  await client.connect();
  console.log("Succesfully connected to database");
}
export async function seedDatabase() {
  await client.query(InitializeUsersTable);
}
export function getDbClient() {
  if (!client) throw new Error("client is not connected to db");
  return client;
}