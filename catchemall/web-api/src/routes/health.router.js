import express from 'express';

const router = express.Router();

router.get('/liveness', (req, res) => {
    try {
        res.send('liveness check passed');
    } catch (e) {
        res.status(500);
    }
});

export { router as healthRouter };
