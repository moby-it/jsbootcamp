function validateDbConfig() {
    const connectionString = process.env['DB_CONNECTION_STRING'];
    if (!connectionString) throw new Error(`connectionString is not defined`);
}

export function validateConfig() {
    validateDbConfig();
    const secret = process.env['JWT_SECRET_KEY'];
    if (!secret) throw new Error('no env secret provided. Application shutting down...');
    console.log('config is valid');
}

// this is always present on runtime because JWT_SECRET_KEY has to be present
// for the app to start.
export function getJwtSecret() {
    return process.env['JWT_SECRET_KEY'];
}
export function getTokenExpiresIn() {
    return process.env['TOKEN_EXPIRES_IN'] || '4h';
}
