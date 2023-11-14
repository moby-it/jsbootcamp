import { registerPassportMiddleware } from './passport.middleware.js';
import cors from 'cors';
import bodyParser from 'body-parser';

/**
 * @param {import("express-serve-static-core").Express} app
 */
export function registerMiddleware(app) {
    app.use(cors());
    app.use(bodyParser.json());
    registerPassportMiddleware();
}
