function validateDbConfig() {
    const connectionString = process.env['DB_CONNECTION_STRING'];
    if (!connectionString) throw new Error(`connectionString is not defined`);
}
function validateCatchChance() {
    const catchChance = process.env['CATCH_CHANCE'];
    if (!catchChance) throw new Error(`catchChance is not defined`);
    if (+catchChance <= 0) throw new Error(`catchChance: ${catchChance}. value cannot be negative or zero.`);
    if (+catchChance > 1) throw new Error(`catchChance: ${catchChance}. value cannot be greater than 1.`);
}
export function validateConfig() {
    validateDbConfig();
    validateCatchChance();
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
