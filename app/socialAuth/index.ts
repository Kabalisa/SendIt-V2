import express from 'express';
import auth from './routes/auth/auth';

const router = express.Router();

router.use('/api/v2/auth', auth);

export default router;
