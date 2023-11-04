import express from 'express';

export const healthRouter = express.Router();

export async function liveness(req, res) {
    try {
        res.send('liveness check passed');
    } catch (e) {
        res.status(500);
    }
}
