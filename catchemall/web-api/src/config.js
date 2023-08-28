
function validateDbConfig() {
  const dbConfig = {
    PGUSER: process.env['PGUSER'],
    PGPASSWORD: process.env['PGPASSWORD'],
    PGHOST: process.env['PGHOST'],
    PGPORT: process.env['PGPORT'],
    PGDATABASE: process.env['PGDATABASE']
  };
  for (const [key, value] of Object.entries(dbConfig)) {
    if (!value) throw new Error(`${key} is not defined`);
  }
}

export function validateConfig() {
  validateDbConfig();
  const secret = process.env['JWT_SECRET_KEY'];
  if (!secret) throw new Error("no env secret provided. Application shutting down...");
  console.log("config is valid");
}

// this is always present on runtime because JWT_SECRET_KEY has to be present
// for the app to start.
export function getJwtSecret() {
  return process.env['JWT_SECRET_KEY'];
}
export function getTokenExpiresIn() {
  return process.env['TOKEN_EXPIRES_IN'] || '4h';
}